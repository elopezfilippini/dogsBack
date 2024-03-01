const axios = require("axios");
const express = require('express');
const { Dog } = require("../db.js");
const { Temperament } = require("../db.js");
const Sequelize = require('sequelize');

const getDogbyQuery = async function (req, res) {
  const name = req.query.name;

  try {
    const { data } = await axios.get(`https://api.thedogapi.com/v1/breeds/search?q=${name}`);
    const perrosFiltrados = data.map(element => ({
      id: parseInt(element.id, 10),
      name: element.name,
      lifespan: element.lifespan,
      weight: element.weight,
      height: element.height,
      reference_image_id:  `https://cdn2.thedogapi.com/images/`+element.reference_image_id+`.jpg`,
      Origin:"Api",
      life_span:element.life_span,
      temperament:element.temperament
    }));


    const dogsCreated = await Dog.findAll({
      where: {
        name: {
          [Sequelize.Op.iLike]: `%${name}%`
        }
      },
      include: [{ model: Temperament, attributes: ['name']}]
    });
  
    const dogsWithTemperaments = dogsCreated.map(dog => {
      const temperamentsNames = dog.Temperaments.map(temp => temp.name);
      return {
        id: dog.id,
        name: dog.name,
        life_span: dog.life_span,
        reference_image_id: dog.reference_image_id,
        weight:dog.weight,
        height:dog.height,
        temperament: temperamentsNames.join(', '),
        Origin:dog.Origin
      };
    });
  
    const todolosPerros = [...perrosFiltrados, ...dogsWithTemperaments];

    res.status(200).json(todolosPerros);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

module.exports = getDogbyQuery;