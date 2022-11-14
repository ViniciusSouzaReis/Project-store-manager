const express = require('express');
const productsModel = require('../models/products.model');
const validadateProduct = require('../controllers/productsController');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const allProducts = await productsModel.findAll();
    return res.status(200).json(allProducts);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.get('/:id', validadateProduct.checkId);

router.post('/', validadateProduct.createProduct);

router.put('/:id', validadateProduct.updateData);

module.exports = router;
