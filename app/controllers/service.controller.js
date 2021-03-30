const Service = require('../models/service.model.js');


exports.findAllfront = (req, res) => {
    Service.find().sort({"updatedAt":-1})
    .then(prod => {
        res.send(prod);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });
};


// Create and Save a new News
exports.create = (req, res) => {
   console.log(req.files);
    //if(req.files[0].originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/))

    // Create  News
    const service = new Service({
        
        titre: req.body.titre , 
        image: req.body.image,
        video: req.body.video,
        postedBy: req.body.postedBy
    });

    // Save Service in the database
    service.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Service."
        });
    });
};

// Retrieve and return all Service from the database.
exports.findAll = (req, res) => {
   
    Service.aggregate([
     
        { $project: { postedBy: 0, createdAt: 0, __v: 0} } ,])
    
    .then(service => {
        service.forEach(element => {
            element.updatedAt = Math.floor(new Date(element.updatedAt).getTime()/1000);
         });
       
        res.send({ status:200, message: "All the services",service});
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving Service."
        });
    });
};


