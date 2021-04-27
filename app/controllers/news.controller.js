const News = require('../models/news.model.js');
const mongoose = require('mongoose');



exports.findAllfront = (req, res) => {
    News.find().sort({"updatedAt":-1})
    .then(news => {
        res.send(news);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });
};
// Create and Save a new News
exports.create = (req, res) => {
    

    // Create  News
    const word = new News({
        
        titre: req.body.titre , 
        image: req.file.filename,   url: req.body.url,   externe: req.body.externe,
        description:req.body.description,categorie:req.body.categorie,
       // postedBy: req.body.postedBy
    });

    // Save News in the database
    word.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the News."
        });
    });
};

// Retrieve and return all news from the database.
exports.findAll = (req, res) => {
    News.aggregate([
        // {$sort:{prix:{"prix":1}}},
      
         { $project: { __v: 0 } }
 
     ]).sort({"updatedAt":-1})
    
    
    .then(news => {
         
        lastDate=Math.floor(new Date(news[0].lastUpdate).getTime()/1000); 
        news.forEach(element => {
            element.createdAt = Math.floor(new Date(element.createdAt).getTime()/1000);
            element.updatedAt = Math.floor(new Date(element.updatedAt).getTime()/1000);
         });
       
        res.send({ status:200,lastDate, message: "All the news",news});
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving news."
        });
    });
};

// Find a single news with a newsId
exports.findOne = (req, res) => {
   
    News.aggregate([
        { $match: { _id: mongoose.Types.ObjectId(req.params.newsId) } },
        { $project: { lastUpdate:0, __v: 0 } }
    ])
    .then(news => {
       if(!news) {
            return res.status(404).send({
                message: "News not found with id " + req.params.newsId
            });            
        }

        //element.updatedAt = Math.floor(new Date(element.updatedAt).getTime()/1000);
        news[0].createdAt =Math.floor(new Date(news[0].createdAt ).getTime()/1000);
      news[0].updatedAt =Math.floor(new Date(news[0].updatedAt ).getTime()/1000);


                
        res.send({ status:200,
            message: "News is found with id " + req.params.newsId,news
        });
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "News not found with id " + req.params.newsId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving News with id " + req.params.newsId
        });
    });
};


exports.update = async (req, res) => {
    const word = await News.findById(req.params.adId);
 
    if (req.body.categorie !== undefined) {
        word.categorie = req.body.categorie;
     }
     if (req.body.description !== undefined) {
        word.description = req.body.description;
     }
     if (req.body.externe !== undefined) {
        word.externe = req.body.externe;
     }
    if (req.body.titre !== undefined) {
        word.titre = req.body.titre;
     }
    if (req.body.url !== undefined) {
        word.url = req.body.url;
     }
 
     if (req.body.masquer !== undefined) {
        word.masquer = req.body.masquer;
     }
 
     if (req.file !== undefined) {
        word.image = req.file.filename;
     }
     // Find ad and update it with the request body
     word.save()
    .then(word => {
        if(!word) {
            return res.status(404).send({
                message: "News not found with id " + req.params.newsId
            });
        }
        res.send(word);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "News not found with id " +req.params.newsId
            });                
        }
        return res.status(500).send({
            message: "Error updating News with id " + req.params.newsId
        });
    });
};


// Delete a News with the specified newsId in the request
exports.delete = (req, res) => {
    News.findByIdAndRemove(req.params.newsId)
    .then(word => {
        if(!word) {
            return res.status(404).send({
                message: "News not found with id " + req.params.newsId
            });
        }
        res.send({message: "News deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "News not found with id " + req.params.newsId
            });                
        }
        return res.status(500).send({
            message: "Could not delete news with id " + req.params.newsId
        });
    });
};