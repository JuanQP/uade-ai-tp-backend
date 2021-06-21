var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


var ProductSchema = new mongoose.Schema({
    img: String,
    marca: String,
    modelo: String,
    peso: String,
    precio: Number,
    stock: Number,
    categoria: String,
    descripcion: String,
    interfaz: String,
    nombre: String,
})

ProductSchema.plugin(mongoosePaginate)
const Product = mongoose.model('Product', ProductSchema)

module.exports = Product;
