const productsModels = require('../models/products.model');

const doesProductExist = async (id) => {
  const product = await productsModels.findById(id);
  if (product) return true;
  return false;
};

const addProduct = (name) => {
  console.log('a');
};