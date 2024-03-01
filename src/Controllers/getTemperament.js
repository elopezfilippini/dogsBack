const axios = require("axios");
const { Temperament } = require("../db.js");

const filtradorTemperamentos = function (dogtemp) {
  const listaTemperamentos = [];
  for (let i = 0; i < dogtemp.length; i++) {
    const palabra = listaTemperamentos.find(
      (palabra) => palabra === dogtemp[i]
    );
    if (!palabra) listaTemperamentos.push(dogtemp[i]);
  }
  return listaTemperamentos;
};

const getTemperament = async function (req, res) {
  try {
    const response = await axios.get(`https://api.thedogapi.com/v1/breeds/`);
    const listaTemperamentos = filtradorTemperamentos(
      response.data.flatMap((perro) =>
        perro.temperament ? perro.temperament.split(", ") : []
      )
    );

    const createTemperamentPromises = listaTemperamentos.map((nombre) =>
      Temperament.create({ name: nombre.replace(/^['"](.*)['"]$/g, '$1') }) // Eliminacion de comillas.
    );

    await Promise.all(createTemperamentPromises);

    const temperamentos = await Temperament.findAll();

    res.status(200).json(temperamentos);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

module.exports = getTemperament;
