const { uploadFile } = require('../../config/upload-image.js');

module.exports = (app) => {
    const moomes = require('../controllers/moome.controller.js');
     // Create a new moome news
    app.post('/moome',uploadFile, moomes.create);

    // Retrieve all news
    app.get('/moome', moomes.findAll);


      // Retrieve all news
      app.get('/moome/web', moomes.findAllWeb);

    // Retrieve a single news with newsId
    app.get('/moome/details/:newsId', moomes.findOne);

    // Update a news with newsId
 
  app.post('/moome/edit/:newsId',uploadFile, moomes.update);
    // Delete a News with newsId
   app.delete('/moome/:newsId', moomes.delete);

  app.get('/moome/masquer/:newsId/:masquer', moomes.masquer);
}
