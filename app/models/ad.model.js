const mongoose = require('mongoose');

const AdSchema = mongoose.Schema({
    url: String,
    externe: Boolean,
    image: String,
    langue: {type:String,default:'Ar'},
    postedBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
   
}, {
    timestamps: true
});

module.exports = mongoose.model('Ad', AdSchema);