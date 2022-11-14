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
    `
    SELECT sales_products.sale_id as saleId, sales.date, sales_products.product_id as productId, 
    sales_products.quantity
    FROM sales_products
    INNER JOIN sales
    ON sales.id = sales_products.sale_id
    ORDER BY sales_products.sale_id, sales_products.product_id;`,
  );
  return result;
};

const findById = async (id) => {
  const [result] = await connection.execute(
    `
    SELECT sales.date, sales_products.product_id as productId, sales_products.quantity
    FROM sales_products
    INNER JOIN sales
    ON sales.id = sales_products.sale_id
    WHERE sales_products.sale_id = ?
    ORDER BY sales_products.sale_id, sales_products.product_id`,
    [id],
  );
  return result;
};
 
module.exports = {
  insertIntoSaleProducts,
  insertNewSale,
  findAll,
  findById,
};