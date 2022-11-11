const { expect } = require('chai');

const sinon = require('sinon');
const productsModel = require('../../../src/models/products.model');
const allProducts = require('./mocks/allProducts.model.mock');

const connection = require('../../../src/database/connection');

describe('Testando os endpoints de products', function () {
  afterEach(sinon.restore);
  it('Testando a listagem de todas os produtos', async function () {
    sinon.stub(connection, 'execute').resolves([allProducts]);
    const result = await productsModel.findAll();

    expect(result).to.deep.equal(allProducts);
  });

  it('Testando a listagem da produtos com id 1', async function () {
    sinon.stub(connection, 'execute').resolves([[allProducts[0]]]);
    const result = await productsModel.findById();

    expect(result).to.deep.equal(allProducts[0]);
  });
});