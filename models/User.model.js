var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


var UserSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    address: {
        address1: {type: String},
        province: {type: String},
        city: {type: String},
        zip: {type: Number}
    },
    payment: {
        cardName: {type: String},
        cardNumber: {type: String},
        expDate: {type: String},
        cvv: {type: Number},
    },
    isAdmin: Boolean,
    isGuest: Boolean,
    avatar: String,
})

UserSchema.plugin(mongoosePaginate)
const User = mongoose.model('User', UserSchema)

module.exports = User;
