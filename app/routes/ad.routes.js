
const { uploadFile } = require('../../config/upload-image.js');
module.exports = (app) => {
    const ads = require('../controllers/ad.controller.js');
    // Create a new Ad
    app.post('/ads', uploadFile, ads.create);
    // Retrieve all Ads
    app.get('/ads', ads.findAll);
    // Retrieve all Ads
    app.get('/ads/web', ads.findAllweb);
    // Retrieve a single Ad with adId
    app.get('/ads/:adId', ads.findOne);
    // Update a Ad with adId
    app.post('/ads/edit/:adId', uploadFile, ads.update);
    // Delete a Ad with adId
    app.delete('/ads/:adId', ads.delete);
    // Delete a Ad with adId
    app.get('/masquer/:adId/:masquer', ads.masquer);
}
