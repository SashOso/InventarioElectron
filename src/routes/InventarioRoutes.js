const express = require('express');
const controller = require("../controllers/InventarioController");

const router = express.Router();
const url='/api/inventario';

router.get(url, controller.lista);
router.get(`${url}/:id`, controller.buscar);

module.exports = router;
