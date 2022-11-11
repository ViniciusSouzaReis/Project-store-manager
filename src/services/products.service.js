const productsModels = require('../models/products.model');
const validationProduct = require('./validations/validationsProduct');

const doesProductExist = async (id) => {
  const product = await productsModels.findById(id);
  if (product) return { type: '', message: product };
  return { type: 404, message: 'Product not found' };
};

const saveProduct = async (name) => {
  const product = await productsModels.insert(name);
  return product;
};

const checkIfCanAdd = async (name) => {
  const validationResult = validationProduct(name);

  if (validationResult.type === null) {
    const save = await saveProduct(name);
    const newProduct = {
      id: save,
      name,
    };
    return { type: null, message: newProduct };
  }
    
  return validationResult;
};

module.exports = {
  doesProductExist,
  checkIfCanAdd,
};