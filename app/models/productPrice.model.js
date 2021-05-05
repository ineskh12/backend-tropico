const mongoose = require('mongoose');

const ProductPriceSchema = mongoose.Schema({

    prixMin: Number,
    prixMax: Number,
    prixMoy: Number

}, {
    timestamps: true
});

module.exports = mongoose.model('ProductPrice', ProductPriceSchema);