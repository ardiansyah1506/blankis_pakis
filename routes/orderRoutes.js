const express = require('express');
const {
  checkout,
  getOrderHistory,
  getTransactionReport,
  getSalesReport,
  getUsers,
} = require('../controllers/orderController.js');
const authenticate = require('../middlewares/authMiddleware.js');

const router = express.Router();

router.post('/checkout', authenticate, checkout);
router.get('/:user_id', authenticate, getOrderHistory);
router.get('/report/transactions', authenticate, getTransactionReport);
router.get('/report/sales', authenticate, getSalesReport);
router.get('/report/:id', authenticate, getUsers);

// Ubah export default menjadi module.exports
module.exports = router;
