const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    email: String,
    motdepasse: String,
    langue: {type:String,default:'Ar'},
    role: String
}, {
    timestamps: true
});

module.exports = mongoose.model('User', UserSchema);