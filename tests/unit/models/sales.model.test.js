const { expect, use } = require('chai');
const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');


const salesModel = require('../../../src/models/sales.model');
const { allProducts } = require('./mocks/allProducts.model.mock');
const { idSalesDb, allSalesDB } = require('./mocks/allSales.model.mock');

const app = require('../../../src/app');
const connection = require('../../../src/database/connection');

use(chaiHttp);

describe('Testando os endpoints de sales', function () {
  it('Testando a listagem de sales ', async function () {
    sinon.stub(connection, 'execute').resolves([allSalesDB]);
    const response = await chai
      .request(app)
      .get('/sales')
      

    expect(response.status).to.equal(200);
    expect(response.body).to.deep.equal(allSalesDB);
  });
});