var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')

var OrderSchema = new mongoose.Schema({
    buyOrder: {
        user: {
            firstName: String,
            lastName: String,
            email: String,
        },
        address: {
            address1: String,
            province: String,
            city: String,
            zip: Number,
        },
        payment: {
            cardName: String,
            cardNumber: String,
            expDate: String,
            cvv: Number,
            address1: String,
            province: String,
            city: String,
            zip: Number
        },
        products: [{
            product: {
                img: String,
                marca: String,
                modelo: String,
                precio: Number,
                categoria: String,
                interfaz: String,
                nombre: String,
            },
            quantity: Number,
        }]
    },
    cantidad: Number,
    fechacompra: String,
    fechaentrega: String,
    total: Number,
})

OrderSchema.plugin(mongoosePaginate)
const Order = mongoose.model('Order', OrderSchema)

module.exports = Order;
