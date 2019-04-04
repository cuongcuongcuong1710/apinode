import fs from 'fs';
import jwt from 'jsonwebtoken';
import { UnauthorizedError } from './errors';
const privateKey = fs.readFileSync('./src/commons/secretKey.txt');

export const verifyJWT = (req, res, next) => {
  const token = req.headers['authorization'];
  jwt.verify(token, privateKey, (err, decoded) => {
  if(err) {
    throw new UnauthorizedError();
  }else {
    const { userName, userId } = decoded;
    res.locals.user = { userName, userId };
    next();
  }
  });
}