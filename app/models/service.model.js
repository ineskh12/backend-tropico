const mongoose = require('mongoose');

const ServiceSchema = mongoose.Schema({

    titre: String,
    image: String,
    video: String,
    langue: {type:String,default:'Ar'},
    postedBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    lastUpdate:{type: Date,default: Date.now() },
}, {
    timestamps: true
});

module.exports = mongoose.model('Service', ServiceSchema);