import models from '../../models';
import bcrypt from 'bcryptjs';
import { NotFoundError, BadReqError } from '../middleWares/errors';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import joi from 'joi';
const privateKey = fs.readFileSync('./src/commons/secretKey.txt');

export async function getAllUser(req, res, next){
  try {
    const user = await models.User.findAndCountAll();
    if(!user){
      throw new NotFoundError('User');
    }
    res.send(user);
  } catch (error) {
    res.send(error);
  }
}

// export async function createUser(req, res, next){
//   const {firstName, email, userName, passWord} = req.body;
//   const hashPassword = bcrypt.hashSync(passWord, 10);
//   try {
//     const user = await models.User.create({
//       firstName: firstName,
//       email: email,
//       userName: userName,
//       passWord: hashPassword
//     })
//     res.send(user);
//   } catch (error) {
//     next(error);
//   }
// }

export async function createUser(req, res, next){
  try {
    const schema = joi.object().keys({
      firstName: joi.string().min(3).max(30).required(),
      email: joi.string().email(),
      userName: joi.string(),
      passWord: joi.string()
    })
    const { value, err} = joi.validate(req.body, schema);
    res.send(value);
    const hashPassword = bcrypt.hashSync(value.passWord, 10);
    if(err){
      throw new BadReqError();
    }
    const user = await models.User.create({
      firstName: value.firstName,
      email: value.email,
      userName: value.userName,
      passWord: hashPassword
    })
    res.send(user);
  } catch (error) {
    next(error);
  }
}
  



// export async function createUser(req, res, next){
//   //const {firstName, email, userName, passWord} = req.body;
//   const data = req.body;
//   const schema = Joi.object().keys({
//     firstName: Joi.string(),
//     email: Joi.string().email().required(),
//     userName: Joi.string().alphanum().min(6).max(16).required(),
//     //birthday: Joi.date().max('1-1-2004').iso(),
//     passWord: Joi.string().regex(/^[a-zA-Z0-9]{6,16}$/).min(6).required()
//   });

//   Joi.validate(data, schema,async (err, value) => {
//     if (err) {
//         throw new BadReqError();
//     } else {
//        try {
//          const hashPassword = bcrypt.hashSync(value.passWord, 10);
//       const user = await models.User.create({
//         firstName: value.firstName,
//         email: value.email,
//         userName: value.userName,
//         passWord: hashPassword
//       })
//       res.send(user);
//        } catch (error) {
//          next(error);
//        }
//     }
//   });
// }

export async function login(req, res, next){
  const {userName, passWord} = req.body;
  try {
    const user = await models.User.findOne({
      where:{
        userName: userName
      }
    })
    if(!user){
      throw new NotFoundError(`User`);
    }
    const kq = bcrypt.compareSync(passWord, user.passWord);
    if(kq === false){
      throw new NotFoundError('Username And Password');
    }
      const token = jwt.sign({userId:user.id,userName:user.userName}, privateKey, {expiresIn:'1h'});
      res.send(token);
    }
  catch (error) {
    next(error);
  }
}

export async function updateUser(req, res, next){
  //const {userId} = res.locals.user;
  const userID = req.params.id;
  const {firstName, email, userName, passWord} = req.body;
  const hashPassword = bcrypt.hashSync(passWord, 10);

  try {
    const user = await models.User.findOne({
      where:{
        id: userID
      }
    });
    if(!user){
      throw new NotFoundError(`user ID: ${userID}`);
  }
    const newUser = await user.update({
      firstName,email,userName,passWord: hashPassword
    });
    res.send(newUser);
  } catch (error) {
    next(error);
  }
}

export async function deleteUser(req, res, next){
  const userId = req.params.id;
  try {
    const user = await models.User.findOne({
      where:{
        id: userId
      }
    });
    if(!user){
        throw new NotFoundError(`user ID: ${userId}`);
    }
    models.User.destroy({
      where:{
        id: userId
      }
    });
    res.send('Đã xóa');
  } catch (error) {
    next(error);
  }
}