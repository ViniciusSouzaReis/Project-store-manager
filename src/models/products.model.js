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
  console.log(result);
  return result;
};

// const insert = async (product) => {
//   const [{ name }] = await connection.execute(
//     'INSERT INTO StoreManager.products (name) VALUE (?)',
//     [product],
//   );

//   return name;
// };

const insert = (product) =>
  connection.execute('INSERT INTO StoreManager.products (name) VALUE (?)', [product]);

module.exports = {
  findAll,
  findById,
  insert,
};