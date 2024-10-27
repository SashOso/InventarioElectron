const express = require('express');
const controller = require("../controllers/ArticuloController");

const router = express.Router();
const url = '/api/articulo';

router.get(url, controller.lista);
router.get(`${url}/:id`, controller.buscar);
router.post(url, controller.agregar);
router.put(url, controller.actualizar);
router.delete(`${url}/:id`, controller.eliminar);

module.exports = router;
