const mongoose = require('mongoose');

const ProductCategorieSchema = mongoose.Schema({

    categorieAr:{type:String, enum:['خضر','غلال','أسماك','لحوم']},
categorieFr:{type:String, enum: ['viandes', 'poissons','fruits','legumes']},
categorieid: {type:Number, enum:[1,2,3,4],default: '4'}

}, {
    timestamps: true
});

module.exports = mongoose.model('ProductCategorie', ProductCategorieSchema);