const express = require('express');
const multer = require('multer');
const {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController.js');
const authenticate = require('../middlewares/authMiddleware.js');

const router = express.Router();

router.post('/', authenticate, createProduct);
router.get('/:id', authenticate, getProducts);
router.put('/:id', authenticate, updateProduct);
router.delete('/:id', authenticate, deleteProduct);

// Ubah export default menjadi module.exports
module.exports = router;
