const Order = require('../models/order');
const Product = require('../models/product');
const mongoose = require('mongoose');

exports.orders_get_all = (req, res, next) => {
    Order
    .find()
    .select(' product quantity _id') // select these three objects to be returned
    .populate('product', 'name') // shows only name property of product object
    .exec()
    .then(docs => {
        res.status(200).json({
            count: docs.length, // provides a count of the number of items in orders database
            orders: docs.map(doc => { // map method used to return specified properties of order below
                return {
                    _id: doc._id,
                    product: doc.product,
                    quantity: doc.quantity,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/orders/' + doc._id
                    }
                }
            }),
            
        });
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    });
}

exports.orders_create_order = (req, res, next) => {
    Product.findById(req.body.productID)
    .then(product => {
        if (!product) { // !product means if product is not found
            return res.status(404).json({
                message: 'Product not found' // if product not found error 404 and this message will be returned
            });
        }
        const order = new Order({ // initialising the order object and its properties 
            _id: new mongoose.Types.ObjectId(),
            quantity: req.body.quantity,
            product: req.body.productID
        });
        // .save() gives you a real promise by default, no need to use .exec()
    return order.save();
    })
    .then(result => {
        console.log(result);
        res.status(201).json({
            message: 'Order stored',
            createdOrder: {
                _id: result._id,
                product: result.product,
                quantity: result.quantity
            },
            request: {
                type: 'GET',
                url: 'http://localhost:3000/orders/' + result._id
            }
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err. message || 'Internal Server Error' // err.message used to display exact error message for easier debugging
        });
    })
};

exports.orders_get_order = (req, res, next) => {
    Order.findById(req.params.orderID)
    .populate('product') // method used to select specific object and its properties to display
    .exec()
    .then(order => {
        if (!order) {
            return res.status(404).json({
                message: 'Order not found'
            })
        }
        res.status(200).json({
            order: order,
            request: {
                type: 'GET',
                url: 'http://localhost:3000/orders'
            }
        });
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    });
};

exports.orders_delete_order = (req, res, next) => {
    Order.deleteOne({_id: req.params.orderID})
    .exec()
    .then(order => {
        res.status(200).json({
            message: 'Order deleted',
            request: {
                type: 'POST',
                url: 'http://localhost:3000/orders',
                body: { productID: 'ID', quantity: 'Number'}
            }
        });
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    }) 
};
