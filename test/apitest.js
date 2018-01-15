//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let Users = require('../models/users');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../bmapp');
let should = chai.should();

chai.use(chaiHttp);
//Our parent block
describe('Users', () => {
	beforeEach((done) => { //Before each test we empty the database
		Users.remove({}, (err) => {
			done();
		});
	});
	/*
  * Test the /POST route
  */
	describe('/POST user', () => {
		it('it inserts a new user', (done) => {

			let newUser={ email: 'test@test.com', secret : 'SECRET' };
			
			chai.request(server)
			    .post('/api/v1/user')
			    .send(newUser)
			    .end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('object');
					res.body.should.have.property('message');
					
					done();
				});
		});
	});

});
