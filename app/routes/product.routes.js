module.exports = (app) => {
    const product = require('../controllers/product.controller.js');

    // Create a new product
    app.post('/product', product.create);
    // Retrieve all product with populate
    app.get('/productwitpopulate', product.findAll);


    // Retrieve all product
    app.get('/product', product.findAll);

    // Retrieve a single product with productId
    app.get('/product/:productId', product.findOne);

    // Update a product with productId
    app.put('/product/:productId', product.update);

    // Delete a product with productId
    app.delete('/product/:productId', product.delete);
}
