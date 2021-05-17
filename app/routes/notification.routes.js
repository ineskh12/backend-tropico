module.exports = (app) => {
    const notifs = require('../controllers/notification.controller.js');
  
    app.post('/notification', notifs.create);

   
    app.get('/notifications', notifs.findAll);


   

    
}
