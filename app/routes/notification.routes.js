module.exports = (app) => {
    const notifs = require('../controllers/notification.controller.js');
    app.post('/api/notification', notifs.create);
    app.get('/api/notifications', notifs.findAll);
}
