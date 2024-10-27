const model = require("../models/InventarioModel");

// Lista
module.exports.lista= async (req, res) => {
    try {
        const lista = await model.lista();
        res.json(lista);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener la lista', error });
    }
}
// Buscar
module.exports.buscar= async (req, res) => {
    const id = req.params.id;
    try {
        const obj = await model.buscar(id);
        if (obj) {
            res.json(obj);
        } else {
            res.status(404).json({ message: 'No encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al buscar', error });
    }
}