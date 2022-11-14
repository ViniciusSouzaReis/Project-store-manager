const productsModel = require('../../models/products.model');

const validateId = (body) => {
  const checkId = body.every((product) => product.productId);
  if (!checkId) return { type: 'ID_NOT_FOUND', message: '"productId" is required' };
  return { type: '', message: '"productId" ok' };
};

const checkIfIdExists = async (body) => {
  const products = await productsModel.findAll();
  const productsId = products.map((produc) => produc.id);
  const productIdExist = body.every((e) => productsId.includes(e.productId));
  if (productIdExist === false) return { type: 'ID_NOT_FOUND', message: 'Product not found' };
  return { type: '', message: 'productFound' };
};

const validateQuantity = (body) => {
  const checkQuantity = body.every((product) => product.quantity || product.quantity === 0);
  if (!checkQuantity) return { type: 'QUANTITY_NOT_FOUND', message: '"quantity" is required' };
  const quantityNumber = body.every((product) => product.quantity > 0);
  if (quantityNumber === false) {
    return {
      type: 'QUANTITY_LOWER_THAN_0',
      message: '"quantity" must be greater than or equal to 1',
    }; 
}
  return { type: '', message: '"quantity" ok' };
};

module.exports = {
  validateId,
  checkIfIdExists,
  validateQuantity,
};