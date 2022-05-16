const { uploadFile } = require('../../config/upload-image.js');

module.exports = (app) => {
    const ezzayra = require('../controllers/ezzayra.controller.js');
     // Create a new ezzayra news
    app.post('/ezzayra',uploadFile, ezzayra.create);

    // Retrieve all news
    app.get('/ezzayra', ezzayra.findAll);


      // Retrieve all news
      app.get('/ezzayra/web', ezzayra.findAllWeb);

    // Retrieve a single news with newsId
    app.get('/ezzayra/details/:newsId', ezzayra.findOne);

    // Update a news with newsId
 
  app.post('/ezzayra/edit/:adId',uploadFile, ezzayra.update);
    // Delete a News with newsId
   app.delete('/ezzayra/:newsId', ezzayra.delete);

  app.get('/ezzayra/masquer/:newsId/:masquer', ezzayra.masquer);
}
