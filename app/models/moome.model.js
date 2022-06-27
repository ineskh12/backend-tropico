const mongoose = require('mongoose');

const MoomeSchema = mongoose.Schema({

    titre: String,
    image: String,

    description: {type:String,default:'empty'},
    categorie:{type: Number,default: 1 },
   
    //publishstate:{type: Date,default:false },
    masquer: {type:Boolean,default:false},
    langue: {type:String,default:'Ar'},

   // postedBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    lastUpdate:{type: Date,default: Date.now() },
}, {
    timestamps: true
});

module.exports = mongoose.model('Moome', MoomeSchema);