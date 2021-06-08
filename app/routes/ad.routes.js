
const { uploadFile } = require('../../config/upload-image.js');
module.exports = (app) => {
    const ads = require('../controllers/ad.controller.js');
    // Create a new Ad
    app.post('/api/ads', uploadFile, ads.create);
    // Retrieve all Ads
    app.get('/api/ads', ads.findAll);
    // Retrieve all Ads
    app.get('/api/ads/web', ads.findAllweb);
    // Retrieve a single Ad with adId
    app.get('/api/ads/:adId', ads.findOne);
    // Update a Ad with adId
    app.post('/api/ads/edit/:adId', uploadFile, ads.update);
    // Delete a Ad with adId
    app.delete('/api/ads/:adId', ads.delete);
    // Delete a Ad with adId
    app.get('/api/masquer/:adId/:masquer', ads.masquer);
}
