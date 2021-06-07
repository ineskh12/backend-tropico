const mongoose = require('mongoose');

const AdSchema = mongoose.Schema({
    url: String,
    externe: {
        type: Boolean,
        default: true
    },
    image: String,
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

module.exports = mongoose.model('Ad', AdSchema);