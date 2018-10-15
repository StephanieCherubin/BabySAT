const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const Babysatter = require('../models/babysatter.js');
const sampleBabysatter =     {
    "title": "Super Sweet Babysitter",
    "description": "A great babysatters of a lovely babysitter.",
}

chai.use(chaiHttp);
chai.should();

describe('Babysatters', ()  => {

  after(() => {
    Babysatter.deleteMany({title: 'Super Sweet Babysitter'}).exec((err, babysatters) => {
      console.log(babysatters)
      babysatters.remove();
    })
  });

  // TEST INDEX
  it('should index ALL babysatters on / GET', (done) => {
    chai.request(app)
        .get('/')
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.html;
          done();
        });
  });

  // TEST NEW
  it('should display new form on /babysatters/new GET', (done) => {
      chai.request(app)
        .get(`/babysatters/new`)
          .end((err, res) => {
            res.should.have.status(200);
            res.should.be.html
            done();
          });
});

  // TEST CREATE
  it('should create a SINGLE babysatters on /babysatters POST', (done) => {
   chai.request(app)
     .post(`/babysatters/new`)
       .end((err, res) => {
         res.should.have.status(200);
         res.should.be.html
         done();
       });
 });

  // TEST SHOW
  it('should show a SINGLE babysatters on /babysatters/<id> GET', (done) => {
    var babysatters = new Babysatter(sampleBabysatter);
    babysatters.save((err, data) => {
      chai.request(app)
        .get(`/babysatters/${data._id}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.html
          done();
        });
    });
  });

  // TEST EDIT
  it('should edit a SINGLE babysatters on /babysatters/<id>/edit GET', (done) => {
    var babysatters = new Babysatter(sampleBabysatter)
     babysatters.save((err, data) => {
       chai.request(app)
         .get(`/babysatters/${data._id}/edit`)
         .end((err, res) => {
           res.should.have.status(200);
           res.should.be.html
           done();
         });
     });
    });

    // TEST CREATE
  // it('should create a SINGLE babysatters on /babysatters POST', (done) => {
  //   chai.request(app)
  //       .post('/babysatters')
  //       .send(sampleBabysatter)
  //       .end((err, res) => {
  //         res.should.have.status(200);
  //         res.should.be.html
  //         done();
  //       });
  // });

  // TEST UPDATE
  it('should update a SINGLE babysatters on /babysatters/<id> PUT', (done) => {
    var babysatters = new Babysatter(sampleBabysatter);
    babysatters.save((err, data)  => {
     chai.request(app)
      .put(`/babysatters/${data._id}?_method=PUT`)
      .send({'title': 'Updating the title'})
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.html
        done();
      });
    });
  });

  // TEST DELETE
  it('should delete a SINGLE babysatters on /babysatters/<id> DELETE', (done) => {
    var babysatters = new Babysatter(sampleBabysatter);
    babysatters.save((err, data)  => {
     chai.request(app)
      .delete(`/babysatters/${data._id}?_method=DELETE`)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.html
        done();
      });
    });
  });
});