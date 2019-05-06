const express = require('express');
const router = express.Router();
import { getAllProduct, createProduct, getProductByID, updateProduct, deleteProduct } from '../src/services/products.service';
import { verifyJWT } from '../src/middleWares/verifyJWT';
import { validateProduct } from '../src/middleWares/validateRequest';

router.get('/all', getAllProduct);

router.post('/create', verifyJWT, validateProduct, createProduct);

router.get('/:id', getProductByID);

router.put('/:id', verifyJWT, validateProduct, updateProduct);

router.delete('/:id', verifyJWT, deleteProduct);

module.exports = router;