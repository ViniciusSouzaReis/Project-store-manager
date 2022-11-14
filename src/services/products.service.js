const productsModels = require('../models/products.model');
const validationProduct = require('./validations/validationsProduct');

const doesProductExist = async (id) => {
  const product = await productsModels.findById(id);
  console.log(product);
  if (!product) return { type: 'INVALID_ERROR', message: 'Product not found' };
  return { type: '', message: product };
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