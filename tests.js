"use strict";
let mongoose = require("mongoose");
let Coach = require('./coach.js');
let testObject = require("./exampleObject.js");
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('./index.js');
let wagner = require('wagner-core');

require('./models')(wagner);

chai.use(chaiHttp);
let expect = require('chai').expect
describe('Coaches', () => {
  before(wagner.invoke(function (Coach) {
    return function (done) {
      Coach.remove({}, (err) => {
        done();
      });
    }
  }));


  describe('/GET heartbeat', () => {
    it('should be alive', (done) => {
      chai.request(server)
        .get('/api/v1/coach/heartbeat')
        .end((err, res) => {
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('api', 'online');
          done();
        });
    });
  });
  describe('/POST coach', () => {
    it('should not POST without name', (done) => {
      var newTestObject = JSON.parse(JSON.stringify(testObject));

      delete newTestObject.profile.name;
      chai.request(server)
        .post('/api/v1/coach/new')
        .send(newTestObject)
        .end((err, res) => {
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('error');
          done();
        });
    });


  });
  describe('/POST coach', () => {
    it('should POST a coach just fine', (done) => {

      chai.request(server)
        .post('/api/v1/coach/new')
        .send(testObject)
        .end((err, res) => {
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property("succesfully saved");
          done();
        });
    });


  });
  describe('/POST coach', () => {
    it('should modify existing user', (done) => {
      chai.request(server)
        .post('/api/v1/coach/new')
        .send(testObject)
        .end((err, res) => {
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property("succesfully saved", 'user modified');
          done();
        });
    });
  });

  describe('/GET searchCategories', () => {
    it('should return one object', (done) => {
      chai.request(server)
        .get('/api/v1/coach/searchCategories').query({
          email: 'usyeow@korko.cf',
          longitude: '20.48',
          lattitude: '52.2',
          radius: 100,
          name: 'on',
          subjects: 'polish',
          level: ['uniPrice', 'secondaryPrice'],
          lowEnd: 0,
          highEnd: 100,
          sort: 'average',
          order: -1
        })
        .end((err, res) => {
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('coaches').to.have.lengthOf(1);
          expect(res.body).to.have.deep.property('coaches[0].profile.email', 'usyeow@korko.cf');
          done();
        });
    });
  });
  describe('/GET deleteOne', () => {
    it('should not delete without email', (done) => {
      chai.request(server)
        .get('/api/v1/coach/deleteOne').
      end((err, res) => {

        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error', "no email specified");
        done();
      });
    });
  });
 describe('/GET deleteOne', () => {
    it('should delete the user', (done) => {
      chai.request(server)
        .get('/api/v1/coach/deleteOne').query({
          email: 'on@on.net'
        })
        .end((err, res) => {

          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('user', 'deleted');
          done();
        });
    });
  });

});