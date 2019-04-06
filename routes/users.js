var express = require('express');
var router = express.Router();
import { getAllUser, createUser, login, updateUser, deleteUser, getUserByID } from '../src/services/users.service';
import { verifyJWT } from '../src/middleWares/verifyJWT';
import { validateRequest } from '../src/middleWares/validateRequest';
import { UploadImage, Upload } from '../src/middleWares/uploadImage';

/* GET users listing. */
router.get('/all', getAllUser);

router.post('/register', validateRequest, createUser);

router.post('/login', login);

router.get('/:id', verifyJWT, getUserByID);

router.put('/:id', verifyJWT, validateRequest, updateUser);

router.delete('/:id', verifyJWT, deleteUser);

router.post('/upload', verifyJWT, Upload.single('file'), UploadImage);

module.exports = router;
