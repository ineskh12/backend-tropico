const mongoose = require('mongoose');
const ProductPrice = require("./productPrice.model")
const ProductSchema = mongoose.Schema({

    titreAr: String,
    titreFr: String,
    prix: [
        {
          type: ProductPrice.schema,
          ref: "ProductPrice",
        },
      ],
    categorieAr:String,
    categorieFr:String,
    pourcentage: {type: Number,default: 0 },
    langue: {type: String,default: 'Ar' },
    postedBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},

}, {
    timestamps: true
}, {versionKey: false});

module.exports = mongoose.model('Product', ProductSchema);