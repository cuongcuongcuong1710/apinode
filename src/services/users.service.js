import models from '../../models';
import bcrypt from 'bcryptjs';
import { NotFoundError, BadReqError } from '../middleWares/errors';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import joi from 'joi';
import * as constants from '../commons/constants';
const privateKey = fs.readFileSync('./src/commons/secretKey.txt');

export async function getAllUser(req, res, next){

  try {
    const users = await models.User.findAndCountAll();
    if(!users){
      throw new NotFoundError('Users');
    }
    //const object = JSON.parse(users);
    res.send(users);
  } catch (error) {
    res.send(error);
  }
}

export async function createUser(req, res, next){

  const object = res.locals.object;
  try {
        const hashPassword = await bcrypt.hashSync(object.passWord, 10);
        const user = await models.User.create({
          firstName: object.firstName,
          email: object.email,
          userName: object.userName,
          passWord: hashPassword
        })
        res.send(user);
  } catch (error) {
    
    next(error);
  }
}

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

export async function getUserByID(req, res, next){

  const userID = req.params.id;
  try {
    const user = await models.User.findOne({
      where:{
        id: userID
      }
    });
    if(!user){
        throw new NotFoundError(`user ID: ${userID}`);
    }
    const userResponse = {
    id: user.id,
    firstName: user.firstName,
    email: user.email,
    userName: user.userName,
    image: `${constants.apiHost}${constants.apiPath}/${user.userImage}`
    }
    res.send(userResponse);
  } catch (e) {
    next(e);
  }
}

export async function updateUser(req, res, next){

  const userID = req.params.id;
  const object = res.locals.object;
  try {
    const user = await models.User.findOne({
      where:{
        id: userID
      }
    });
    if(!user){
      throw new NotFoundError(`user ID: ${userID}`);
    }
      const hashPassword = bcrypt.hashSync(object.passWord, 10);
      const newUser = await user.update({
        firstName: object.firstName,
        email: object.email,
        userName: object.userName,
        passWord: hashPassword
      })
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