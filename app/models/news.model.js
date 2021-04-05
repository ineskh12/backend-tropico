const mongoose = require('mongoose');

const NewsSchema = mongoose.Schema({

    titre: String,
    image: String,
    url: {type:String,default:'empty'},
    description: {type:String,default:'empty'},
    categorie:{type: Number,default: 1 },
    externe: Boolean,
    langue: {type:String,default:'Ar'},
    postedBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    lastUpdate:{type: Date,default: Date.now() },
}, {
    timestamps: true
});

module.exports = mongoose.model('News', NewsSchema);