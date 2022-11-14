const { expect, use } = require('chai');
const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');


const productsModel = require('../../../src/models/products.model');
const {allProducts, allProductsUpdated} = require('./mocks/allProducts.model.mock');

const app = require('../../../src/app');
const connection = require('../../../src/database/connection');

use(chaiHttp);

describe('Testando os endpoints de products', function () {
  afterEach(sinon.restore);
  it('Testando a listagem de todas os produtos', async function () {
    sinon.stub(connection, 'execute').resolves([allProducts]);
    const result = await productsModel.findAll();

    expect(result).to.deep.equal(allProducts);
  });

  it('Testando a listagem da produtos com id 1', async function () {
    sinon.stub(connection, 'execute').resolves([[allProducts[0]]]);
    const response = await chai
      .request(app)
      .get('/products/1');

    expect(response.status).to.equal(200);
    expect(response.body).to.deep.equal(allProducts[0]);
  });

  it('Testando a listagem da produtos com id errado', async function () {
    sinon.stub(connection, 'execute').resolves([[allProducts[4]]]);
    const response = await chai
      .request(app)
      .get('/products/4');

    expect(response.status).to.equal(404);
    expect(response.body).to.deep.equal({
      "message": "Product not found"
    });
  });

  it('Testando o cadastro de uma pessoa ', async function () {
    sinon.stub(connection, 'execute').resolves([{ insertId: 4 }]);

    const response = await chai
      .request(app)
      .post('/products')
      .send(
        {
          "name": "ProdutoX"
        },
      );

    expect(response.status).to.equal(201);
    expect(response.body).to.
      deep.equal({
        "id": 4,
        "name": "ProdutoX"
      });
  });

  it('Testando falha no cadastro de um pessoa sem nome ', async function () {
    sinon.stub(connection, 'execute').resolves([{ insertId: 4 }]);

    const response = await chai
      .request(app)
      .post('/products')
      .send(
        {
        },
      );

    expect(response.status).to.equal(400);
    expect(response.body).to.
      deep.equal({
        "message": "\"name\" is required"
      });
  });

  it('Testando falha no cadastro de uma pessoa com nome incorreto ', async function () {
    sinon.stub(connection, 'execute').resolves([{ insertId: 4 }]);

    const response = await chai
      .request(app)
      .post('/products')
      .send(
        {
          name: "Prod"
        },
      );

    expect(response.status).to.equal(422);
    expect(response.body).to.
      deep.equal({
        "message": "\"name\" length must be at least 5 characters long"
      });
  });

  it('Testando a alteração de uma produto com o id 1', async function () {
    sinon.stub(connection, 'execute').resolves([[allProducts[1]]]);
    const response = await chai
      .request(app)
      .put('/products/1')
      .send(
        {
          "name": "Martelo do Batman"
        }
      );

    expect(response.status).to.equal(200);
    expect(response.body).to
      .deep.equal({
        "id": "1",
        "name": "Martelo do Batman"
      });
  });

  it('Testando a alteração de uma produto com o id errado', async function () {
    sinon.stub(connection, 'execute').resolves([[allProductsUpdated[1]]]);
    const response = await chai
      .request(app)
      .put('/products/4')
      .send(
        {
          "name": "Martelo do Batman"
        }
      );

    expect(response.status).to.equal(404);
    expect(response.body).to.deep.equal({
      "message": "Product not found"
    });
  });

  it('Testando a alteração de uma produto com o body incorreto', async function () {
    sinon.stub(connection, 'execute').resolves([[allProductsUpdated]]);
    const response = await chai
      .request(app)
      .put('/products/1')
      .send(
        {
          "name": "Mar"
        }
      );

    expect(response.status).to.equal(422);
    expect(response.body).to.deep.equal({
      "message": "\"name\" length must be at least 5 characters long"
    });
  });
});