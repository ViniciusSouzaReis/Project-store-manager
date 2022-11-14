const express = require('express');
const saleController = require('../controllers/sales.controller');

const router = express.Router();

router.post('/', saleController.createNewSales);

router.get('/', saleController.findAllSales);

router.get('/:id', saleController.findSaleById);

module.exports = router;