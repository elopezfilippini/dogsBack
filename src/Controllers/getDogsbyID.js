const axios = require("axios");
const express = require('express');
const { Dog } = require("../db.js");

const getDogbyID = async function (req, res) {
  try {
    const { id } = req.params;

  
      const { data } = await axios.get(`https://api.thedogapi.com/v1/breeds/${id}`);
      const personaje = {
        id: data.id,
        name: data.name,
        life_span: data.life_span,
        weight: data.weight,
        height: data.height,
        temperament: data.temperament,
        reference_image_id: data.reference_image_id,
        Origin: "Api"
      };
      return res.status(200).json(personaje);
   
  } catch (error) {
    console.error(error);
    return res.status(500).send('Internal Server Error');
  }
};

module.exports = getDogbyID;
