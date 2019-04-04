var express = require('express');
var router = express.Router();
import { getAllUser, createUser, login, updateUser, deleteUser } from '../src/services/users.service';
import { verifyJWT } from '../src/middleWares/verifyJWT';

/* GET users listing. */
router.get('/all', getAllUser);

router.post('/register', createUser);

router.post('/login', login);

router.put('/:id',verifyJWT, updateUser);

router.delete('/:id', verifyJWT, deleteUser);

module.exports = router;
