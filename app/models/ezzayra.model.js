const mongoose = require('mongoose');

const EzzayraSchema = mongoose.Schema({

    titre: String,
    image: String,

    description: {type:String,default:'empty'},
   
    masquer: {type:Boolean,default:false},
  

   // postedBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    lastUpdate:{type: Date,default: Date.now() },
}, {
    timestamps: true
});

module.exports = mongoose.model('Ezzayra', EzzayraSchema);