const Order = require('../models/OrderModel');
const User = require('../models/UserModel');

// GET /api/orders
const getListOrder = (req, res, next) => {
    Order.find()
        .then((orders) => {
            res.json({
                data: orders,
                message: 'success',
            })
        })
}

// GET /api/orders/:id
const getOneOrder = (req, res, next) => {
    Order.findById(req.params.id)
        .then((order) => {
            res.json({
                data: order,
                message: 'success',
            })
        })
}

// GET /api/orders/:id/detail
const getDetailOrder = (req, res, next) => {
    Order.findById(req.params.id)
        .then((order) => {
            res.json({
                data: order.detail,
                message: 'success',
            })
        })
}

// POST /api/orders
const addOrder = (req, res, next) => {

    let order = new Order({
        id_customer: req.body.id_customer,
        name: req.body.name,
        phone: req.body.phone,
        address: req.body.address,
        total_pay: Number(req.body.total_pay),
        detail: req.body.detail,
        payments: {
            cod: req.body.payments === "cod",
            atm: req.body.payments === "atm",
            e_wallet: req.body.payments === "e_wallet",
        },
    })
        .save()
        .then((order) => {
            User.updateOne({ _id: order.id_customer }, {
                $inc: {
                    total_pay: order.total_pay,
                    total_order: 1,
                    total_point: order.total_pay / 1000
                },
                $push: {
                    list_orders: {
                        id_order: order._id,
                        total_pay: order.total_pay
                    },
                }
            })
                .then(() => {
                    res.status(200).json({
                        message: 'success'
                    });
                })
        })
        .catch(next)
}

// PUT /api/orders/:id
const updateStatusOrder = (req, res, next) => {
    Order.updateOne({ _id: req.params.id }, {
        $set: {
            status: {
                confirmed: true,
                wait_confirm: false
            }
        }
    })
        .then(() => {
            res.status(200).json({
                message: 'success'
            });
        })
}

module.exports = {
    getListOrder,
    getOneOrder,
    getDetailOrder,
    addOrder,
    updateStatusOrder
}