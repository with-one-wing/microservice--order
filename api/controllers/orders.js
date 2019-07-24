const Order = require('../models/order');
const Product = require('../models/product');
const mongoose = require("mongoose");

exports.orderAll = async (req, res, next) => {
    try {
        const list = await Order.find().populate('product', 'name');
        const resp = {
            count: list.length,
            orders: list.map(obj => {
                return {
                    _id: obj._id,
                    quantity: obj.quantity,
                    product: {},
                    request: {
                        type: 'GET', url: 'http://localhost:3000/products/' + obj._id
                    }
                }
            })
        };
        res.status(200).json(resp);
    } catch (e) {
        next(e);
    }


    res.status(200).json({
        'message': 'Handle GET for /orders'
    });
};

exports.createOrder = async (req, res, next) => {

    try {
        const product = await Product.findById(req.body.productId);
        if (!product) {
            throw new Error('Product Not Found', 404);
        }
        const order = new Order({
            _id: new mongoose.Types.ObjectId(),
            quantity: req.body.quantity,
            product: product._id
        });
        await order.save();
        res.status(201).json({
            order,
            request: {type: 'GET', url: 'http://localhost:3000/orders/' + order._id}
        });
    } catch (e) {
        next(e);
    }

};

exports.getOrder = async (req, res, next) => {
    try {
        const id = req.params.id;
        const order = await Order.findById(id).populate('product').select('_id quantity product');

        res.status(200).json({
            res: order,
            request: {
                type: 'GET',
                description: 'Get all orders',
                url: 'http://localhost:3000/orders/'
            }
        });
    } catch (e) {
        next(e);
    }
};

exports.updateOrder = async (req, res, next) => {
    res.status(200).json({
        message: `Update order ${req.params.id}`
    });
};

exports.deleteOrder = async (req, res, next) => {
    try {
        const result = await Order.remove({_id: req.params.id});
        if (result.n === 0) {
            throw new Error('Not found to delete');
        }
        res.status(202).json({
            message: 'Successfully deleted',
            result: result,
            request: {
                type: 'GET',
                description: 'Get all orders',
                url: 'http://localhost:3000/orders/'
            }
        });
    } catch (e) {
        next(e);
    }
};