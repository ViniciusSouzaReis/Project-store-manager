const productsService = require('../services/products.service');

const createProduct = async (req, res) => {
  const { name } = req.body;

  const { type, message } = await productsService.checkIfCanAdd(name);

  if (!type) return res.status(201).json(message);

  return res.status(type).json({ message });
};

const checkId = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productsService.doesProductExist(id);

  if (type === 'INVALID_ERROR') return res.status(404).json({ message: 'Product not found' });

  return res.status(200).json(message);
};

module.exports = {
  createProduct,
  checkId,
};