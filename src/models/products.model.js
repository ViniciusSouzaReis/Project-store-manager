const connection = require('../database/connection');

// const findAll = () => connection.execute('SELECT * FROM StoreManager.products');

const findAll = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.products',
  );
  return result;
};

const findById = async (id) => {
  const [[result]] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = ?',
    [id],
  );
  return result;
};

const insert = async (product) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.products (name) VALUE (?)',
    [product],
  );

  return insertId;
};

const updateById = async (id, dataToUpdate) => connection.execute(
    'UPDATE StoreManager.products SET name = ? WHERE id = ?',
    [dataToUpdate, id],
  );

module.exports = {
  findAll,
  findById,
  insert,
  updateById,
};