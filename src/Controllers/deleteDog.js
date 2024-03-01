const {Dog} = require("../db.js")

const deleteDog = async (req, res) => {
    try {
        const { id } = req.params; //
        const dogToDelete = await Dog.findByPk(id);
        if (!dogToDelete) {
            return res.status(404).json({ error: 'Perro no encontrado' });
        }

        await Dog.destroy({
            where: {
                id: id
            }
        });

        res.status(200).json({ message: 'Perro eliminado exitosamente' });
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

module.exports = deleteDog;