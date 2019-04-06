import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
chai.use(chaiHttp);
let should = chai.should();
import verifyJWT from '../src/middleWares/verifyJWT';
import validateRequest from '../src/middleWares/validateRequest';

describe('ValidateRequest Function', () => {
    let req;
    let res;
    let next;
    beforeEach(() => {
        req = {
          body: {
            firstName: "cuong",
            email: "cuong@gmail.com",
            userName: "cuong",
            passWord: "cuong"
          }
        }
    
        res = {
          query: {},
          headers: {},
          data: null,
          json(payload) {
            this.data = JSON.stringify(payload)
          },
          cookie(name, value, options) {
              this.headers[name] = value
          }
        }
    
        next.mockReset()
      })
    
})
