const mongoose = require('mongoose');

const NewsSchema = mongoose.Schema({

    titre: String,
    image: String,
    description: String,
    langue: {type:String,default:'Ar'},
    postedBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},

}, {
    timestamps: true
});

module.exports = mongoose.model('News', NewsSchema);