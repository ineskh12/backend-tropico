const mongoose = require('mongoose');

const NotificationSchema = mongoose.Schema({
    title: String,
    body: String,

}, {
    timestamps: true
});

module.exports = mongoose.model('Notification', NotificationSchema);