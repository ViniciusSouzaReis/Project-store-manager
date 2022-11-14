const connection = require('../database/connection');

const insertIntoSaleProducts = async (product, saleId) => {
  const { productId, quantity } = product;
  connection.execute(
    'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES(?, ?, ?)',
    [saleId, productId, quantity],
  );
};

const insertNewSale = async (products) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales (date) VALUE (now())',
  );
  await Promise.all(products.map((product) => insertIntoSaleProducts(product, insertId))); 
  return insertId;
};

const findAll = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.sales',
  );
  console.log(result);
  return result;
};

findAll();
 
module.exports = {
  insertIntoSaleProducts,
  insertNewSale,
};