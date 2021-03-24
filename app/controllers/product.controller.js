const Product = require('../models/product.model.js');
const ProductPrice = require("../models/productPrice.model")
const mongoose = require('mongoose');

// Create and Save a new Product
exports.create = (req, res) => {
    // Validate request
   

    if(!req.body.titreAr) {
        return res.status(400).send({
            message: "Product titreAr can not be empty"
        });
    }

    if(!req.body.titreFr) {
        return res.status(400).send({
            message: "Product titreFr can not be empty"
        });
    }
    if(!req.body.prix) {
        return res.status(400).send({
            message: "Product Prix can not be empty"
        });
    }
    if(!req.body.categorie) {
        return res.status(400).send({
            message: "Product categorie can not be empty"
        });
    }
   

    if(!req.body.postedBy) {
        return res.status(400).send({
            message: "Product postedBy can not be empty"
        });
    }
 
    // Create a Product
    const product = new Product({
    
        titreAr: req.body.titreAr ,
         titreFr: req.body.titreFr,


        prix:req.body.prix,
        categorie:req.body.categorie,

        
        
        postedBy: req.body.postedBy
    });

    // Save Product in the database
    product.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Product."
        });
    });
};

// Retrieve and return all products from the database.
exports.findAll = (req, res) => {
   
    Product.aggregate([
     
        { $project: { postedBy: 0, createdAt: 0, __v: 0 } }

    ])
    
   
    .then(products => {
      
        products.forEach(element => {
            element.updatedAt = Math.floor(new Date(element.updatedAt).getTime()/1000);
         });

        res.send({status:'200', message: "All the products", products});
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving products."
        });
    });
};

// Find a single product with a productId
exports.findOne = (req, res) => {
    Product.aggregate([
        { $match: { _id: mongoose.Types.ObjectId(req.params.productId) } },
        { $project: { postedBy: 0, createdAt: 0, __v: 0 } }
    ])
    .then(products => {
        if(!products) {
            return res.status(404).send({
                message: "product not found with id " + req.params.productId
            });            
        }
        products[0].updatedAt = Math.floor(new Date(products[0].updatedAt).getTime()/1000);
        res.status(200).json({ status:'200',
            message: "product is found with id " + req.params.productId,products
        });
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "product not found with id " + req.params.productId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving product with id " + req.params.productId
        });
    });
};

// Update a product identified by the productId in the request
exports.update = (req, res) => {

    Product.findOne({_id :  req.params.productId }).then(
        (product) => {
                //console.log(req.body);

                const productprice = new ProductPrice();
                productprice.prix = req.body.prix.prix;
                productprice.save()
                .then((pp) => {
                    
                product.prix.push(pp);
                
                product.save().then(
                    () => {
                            // Find product and update it with the request body
                            Product.findByIdAndUpdate(req.params.productId, {
                            
                            
                                pourcentage: ((product.prix[product.prix.length - 1].prix - product.prix[product.prix.length - 2].prix) /product.prix[product.prix.length - 2].prix) * 100 ,
                            
                                postedBy: req.body.postedBy
                            }, {new: true})
                            .then(product => {
                        
                                if(!product) {
                                    return res.status(404).send({
                                        message: "product not found with id " + req.params.productId
                                    });
                                }
                                
                                res.send(product);
                            }).catch(err => {
                                if(err.kind === 'ObjectId') {
                                    return res.status(404).send({
                                        message: "product not found with id " +req.params.productId
                                    });                
                                }
                                return res.status(500).send({
                                    message: "Error updating product with id " + req.params.productId
                                });
                            });
                    }
                )
            
        })
        }
    )
   
    
    
};


// Delete a product with the specified productId in the request
exports.delete = (req, res) => {
    Product.findByIdAndRemove(req.params.productId)
    .then(product => {
        if(!product) {
            return res.status(404).send({
                message: "product not found with id " + req.params.productId
            });
        }
        res.send({message: "product deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "product not found with id " + req.params.productId
            });                
        }
        return res.status(500).send({
            message: "Could not delete product with id " + req.params.productId
        });
    });
};