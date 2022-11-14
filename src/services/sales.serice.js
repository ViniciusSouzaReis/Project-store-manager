const validationSales = require('./validations/validateSales');
const salesModel = require('../models/sales.model');

const saveSales = async (body) => {
  const sale = await salesModel.insertNewSale(body);
  return sale;
};

const checkIfCanSave = async (body) => {
  const validationId = await validationSales.validateId(body);
  const validationIdExists = await validationSales.checkIfIdExists(body);
  const validationQuantity = await validationSales.validateQuantity(body);

  if (validationId.type) {
    return { type: 400, message: validationId.message };
  }

  if (validationIdExists.type === 'ID_NOT_FOUND') {
    return { type: 404, message: validationIdExists.message };
  }

  if (validationQuantity.type === 'QUANTITY_NOT_FOUND') {
    return { type: 400, message: validationQuantity.message };
  }

  if (validationQuantity.type === 'QUANTITY_LOWER_THAN_0') {
    return { type: 422, message: validationQuantity.message };
  }

  return { type: '', message: '' };
};

const responseObject = async (body) => {
  const checkValidation = await checkIfCanSave(body);
  if (!checkValidation.type) {
    const saved = await saveSales(body);
    const newObject = {
      id: saved,
      itemsSold:
        body,
    };
    return { type: '', message: newObject };
  }
  console.log(checkValidation);
  return checkValidation;
};

module.exports = {
  responseObject,
};