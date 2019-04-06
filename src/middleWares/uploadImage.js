
import multer from 'multer';
import * as constants from '../commons/constants';
import models from '../../models';
import { BadReqError } from './errors';

const storage = multer.diskStorage({

    destination: (req, file, cb) => {
      cb(null, constants.imagePath)
    },
    filename: (req,file,cb)=>{
      cb(null,file.originalname)
    }
})

  
const fileFilter = (req, file, cb) => {

    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        cb(null, true);
    } else{
      cb(null, false);
    }
};

  
export const Upload = multer({

    storage: storage,
    limits: {
      fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});


export async function UploadImage(req, res, next){

    try {
        const { file }  = req;
        const { userId }= res.locals.user;
        if(file){
            const user =  await models.User.findOne({
              where: {
                id: userId
              }
            });
            const userUpdate = await user.update({
                  userImage: file.originalname
            });
            res.send(userUpdate);
        }
        throw new BadReqError();
    } catch (error) {
        next();
    }
  }
