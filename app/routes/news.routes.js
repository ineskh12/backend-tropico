const { uploadFile } = require('../../config/upload-image.js');

module.exports = (app) => {
  const news = require('../controllers/news.controller.js');
  // Create a new news
  app.post('/api/news', uploadFile, news.create);
  // Retrieve all news
  app.get('/api/news', news.findAll);
  // Retrieve all news
  app.get('/api/news/web', news.findAllWeb);
  // Retrieve a single news with newsId
  app.get('/api/news/details/:newsId', news.findOne);
  // Update a news with newsId
  app.post('/api/news/edit/:adId', uploadFile, news.update);
  // Delete a News with newsId
  app.delete('/api/news/:newsId', news.delete);
  // Change news visiblity
  app.get('/api/news/masquer/:newsId/:masquer', news.masquer);
}
