const express = require('express');
const saleController = require('../controllers/sales.controller');

const router = express.Router();

router.post('/', saleController.createNewSales);

module.exports = router;