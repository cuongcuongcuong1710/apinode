import joi from 'joi';
import { BadReqError } from './errors';

export  function validateRequest(req, res, next){
    const schema = joi.object().keys({
        firstName: joi.string().required(),
        email: joi.string().email({ minDomainAtoms: 2 }).required(),
        userName: joi.string().alphanum().min(3).max(30).required(),
        passWord: joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required()
      })
    const result = joi.validate(req.body, schema);
    if(result.error){
      throw new BadReqError();
    }
    res.locals.object = result.value;
    next();
}

export  function validateProduct(req, res, next){
    const schema = joi.object().keys({
        name: joi.string().required(),
        quantity: joi.number().integer().min(0).required(),
        price: joi.number().min(0).required(),
        expired: joi.date().min('now').default(Date.now, 'current date')
      })
    const result = joi.validate(req.body, schema);
    if(result.error){
      console.log('nooooooo');
      throw new BadReqError();
    }
    res.locals.object = result.value;
    next();
}
