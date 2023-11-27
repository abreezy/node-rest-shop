// required imports 
const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const OrdersController = require('../controllers/orders'); // importing orders controller

// Handle incoming GET requests to /orders
router.get('/', checkAuth, OrdersController.orders_get_all);

// Handle incoming POST requests to /orders
router.post('/', checkAuth, OrdersController.orders_create_order);

// Handle incoming GET requests to /orders with specified order ID
router.get('/:orderID', checkAuth, OrdersController.orders_get_order);

// Handle incoming DELETE requests to /orders with specified order ID
router.delete('/:orderID', checkAuth, OrdersController.orders_delete_order);

// exporting orders function
module.exports = router;
