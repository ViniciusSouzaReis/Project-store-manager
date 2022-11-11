const { expect } = require('chai');
const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const app = require('../../../src/app');
const allProducts = require('./mocks/allProducts.model.mock');

const connection = require('../../../src/database/connection');

describe('Testando os endpoints de products', function () {
  afterEach(sinon.restore);
  it('Testando a listagem de todas os produtos', async function () {
    sinon.stub(connection, 'execute').resolves([allProducts]);
    const response = await chai
      .request(app)
      .get('/products');

    expect(response.status).to.equal(200);
    expect(response.body).to.deep.equal(allProducts);
  });

  it('Testando a listagem da produtos com id 1', async function () {
    sinon.stub(connection, 'execute').resolves([[allProducts[0]]]);
    const response = await chai
      .request(app)
      .get('/products/1');

    expect(response.status).to.equal(200);
    expect(response.body).to.deep.equal(allProducts[0]);
  });
});