import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
chai.use(chaiHttp);
let should = chai.should();
import models from '../models';

describe('Product', () => {

    let token;
    let firstID;
    let lastID;

    let nullItem = {
    }

    let invalidItem = {
        name: "product 10",
        quantity: -1,
        price: -1,
        expired: "1-1-2000"
    }

    let item = {
        name: "pro10",
        quantity: 10,
        price: 100000,
        expired: '5-25-2019'
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
            });

        models.Product.findAll()
            .then(items => {
                firstID = items[0].dataValues.id;
                lastID = items[items.length - 1].dataValues.id;
            });
    });

    it('GET All Products Success', (done) => {

        chai.request(app)
            .get('/products/all')
            .end((err, res) => {
                res.status.should.equal(200);
                res.body.should.be.a('array');
                done();
            })
    })

    it('GET Product By ID Success', (done) => {

        chai.request(app)
            .get('/products/' + firstID)
            .end((err, res) => {
                res.status.should.equal(200);
                res.body.should.be.a('object');
                done();
            });
    })

    it('GET Product By ID Faild, Not Found Product', (done) => {

        chai.request(app)
            .get('/products/' + 100000)
            .end((err, res) => {
                res.status.should.equal(404);
                res.body.should.be.a('object');
                done();
            });
    })

    it('PUT Product By ID Faild, UnAuthorization', (done) => {

        chai.request(app)
            .put('/products/' + lastID)
            .send(item)
            .end((err, res) => {
                res.status.should.equal(401);
                done();
            });
    })

    it('PUT Product By ID Faild, Invalid Input Null', (done) => {

        chai.request(app)
            .put('/products/' + lastID)
            .set('Authorization', token)
            .send(nullItem)
            .end((err, res) => {
                res.status.should.equal(400);
                done();
            });
    })

    it('PUT Product By ID Faild, Invalid Input', (done) => {

        chai.request(app)
            .put('/products/' + lastID)
            .set('Authorization', token)
            .send(invalidItem)
            .end((err, res) => {
                res.status.should.equal(400);
                done();
            });
    })

    it('PUT Product By ID Success', (done) => {

        chai.request(app)
            .put('/products/' + lastID)
            .set('Authorization', token)
            .send(item)
            .end((err, res) => {
                res.status.should.equal(200);
                done();
            });
    })

    it('DELETE Product By ID Faild, UnAuthorization', (done) => {

        chai.request(app)
            .delete('/products/' + lastID)
            .end((err, res) => {
                res.status.should.equal(401);
                done();
            });
    })

    it('DELETE Product By ID Faild, Not Found Product', (done) => {

        chai.request(app)
            .delete('/products/' + 100000)
            .set('Authorization', token)
            .end((err, res) => {
                res.status.should.equal(404);
                done();
            });
    })

    it('DELETE Product By ID Success', (done) => {

        chai.request(app)
            .delete('/products/' + lastID)
            .set('Authorization', token)
            .end((err, res) => {
                res.status.should.equal(200);
                res.text.should.equal('Đã xóa');
                done();
            });
    })

    it('Create Product By ID Faild, UnAuthorization', (done) => {

        chai.request(app)
            .post('/products/create')
            .send(item)
            .end((err, res) => {
                res.status.should.equal(401);
                done();
            });
    })

    it('Create Product By ID Faild, Invalid Input Null', (done) => {

        chai.request(app)
            .post('/products/create')
            .set('Authorization', token)
            .send(nullItem)
            .end((err, res) => {
                res.status.should.equal(400);
                done();
            });
    })

    it('Create Product By ID Faild, Invalid Input', (done) => {

        chai.request(app)
            .post('/products/create')
            .set('Authorization', token)
            .send(invalidItem)
            .end((err, res) => {
                res.status.should.equal(400);
                done();
            });
    })

    it('Create Product By ID Success', (done) => {

        chai.request(app)
            .post('/products/create')
            .set('Authorization', token)
            .send(item)
            .end((err, res) => {
                res.status.should.equal(200);
                res.body.should.be.a('object');
                res.body.should.have.property('name');
                res.body.should.have.property('quantity');
                res.body.should.have.property('price');
                done();
            });
    })

})