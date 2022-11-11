const productsService = require('../services/products.service');

const createProduct = async (req, res) => {
  const { name } = req.body;

  const { type, message } = await productsService.checkIfCanAdd(name);

  if (!type) return res.status(201).json(message);

  return res.status(type).json({ message });
};

module.exports = {
  createProduct,
};