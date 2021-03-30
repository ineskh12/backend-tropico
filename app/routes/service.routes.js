module.exports = (app) => {
  const service = require('../controllers/service.controller.js');

 
  app.post('/service', service.create);

  app.get('/service/all', service.findAllfront);


  // Retrieve all service
  app.get('/service', service.findAll);

}
