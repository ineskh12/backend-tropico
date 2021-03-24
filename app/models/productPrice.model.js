const mongoose = require('mongoose');

const ProductPriceSchema = mongoose.Schema({

    prix: Number

}, {
    timestamps: true
});

module.exports = mongoose.model('ProductPrice', ProductPriceSchema);