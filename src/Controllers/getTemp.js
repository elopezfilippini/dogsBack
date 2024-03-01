const {Temperament} = require("../db.js")

const getTemp = async(req,res) =>{
    try{

        const allTemps = await Temperament.findAll({
                attributes: ['name'], // Especifica las columnas que deseas seleccionar
              });
              
              res.status(200).json(allTemps.map(temp => temp.name))}
catch (error) {
        return res.status(500).send(error.message)}
}



module.exports = getTemp