module.exports = (app) => {
    const product = require('../controllers/product.controller.js');
  


    // Create a new product
    app.post('/product', product.create);
    // Retrieve all product with populate
    app.get('/product/all', product.findAllIOS);


    // Retrieve all product
    app.get('/product', product.findAll);

    // paginiation  
   
    // Retrieve a single product with productId
    app.get('/product/:productId', product.findOne);



    // Update a product with productId
    app.put('/product/edit/:productId', product.update);

    // Delete a product with productId
    app.delete('/product/:productId', product.delete);
}
