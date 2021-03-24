const bodyParser = require('body-parser');
const User = require('../models/user.model.js');


// Create and Save a new User
exports.create = (req, res) => {
    // Validate request
    if(!req.body.email) {
        return res.status(400).send({
            message: "User Email can not be empty"
        });
    }

    if(!req.body.motdepasse) {
        return res.status(400).send({
            message: "User Password can not be empty"
        });
    }

    if(!req.body.role) {
        return res.status(400).send({
            message: "User Role can not be empty"
        });
    }

    // Create a User
    const user = new User({
        email:req.body.email,
        motdepasse: req.body.motdepasse || "Untitled User", 
        role: req.body.role
    });

    // Save User in the database
    user.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the User."
        });
    });
};

// Retrieve and return all Users from the database.
exports.findAll = (req, res) => {
    User.find()
    .then(users => {
       
        res.send({ status:'200', message: "All the users",users});
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving users."
        });
    });
};

// Find a single user with a userId
exports.findOne = (req, res) => {
    User.findById(req.params.userId)
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });            
        }
        res.send({
            message: "User is found with id " + req.params.userId,user
        });
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving user with id " + req.params.userId
        });
    });
};

// Update a user identified by the userId in the request
exports.update = (req, res) => {
    // Validate request
    if(!req.body.email) {
        return res.status(400).send({
            message: "User Email can not be empty"
        });
    }

    if(!req.body.motdepasse) {
        return res.status(400).send({
            message: "User Password can not be empty"
        });
    }

    if(!req.body.role) {
        return res.status(400).send({
            message: "User Role can not be empty"
        });
    }

   


    // Find user and update it with the request body
    User.findByIdAndUpdate(req.params.userId, {
        email:req.body.email,
        motdepasse: req.body.motdepasse || "Untitled User", 
        role: req.body.role
    }, {new: true})
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });
        }
        res.send(user);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "User not found with id " +req.params.userId
            });                
        }
        return res.status(500).send({
            message: "Error updating user with id " + req.params.userId
        });
    });
};


// Delete a user with the specified userId in the request
exports.delete = (req, res) => {
    User.findByIdAndRemove(req.params.userId)
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });
        }
        res.send({message: "User deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });                
        }
        return res.status(500).send({
            message: "Could not delete user with id " + req.params.userId
        });
    });
};

exports.login = (req, res) => {
    User.find({ email : req.body.email })
    .then(
        user => {
            if(user[0]){
                if(req.body.motdepasse === user[0].motdepasse){
                    //delete user[0]['motdepasse'];
                    console.log(user[0]);
                   
                    return res.status(200).json({user});
                    
                }
            }
            return res.status(404).json({message : 'user doesn\'t exist'});
        }
    ).catch(
        err => {return res.status(500).json({ message: 'error server system'})}
    )
}