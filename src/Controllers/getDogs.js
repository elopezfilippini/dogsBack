const axios = require("axios");
const express = require('express');
const { Dog } = require("../db.js");
const API_KEY = process.env.API_KEY;
const { Temperament } = require("../db.js");
const Sequelize = require('sequelize');

const getDogbyID = async function (req, res) {
  try {
    
      const { data } = await axios.get(`https://api.thedogapi.com/v1/breeds/?api_key=${API_KEY}`);
      let perrosFiltrados = data.map(element => ({
        id: parseInt(element.id, 10),
        name: element.name,
        life_span: element.life_span,
        weight: element.weight,
        weightMax: element.weight.metric ? element.weight.metric.split("- ")[1] : [],
        height: element.height,
        temperament: element.temperament,
        temperamentlist: element.temperament ? element.temperament.split(",") : [],
        reference_image_id: `https://cdn2.thedogapi.com/images/`+element.reference_image_id+`.jpg`,
        Origin: "Api"
      }));

      const dogsCreated = await Dog.findAll({
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
          temperamentlist:temperamentsNames,
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
  }
module.exports = getDogbyID;
