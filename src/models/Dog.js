const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Dog', { id:{type: DataTypes.INTEGER,
     primaryKey:true,autoIncrement:true },
  
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      
    },
    life_span: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    weight: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    height: {
      type: DataTypes.JSON,

      allowNull: false, 
    },
    reference_image_id: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Origin: {
      type: DataTypes.STRING,
      allowNull: false
    },
    // temperament: {
    //   type: DataTypes.STRING,
    //   allowNull: false
    // },

  });
};


// -  ID.\*
// -  Imagen.\*
// -  Nombre.\*
// -  Altura.\*
// -  Peso.\*
// -  Años de vida.\*