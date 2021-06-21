// Gettign the Newly created Mongoose Model we just created
var Product = require('../models/Product.model');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

// Saving the context of this module inside the _the variable
_this = this

// Async function to get the User List
exports.getProducts = async function (query, page, limit) {

    // Options setup for the mongoose paginate
    var options = {
        page,
        limit
    }
    // Try Catch the awaited promise to handle the error
    try {
        console.log("Query",query)
        var Products = await Product.paginate(query, options)
        // Return the Userd list that was retured by the mongoose promise
        return Products;

    } catch (e) {
        // return a Error message describing the reason
        console.log("error services",e)
        throw Error('Error while Paginating Users');
    }
}

exports.getLatestProducts = async function () {

    // Try Catch the awaited promise to handle the error
    try {
        var Products = await Product.find().sort({$natural: -1}).limit(4);
        return Products;

    } catch (e) {
        // return a Error message describing the reason
        console.log("error services",e)
        throw Error('Error while retrieving Products');
    }
}

exports.getLatestSonido = async function () {

    // Try Catch the awaited promise to handle the error
    try {
        var Products = await Product.find({categoria: 'Parlante'}).sort({$natural: -1}).limit(4);
        return Products;

    } catch (e) {
        // return a Error message describing the reason
        console.log("error services",e)
        throw Error('Error while retrieving Products');
    }
}

exports.getProductById = async function (id) {

    // Try Catch the awaited promise to handle the error
    try {
        var ProductResult = await Product.findById(id);
        return ProductResult;

    } catch (e) {
        // return a Error message describing the reason
        console.log("error services",e)
        throw Error('Error while retrieving Product');
    }
}
