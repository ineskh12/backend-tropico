module.exports = (app) => {
    const product = require('../controllers/product.controller.js');
    // Create a new product
    app.post('/api/product', product.create);
    // Retrieve all product with populate
    app.get('/api/product/all', product.findAllIOS);
    // Retrieve all product
    app.get('/api/product', product.findAll);
    // Retrieve all product(elfalah )
    app.get('/api/productFalah', product.findAllFalah);
    // Retrieve all product(non elfaleh)
    app.get('/api/productNonFalah', product.findAllNonFalah);
    // Retrieve a single product with productId
    app.get('/api/product/:productId', product.findOne);
    // Update a product with productId
    app.put('/api/product/update/:productId', product.update);
    // Delete a product with productId
    app.delete('/api/product/:productId', product.delete);
}
