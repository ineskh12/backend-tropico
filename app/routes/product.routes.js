module.exports = (app) => {
    const product = require('../controllers/product.controller.js');

    // Create a new product
    app.post('/product', product.create);
    // Retrieve all product with populate
    app.get('/product/all', product.findAllfront);


    // Retrieve all product
    app.get('/product', product.findAll);

    // Retrieve a single product with productId
    app.get('/product/:productId', product.findOne);

    app.get('/product/web/:productId', product.findOneWeb);


    // Update a product with productId
    app.put('/product/edit/:productId', product.update);

    // Delete a product with productId
    app.delete('/product/:productId', product.delete);
}
