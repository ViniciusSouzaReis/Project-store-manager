const salesService = require('../services/sales.serice');

const createNewSales = async (req, res) => {
  const { body } = req;
  const { type, message } = await salesService.responseObject(body);

  if (!type) return res.status(201).json(message);

  return res.status(type).json(message);
};

module.exports = {
  createNewSales,
};