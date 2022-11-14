const productsModels = require('../models/products.model');
const validationProduct = require('./validations/validationsProduct');

const doesProductExist = async (id) => {
  const product = await productsModels.findById(id);
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

const updateProduct = async (id, dataToUpdate) => {
  const checkProduct = await doesProductExist(id);
  const validationResult = await validationProduct(dataToUpdate);

  if (checkProduct.type === 'INVALID_ERROR') {
    return checkProduct;
  }

  if (validationResult.type) {
    return validationResult;
  }
  await productsModels.updateById(id, dataToUpdate);
  return checkProduct;
};

module.exports = {
  doesProductExist,
  checkIfCanAdd,
  updateProduct,
};