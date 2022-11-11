const express = require('express');
const productsModel = require('../models/products.model');
const validadateProduct = require('../middlewares/validateAddProducts');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const allProducts = await productsModel.findAll();
    return res.status(200).json(allProducts);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const idProduct = await productsModel.findById(id);
  if (idProduct) {
    return res.status(200).json(idProduct);
  }
  return res.status(404).json({ message: 'Product not found' });
});

router.post('/', validadateProduct, async (req, res) => {
  const { name } = req.body;
  const addProduct = await productsModel.insert(name);
  const addProductReturn = {
    id: addProduct,
    name,
  };
  return res.status(201).json(addProductReturn);
});

module.exports = router;
