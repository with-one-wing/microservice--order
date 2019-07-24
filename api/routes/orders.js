const {orderAll, createOrder, updateOrder, getOrder, deleteOrder} = require("../controllers/orders");

const express = require('express');
const router = express.Router();
const checkAuth = require('auth_vvv');

router.use(checkAuth);
router.route('/')
    .get(orderAll)
    .post(createOrder);
router.route('/:id')
    .get(getOrder)
    .patch(updateOrder)
    .delete(deleteOrder);

module.exports = router;