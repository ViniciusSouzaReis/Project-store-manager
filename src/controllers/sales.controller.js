const salesService = require('../services/sales.service');
const { findAll } = require('../models/sales.model');

const createNewSales = async (req, res) => {
  const { body } = req;
  const { type, message } = await salesService.responseObject(body);

  if (!type) return res.status(201).json(message);

  return res.status(type).json({ message });
};

const findAllSales = async (_req, res) => {
  const allSalesOnDb = await findAll();
  return res.status(200).json(allSalesOnDb);
};

const findSaleById = async (req, res) => {
  const { id } = req.params;
  const idReturn = await salesService.checkSaleId(id);
  const { type, message } = idReturn;
  if (!type) {
    return res.status(200).json(idReturn.message);
  }
  return res.status(404).json({ message });
};

module.exports = {
  createNewSales,
  findAllSales,
  findSaleById,
};