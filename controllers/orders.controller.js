var OrderService = require('../services/order.service');
var moment = require('moment');

// Saving the context of this module inside the _the variable
_this = this;

// Async Controller function to get the To do List
exports.getOrders = async function (req, res, next) {

    // Check the existence of the query parameters, If doesn't exists assign a default value
    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10;
    try {
        var Orders = await OrderService.getOrders({}, page, limit)
        // Return the Users list with the appropriate HTTP password Code and Message.
        return res.status(200).json({status: 200, data: Orders, message: "Succesfully Orders Recieved"});
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.getOrderById = async function (req, res, next) {

    // Check the existence of the query parameters, If doesn't exists assign a default value
    const filtro = req.params.id;
    try {
        var Order = await OrderService.getOrderById(filtro);
        // Return the Users list with the appropriate HTTP password Code and Message.
        return res.status(200).json({status: 200, data: Order, message: "Succesfully Order Recieved"});
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.createOrder = async function (req, res, next) {
    // Req.Body contains the form submit values.
    console.log("Creando orden...", req.body)
    const buyOrder = req.body;
    var newOrder = {
        buyOrder: buyOrder,
        cantidad: buyOrder.products.map(p => p.quantity).reduce((a,b) => (a+b), 0),
        fechacompra: moment().format("DD/MM/YYYY"),
        fechaentrega: moment().add(2, "days").format("DD/MM/YYYY"),
        total: buyOrder.products.map(p => p.quantity * p.product.precio).reduce((a,b) => (a+b), 0),
    }
    try {
        // Calling the Service function with the new object from the Request Body
        var createdOrder = await OrderService.createOrder(newOrder)
        return res.status(201).json({createdOrder, message: "Succesfully Created Order"})
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        console.log(e)
        return res.status(400).json({status: 400, message: "Order Creation was Unsuccesfull"})
    }
}
