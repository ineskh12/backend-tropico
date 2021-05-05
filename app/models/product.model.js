const mongoose = require('mongoose');
const ProductPrice = require("./productPrice.model")

const ProductSchema = mongoose.Schema({

    titreAr: {
      type:String,
      required: true,
      unique: true
     },
    
    titreFr: {
      type:String,
      required: true,
      unique: true
     },

    prix: [
        {
          type: ProductPrice.schema,
          ref: "ProductPrice",
        },
      ],
    categorie: {type: String,default: '1' },
    etat:{type:String, default: 'visible'},
    pourcentage: {type: Number,default: 0 },
    langue: {type: String,default: 'Ar' },
    //postedBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    lastUpdate:{type: Date,default: Date.now() },
}, {
    timestamps: true
}, {versionKey: false});

module.exports = mongoose.model('Product', ProductSchema);