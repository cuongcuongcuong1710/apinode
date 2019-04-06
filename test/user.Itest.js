import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
chai.use(chaiHttp);
let should = chai.should();
import models from '../models';
import randomstring from 'randomstring';


describe('User', () => {

    let token;
    let firstID;
    let lastID;

    let nullUser = {
    }

    let newUser = {
        firstName: `cuong`,
        email: `cuong${randomstring.generate({ length: 5, charset: 'numeric' })}@gmail.com`,
        userName: randomstring.generate(10),
        passWord: "cuong"
    }

    let invalidUser = {
        firstName: "cuong",
        email: "cuong",
        userName: "c",
        passWord: "cuong"
    }


    before(function (done) {

        let loginUser = {
            userName: "zVJcGOx5Wt",
            passWord: "cuong"
        }
        chai.request(app)
            .post('/users/login')
            .send(loginUser)
            .end((err, res) => {
                console.log("token: ", res.text);
                token = res.text;
                done();
            })
        models.User.findAll()
            .then(users => {
                firstID = users[0].dataValues.id;

                lastID = users[users.length - 1].dataValues.id;
            });
    });

    it('Get All Users', (done) => {

        chai.request(app)
            .get('/users/all')
            .end((err, res) => {
                res.status.should.equal(200);
                res.body.should.be.a('object');
                done();
            });
    });

    it('GET User by ID Success', (done) => {

        chai.request(app)
            .get('/users/' + firstID)
            .set('Authorization', token)
            .end((err, res) => {
                res.status.should.equal(200);
                res.body.should.be.a('object');
                done();
            });
    });

    it('GET User by ID Faild, Not Found User', (done) => {

        chai.request(app)
            .get('/users/' + 1000000)
            .set('Authorization', token)
            .end((err, res) => {
                res.status.should.equal(404);
                res.body.should.be.a('object');
                done();
            });
    });

    it('GET User by ID Faild, UnAuthorization', (done) => {

        chai.request(app)
            .get('/users/' + firstID)
            .end((err, res) => {
                res.status.should.equal(401);
                res.body.should.be.a('object');
                done();
            });
    });

    it('PUT User by ID Faild, UnAuthorization', (done) => {

        chai.request(app)
            .put('/users/' + lastID)
            .send(newUser)
            .end((err, res) => {
                res.status.should.equal(401);
                done();
            });
    });

    it('PUT User by ID Faild, Not Found User', function (done) {

        chai.request(app)
            .put('/users/' + 100000)
            .set('Authorization', token)
            .send(newUser)
            .end((err, res) => {
                res.status.should.equal(404);
                done();
            });
    });

    it('PUT User by ID Success', (done) => {

        chai.request(app)
            .put('/users/' + lastID)
            .set('Authorization', token)
            .send(newUser)
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });

    it('PUT User by ID Faild, Invalid Input', (done) => {

        chai.request(app)
            .put('/users/' + lastID)
            .set('Authorization', token)
            .send(nullUser)
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });
    });

    it('PUT User by ID Faild, Invalid User', (done) => {

        chai.request(app)
            .put('/users/' + lastID)
            .set('Authorization', token)
            .send(invalidUser)
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });
    });

    it('DELETE User by ID Faild, Not Found User', (done) => {

        chai.request(app)
            .delete('/users/' + 100000)
            .set('Authorization', token)
            .end((err, res) => {
                res.status.should.equal(404);
                done();
            });
    });

    it('DELETE User by ID Faild, UnAuthorization', (done) => {

        chai.request(app)
            .delete('/users/' + lastID)
            .end((err, res) => {
                res.status.should.equal(401);
                done();
            });
    });

    it('DELETE User by ID Success', (done) => {

        chai.request(app)
            .delete('/users/' + lastID)
            .set('Authorization', token)
            .end((err, res) => {
                res.should.have.status(200);
                res.text.should.equal('Đã xóa');
                done();
            });
    });


    it('Create New User Faild, Invalid User', (done) => {

        chai.request(app)
            .post('/users/register')
            .send(invalidUser)
            .end((err, res) => {
                res.status.should.equal(400);
                done();
            });
    });

    it('Create New User Faild, Invalid Input', (done) => {

        chai.request(app)
            .post('/users/register')
            .send(nullUser)
            .end((err, res) => {
                res.status.should.equal(400);
                done();
            });
    });

    it('Create New User Success', (done) => {

        chai.request(app)
            .post('/users/register')
            .send(newUser)
            .end((err, res) => {
                res.status.should.equal(200);
                res.body.should.be.a('object');
                res.body.should.have.property('firstName');
                res.body.should.have.property('email');
                res.body.should.have.property('userName');
                res.body.should.have.property('passWord');
                done();
            });
    });
})
