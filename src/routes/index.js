const { Router } = require('express');
const getDogs = require('../Controllers/getDogs.js');
const getDogsbyQuery = require('../Controllers/getDogsbyQuery.js');
const postDog = require('../Controllers/postDogs.js');
const getTemperament = require('../Controllers/getTemperament.js');
const getTemp = require('../Controllers/getTemp.js');
const getDogsbyID = require('../Controllers/getDogsbyID.js');
const deleteDog = require('../Controllers/deleteDog.js');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
// router.use("/getDogs/:id",getDogs)
router.use("/getAllDogs/",getDogs) // trae todos los perros, tanto de la Api como del server
router.use("/getDogs",getDogsbyQuery) //trae los perros segun busqueda en el query
router.use("/postDog",postDog) //postea un perro
router.use("/temperament",getTemperament)
router.use("/getTemps",getTemp)
router.use("/getDogsbyID/:id",getDogsbyID)//trae los perros segun params ID
router.use("/deleteDog/:id",deleteDog)//trae los perros segun params ID

// router.post('/postDog', postDog
//   );


module.exports = router;
