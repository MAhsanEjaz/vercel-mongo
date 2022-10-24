var mongoose = require('mongoose');

const productScheme = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    price: { type: String, required: true },
    productImage: { type: String, required: true }

});

module.exports = mongoose.model('image', productScheme)