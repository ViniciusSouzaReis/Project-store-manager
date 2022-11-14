const salesService = require('../services/sales.service');
const { findAll } = require('../models/sales.model');

const createNewSales = async (req, res) => {
  const { body } = req;
  const { type, message } = await salesService.responseObject(body);

  if (!type) return res.status(201).json(message);

  return res.status(type).json({ message });
};

const findAllSales = async (req, res) => {
  const allSalesOnDb = await findAll();
  return res.status(201).json(allSalesOnDb);
};

module.exports = {
  createNewSales,
  findAllSales,
};