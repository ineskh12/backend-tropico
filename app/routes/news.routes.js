const {uploadFile} = require('../../config/single-file-upload');
module.exports = (app) => {
    const news = require('../controllers/news.controller.js');
    app.get('/news/all', news.findAllfront);


    // Create a new news
    app.post('/news',uploadFile, news.create);

    // Retrieve all news
    app.get('/news', news.findAll);

    // Retrieve a single news with newsId
    app.get('/news/:newsId', news.findOne);

    // Update a news with newsId
    app.put('/news/:newsId',uploadFile, news.update);

    // Delete a News with newsId
    app.delete('/news/:newsId', news.delete);
}
