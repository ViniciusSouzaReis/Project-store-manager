const connection = require('../database/connection');

const insertIntoSaleProducts = async (product, id) => {
  const { productId, quantity } = product;
  await connection.execute(
    'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES(?, ?, ?)',
    [id, productId, quantity],
  );
};

const insertNewSale = async (products) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales (date) VALUE (now())',
  );
  await Promise.all(products.map((product) => insertIntoSaleProducts(product, insertId))); 
  return insertId;
};

module.exports = {
  insertNewSale,
};