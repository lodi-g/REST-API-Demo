const request = require('supertest');
const mongoose = require('mongoose');
const chai = require('chai');
const chaiHttp = require('chai-http');

const Customers = require('./models/customers');
const Orders = require('./models/orders');
const app = require('./server');

const customers = [];
const should = chai.should();

chai.use(chaiHttp);

describe('API', () => {

  before(() => {
    it('it should empty the database', (done) => {
      Customers.remove({})
        .then(() => {
          Orders.remove({})
            .then(() => {
              done();
            }).catch(console.error);
        }).catch(console.error);
    });
  });

  describe('GET /customers', () => {
    it('it should have 0 customers', (done) => {
      chai.request(app)
        .get('/customers')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          done();
        });
    });
  });

  describe('POST /customers', () => {
    let customer = { first_name: 'John', last_name: 'Doe', age: 24, address: '123 Main St',
      post_code: '00000', city: 'anytown', phone: 'xxx', color: '#fff' };

    it('it should POST a new customer', (done) => {
      chai.request(app)
        .post('/customers')
        .send(customer)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.total_amount.should.be.eql(0);
          res.body.total_orders.should.be.eql(0);
          res.body.orders.length.should.be.eql(0);
          res.body.profile.should.be.eql(customer);
          customers.push(res.body);
          done();
        });
    });

    it('it (/customers/) should have one customer', (done) => {
      chai.request(app)
        .get('/customers')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(1);
          res.body[0].should.be.eql(customers[0]);
          done();
        });
    });

  });

  describe('GET /customers/:customerId', () => {
    it('it should be the first customer', (done) => {
      chai.request(app)
        .get('/customers/' + customers[0]._id)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.eql(customers[0]);
          done();
        });
    });

    it('it should be a 400 ObjectIdException when the id is invalid', (done) => {
      chai.request(app)
      .get('/customers/-1')
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('error');
        res.body.error.should.be.eql('ObjectIdException');
        done();
      });
    });

    it('it should be a 404 with ObjectIdException when the id is wrong', (done) => {
      chai.request(app)
        .get('/customers/' + customers[0]._id.replace(/a|b|c|d/g, 'e'))
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property('error');
          res.body.error.should.be.eql('ObjectIdException');
          done();
        });
    });
  });

  describe('PUT /customers/:customerId', () => {
    it('it should update the first name to gregory', (done) => {
      let nc = customers[0];
      customers[0].profile.first_name = 'Gregory';
      chai.request(app)
        .put('/customers/' + nc._id)
        .send(nc.profile)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.eql(customers[0]);
          done();
        });
    });
  });

  describe('DELETE /customers/:customerId', () => {
    it('it should delete the customer', (done) => {
      let dc = customers[0];
      chai.request(app)
        .delete('/customers/' + dc._id)
        .end((err, res) => {
          res.should.have.status(204);
          done();
        });
      });
    it('it (/customers/) should have 0 customers', (done) => {
      chai.request(app)
        .get('/customers')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.length.should.be.eql(0);
          done();
        });
    });
  });
  
});
