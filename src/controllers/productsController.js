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

const updateData = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const { type, message } = await productsService.updateProduct(id, name);

  if (type === 'INVALID_ERROR') return res.status(404).json({ message });
  if (typeof type === 'number') return res.status(type).json({ message });
  return res.status(200).json({
    id,
    name,
  });
};

module.exports = {
  createProduct,
  checkId,
  updateData,
};