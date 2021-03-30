
const {uploadFile} = require('../../config/single-file-upload');
module.exports = (app) => {
    const ads = require('../controllers/ad.controller.js');
    app.get('/ads/all', ads.findAllfront);


    // Create a new Ad
    app.post('/ads',uploadFile, ads.create);

    // Retrieve all Ads
    app.get('/ads', ads.findAll);

    // Retrieve a single Ad with adId
    app.get('/ads/:adId', ads.findOne);

    // Update a Ad with adId
    app.put('/ads/:adId',uploadFile, ads.update);

    // Delete a Ad with adId
    app.delete('/ads/:adId', ads.delete);
}
