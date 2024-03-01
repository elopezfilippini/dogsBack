const {Dog} = require("../db.js")
const {Temperament} = require("../db.js")



const postDog = async (req,res)=>  {
try {
const {id,name,life_span,weight,height,temperament,reference_image_id} =req.body
// if (!name||!life_span||!weight||!height||!reference_image_id) res.status(400).send("Faltan datos")
// else { 
    const newDog = await Dog.create({
    
    name: name,
    life_span:life_span,
    weight:weight,
    height:height,
    reference_image_id:reference_image_id,
   
    Origin: "DB"
    

}
); 
const temperamento = temperament.split(", ")
    const temperamentIds = await Temperament.findAll({
       where: {
          name: temperamento
       },
       attributes: ['id'] //devuelve un objeto cuyo atributo trae desde la columna ID que esta en la tabla temperament al encontrar cada uno de los nombres de los temperamentos
       //que tiene el perro
    });

    const ids = temperamentIds.map(temp => temp.id); //transforma dicho objeto en un array, cada elemento del objeto temperamentIds extrae el id

    await newDog.addTemperament(ids); //toma el registro de newdog (su id) y lo agrega al id  de temperamento en la tabla through 
 
res.json(temperamentIds)
}

catch(error) { res.status(500).send(error.message)}
}



module.exports = postDog;