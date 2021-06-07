const mongoose = require('mongoose');

const NewsSchema = mongoose.Schema({
    titre: String,
    image: String,
    url: {
        type: String,
        default: 'empty'
    },
    description: {
        type: String,
        default: 'empty'
    },
    categorie: {
        type: Number,
        default: 1
    },
    externe: Boolean,
    masquer: {
        type: Boolean,
        default: false
    },
    langue: {
        type: String,
        default: 'Ar'
    },
    lastUpdate: {
        type: Date,
        default: Date.now()
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('News', NewsSchema);