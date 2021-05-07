const Product = require('../models/product.model.js');
const ProductPrice = require("../models/productPrice.model")
const Ad = require('../models/ad.model.js');
const mongoose = require('mongoose');

// Create and Save a new Product
exports.create = (req, res) => {
    // Validate request
    console.log(req.body);

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
   

    
 
    // Create a Product
    const product = new Product({
    
        titreAr: req.body.titreAr ,
         titreFr: req.body.titreFr,


        prix:req.body.prix,
        categorie:req.body.categorie,

        
        
       // postedBy: req.body.postedBy
    });

    // Save Product in the database
    product.save()
    .then(data => {
        console.log(data)
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Product."
        });
    });
};
//roud function
function round(num,places){
    num= parseFloat(num);
    places=(places ? parseInt(places,10):0)
    if(places > 0){
        let  length =places;
        places="1"
        for (let i =0;i< length;i++){
            places+="0";
            places= parseInt(places,10);

        }
    } else{
        places=1
    }
    return Math.round((num+Number.EPSILON)*(1*places))/(1*places)
}


exports.findAllIOS = (req, res) => {
  
   
    Product.aggregate([
        // {$sort:{prix:{"prix":1}}},
      
         { $project: { createdAt: 0, __v: 0 ,prix:{createdAt: 0,__v: 0, _id:0}} }
 
     ]).sort({"updatedAt":-1})
    
    .then(products => {

       Ad.aggregate([
     
            { $project: {  createdAt: 0, __v: 0,lastUpdate:0} } ,
          ]).match({ masquer:true } ).sort({"updatedAt":-1}).then((ad) => {

            ad.forEach(element => {
                element.updatedAt = Math.floor(new Date(element.updatedAt).getTime()/1000);
             });

            lastDate=Math.floor(new Date(products[0].updatedAt).getTime()/1000); 
        products.forEach(element => {
         
          element.pourcentage=round(element.pourcentage,2)
           element.updatedAt = Math.floor(new Date(element.updatedAt).getTime()/1000);
           
           //element.lastUpdate = Math.floor(new Date(element.lastUpdate).getTime()/1000);
          
           let arrPrix = element.prix
            arrPrix.forEach(element=>{
                element.updatedAt = Math.floor(new Date(element.updatedAt).getTime()/1000);
                
                
            })
            
        
         });

            res.send({status:200,lastDate, message: "All the products & Ads", products , ad});
          }).catch((err) => {
            return res.status(500).send({
                message: err.message || "Some error occurred while retrieving ads."
            });
          })
      
        
        
          

        
    }).catch(err => {
        return res.status(500).send({
            message: err.message || "Some error occurred while retrieving products."
        });
    });

   
};





// Retrieve and return all products from the database.
exports.findAll = (req, res) => {
   
    Product.aggregate([
       // {$sort:{prix:{"prix":1}}},
     
        { $project: { createdAt: 0, __v: 0 ,prix:{createdAt: 0,__v: 0, _id:0}} }

    ]).sort({"updatedAt":-1})
    .then(products => {
        
        lastDate=Math.floor(new Date(products[0].updatedAt).getTime()/1000); 
        products.forEach(element => {
         
          element.pourcentage=round(element.pourcentage,2)
           element.updatedAt = Math.floor(new Date(element.updatedAt).getTime()/1000);
           
           
           //element.lastUpdate = Math.floor(new Date(element.lastUpdate).getTime()/1000);
          
           let arrPrix = element.prix
            arrPrix.forEach(element=>{
              
                element.updatedAt = Math.floor(new Date(element.updatedAt).getTime()/1000);
                
                
            })
            
        
         });

        res.send({status:200,lastDate, message: "All the products", products});
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
        { $project: { createdAt: 0, __v: 0 } }
    ])
    .then(products => {
        if(!products) {
            return res.status(404).send({
                message: "product not found with id " + req.params.productId
            });            
        }
        products[0].lastUpdate=Math.floor(new Date(products[0].lastUpdate).getTime()/1000);
        products[0].updatedAt = Math.floor(new Date(products[0].updatedAt).getTime()/1000);
        products[0].pourcentage=round(products[0].pourcentage,2)
        let arrPrix =  products[0].prix
            arrPrix.forEach(element=>{
                element.updatedAt = Math.floor(new Date(element.updatedAt).getTime()/1000);
                element.createdAt = Math.floor(new Date(element.createdAt).getTime()/1000);
                
            })
            
       // console.log(products[0].pourcentage)
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
    console.log(req.body);
    Product.findOne({ _id: req.params.productId }).then(
        (product) => {
            //initiate date server
            const dateObj = new Date();

            //Date server
            const month = dateObj.getMonth();
            const day = String(dateObj.getDate()).padStart(2, '0');
            const year = dateObj.getFullYear();
            const output = year + '-' + month + '-' + day;

            //Date prix in DB
            const dayDB = String(product.prix[product.prix.length - 1].createdAt.getDate()).padStart(2, '0');
            const monthDB = product.prix[product.prix.length - 1].createdAt.getMonth();
            const yearDB = product.prix[product.prix.length - 1].createdAt.getFullYear();
            const outputDB = yearDB + '-' + monthDB + '-' + dayDB;
            console.log()

            //condition to compare date server and date prix in DB
            if (output !== outputDB) {
                const productprice = new ProductPrice();
                productprice.prix = req.body.prix.prixMoy;
                productprice.prix = req.body.prix.prixMin;
                productprice.prix = req.body.prix.prixMax;
                console.log( productprice)
                productprice.save()
                    .then((pp) => {

                        product.prix.push(pp);

                        product.save().then(
                            () => {
                                // Find product and update it with the request body
                                Product.findByIdAndUpdate(req.params.productId, {

                                    lastUpdate: product.updatedAt,
                                    pourcentage: ((product.prix[product.prix.length - 1].prixMoy - product.prix[product.prix.length - 2].prixMoy / product.prix[product.prix.length - 2].prixMoy) * 100),

                                   // postedBy: req.body.postedBy
                                }, { new: true })
                                    .then(product => {

                                        if (!product) {
                                            return res.status(404).send({
                                                message: "product not found with id " + req.params.productId
                                            });
                                        }

                                        res.send(product);
                                    }).catch(err => {
                                        if (err.kind === 'ObjectId') {
                                            return res.status(404).send({
                                                message: "product not found with id " + req.params.productId
                                            });
                                        }
                                        return res.status(500).send({
                                            message: "Error updating product with id " + req.params.productId
                                        });
                                    });
                            }
                        )

                    })
            } else {
                return res.status(404).send({
                    message: "product can't update price today ! "
                });
            }
        }
    )



};




exports.editprix = (req, res) => {
   

 // Find produit and update it with the request body
    Product.findByIdAndUpdate(req.params.productId, {
        prix:req.body.prix,
        
    }, {new: true})
    .then(product => {
        if(!product) {
            return res.status(404).send({
                message: "Product not found with id " + req.params.productId
            });
        }
        res.send(product);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Product not found with id " +req.params.productId
            });                
        }
        return res.status(500).send({
            message: "Error updating user with id " + req.params.productId
        });
    });
};
// Delete a product with the specified productId in the request
exports.delete = (req, res) => {

    Product.findByIdAndRemove(req.params.productId)
  //Product.findByIdAndRemove(req.params.productId)
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


  

 