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
    // Validate request
   

    if(!req.body.titre) {
        return res.status(400).send({
            message: "News titre can not be empty"
        });
    }

    if(!req.body.image) {
        return res.status(400).send({
            message: "News Image can not be empty"
        });
    }

   


    if(!req.body.postedBy) {
        return res.status(400).send({
            message: "News postedBy can not be empty"
        });
    }

    // Create  News
    const word = new News({
        
        titre: req.body.titre , 
        image: req.body.image,   url: req.body.url,   externe: req.body.externe,
        description:req.body.description,categorie:req.body.categorie,
        postedBy: req.body.postedBy
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
      
         { $project: {postedBy: 0, createdAt: 0, __v: 0 ,prix:{createdAt: 0,__v: 0, _id:0},categorie:{createdAt: 0,updatedAt:0,__v: 0, _id:0,}} }
 
     ]).sort({"lastUpdate":-1})
    
    
    .then(news => {
         
        lastDate=Math.floor(new Date(news[0].lastUpdate).getTime()/1000); 
        news.forEach(element => {
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
        { $project: { postedBy: 0,lastUpdate:0, createdAt: 0, __v: 0 } }
    ])
    .then(news => {
       if(!news) {
            return res.status(404).send({
                message: "News not found with id " + req.params.newsId
            });            
        }

        //element.updatedAt = Math.floor(new Date(element.updatedAt).getTime()/1000);
      news[0].updatedAt =Math.floor(new Date(news[0].updatedAt ).getTime()/1000);
console.log(news[0].updatedAt)

                
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

// Update a newsId identified by the newsId in the request
exports.update = (req, res) => {
    // Validate request
   
    if(!req.body.titre) {
        return res.status(400).send({
            message: "News titre can not be empty"
        });
    }

    if(!req.body.image) {
        return res.status(400).send({
            message: "News Image can not be empty"
        });
    }

    if(!req.body.description) {
        return res.status(400).send({
            message: "News Description can not be empty"
        });
    }


    if(!req.body.postedBy) {
        return res.status(400).send({
            message: "News postedBy can not be empty"
        });
    }

    // Find News and update it with the request body
    News.findByIdAndUpdate(req.params.newsId, {
       
        titre: req.body.titre , 
        image: req.body.image,   url: req.body.url,   externe: req.body.externe,
        description:req.body.url,categorie:req.body.categorie,
        postedBy: req.body.postedBy
    }, {new: true})
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