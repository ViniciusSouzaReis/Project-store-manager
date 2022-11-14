const { expect, use } = require('chai');
const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');


const salesModel = require('../../../src/models/sales.model');
const { allProducts } = require('./mocks/allProducts.model.mock');

const app = require('../../../src/app');
const connection = require('../../../src/database/connection');

use(chaiHttp);

describe('Testando os endpoints de sales', function () {
  afterEach(sinon.restore);

  it('Testando o registro de um produto ', async function () {
    sinon.stub(connection, 'execute').resolves(true);

    const response = await chai
      .request(app)
      .post('/sales')
      .send(
        [
          {
            "productId": 1,
            "quantity": 1
          },
          {
            "productId": 2,
            "quantity": 5
          }
        ]
      );

    expect(response.status).to.equal(201);
    expect(response.body).to.
      deep.equal({
        "id": 4,
        "itemsSold": [
          {
            "productId": 1,
            "quantity": 1
          },
          {
            "productId": 2,
            "quantity": 5
          }
        ]
      });
  });

  it('Testando falha no cadastro sem productId ', async function () {
    sinon.stub(connection, 'execute').resolves(true);

    const response = await chai
      .request(app)
      .post('/sales')
      .send([
        {
          "quantity": 1
        },
        {
          "productId": 2,
          "quantity": 5
        }
      ]
      );

    expect(response.status).to.equal(400);
    expect(response.body).to.
      deep.equal({
        "message": "\"productId\" is required"
      });
  });

  it('Testando falha no cadastro sem quantity ', async function () {
    sinon.stub(connection, 'execute').resolves(true);

    const response = await chai
      .request(app)
      .post('/sales')
      .send([
        {
          "productId": 1
        },
        {
          "productId": 2,
          "quantity": 5
        }
      ]
      );

    expect(response.status).to.equal(400);
    expect(response.body).to.
      deep.equal({
        "message": "\"quantity\" is required"
      });
  });

  it('Testando falha no cadastro produto inexistente ', async function () {
    sinon.stub(connection, 'execute').resolves(true);

    const response = await chai
      .request(app)
      .post('/sales')
      .send([
        {
          "productId": 10,
          "quantity": 1
        },
        {
          "productId": 2,
          "quantity": 5
        }
      ]
      );

    expect(response.status).to.equal(400);
    expect(response.body).to.
      deep.equal({ "message": "Product not found" });
  });

  it('Testando falha no cadastro sem quantity maior que 0 ', async function () {
    sinon.stub(connection, 'execute').resolves(true);

    const response = await chai
      .request(app)
      .post('/sales')
      .send([
        {
          "productId": 1,
          "quantity": 0
        },
        {
          "productId": 2,
          "quantity": 5
        }
      ]);

    expect(response.status).to.equal(400);
    expect(response.body).to.
      deep.equal({
        "message": "\"quantity\" must be greater than or equal to 1"
      });
  });
});