const Ad = require('../models/ad.model.js');

const mongoose = require('mongoose');

/**
 * Create and Save a new Ad
 * @param {Request} req 
 * @param {Response} res 
 */
exports.create = (req, res) => {
    // Validate request
    if (!req.body.url) {
        return res.status(400).send({
            message: "Ad Url can not be empty"
        });
    }

    // Create a Ad
    const ad = new Ad({
        url: req.body.url,
        externe: req.body.externe,
        image: req.file.filename,
    });

    // Save Ad in the database
    ad.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Ad."
            });
        });
};

/**
 * Retrieve and return all ads from the database.
 * @param {Resquest} req 
 * @param {Response} res 
 */
exports.findAll = (req, res) => {

    Ad.aggregate([
        {
            $project: {
                createdAt: 0,
                __v: 0
            }
        },
    ]).match({ masquer: true }).sort({ "updatedAt": -1 })
        .then(ads => {
            ads.forEach(element => {
                lastDate = Math.floor(new Date(ads[0].updatedAt).getTime() / 1000);
                element.updatedAt = Math.floor(new Date(element.updatedAt).getTime() / 1000);
            });
            res.status(200).json({ status: 200, lastDate, message: "All the ads", ads });
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving ads."
            });
        });
};

/**
 *  Retrieve and return all ads from the database.
 * @param {Request} req 
 * @param {Response} res 
 */
exports.findAllweb = (req, res) => {

    Ad.aggregate([
        {
            $project: {
                createdAt: 0,
                __v: 0
            }
        },
    ]).sort({ "updatedAt": -1 })
        .then(ads => {
            ads.forEach(element => {
                element.updatedAt = Math.floor(new Date(element.updatedAt).getTime() / 1000);
            });
            res.status(200).json({ status: 200, message: "All the ads", ads });
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving ads."
            });
        });
};

/**
 * Find a single ad with a adId
 * @param {Request} req 
 * @param {Response} res 
 */
exports.findOne = (req, res) => {

    Ad.aggregate([
        { $match: { _id: mongoose.Types.ObjectId(req.params.adId) } },
        {
            $project: {
                createdAt: 0,
                __v: 0
            }
        }
    ])
        .then(ad => {
            if (!ad) {
                return res.status(404).send({
                    message: "Ad not found with id " + req.params.adId
                });
            }
            ad[0].updatedAt = Math.floor(new Date(ad[0].updatedAt).getTime() / 1000);
            res.status(200).json({
                status: 200,
                message: "Ad is found with id " + req.params.adId, ad
            });
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Ad not found with id " + req.params.adId
                });
            }
            return res.status(500).send({
                message: "Error retrieving ad with id " + req.params.adId
            });
        });
};

/**
 * Update a ad identified by the adId in the request
 * @param {Request} req 
 * @param {Response} res 
 */
exports.update = async (req, res) => {
    const ad = await Ad.findById(req.params.adId);

    if (req.body.url !== undefined) {
        ad.url = req.body.url;
    }

    if (req.body.masquer !== undefined) {
        ad.masquer = req.body.masquer;
    }

    if (req.file !== undefined) {
        ad.image = req.file.filename;
    }
    // Find ad and update it with the request body
    ad.save()
        .then(ad => {
            if (!ad) {
                return res.status(404).send({
                    message: "Ad not found with id " + req.params.adId
                });
            }
            res.send(ad);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Ad not found with id " + req.params.adId
                });
            }
            return res.status(500).send({
                message: "Error updating ad with id " + req.params.adId
            });
        });
};

/**
 * Update a ad identified by the adId in the request
 * @param {Request} req 
 * @param {Response} res 
 */
exports.masquer = async (req, res) => {
    const ad = await Ad.findById(req.params.adId);
    if (req.params.masquer !== undefined) {
        ad.masquer = req.params.masquer;
    }

    // Find ad and update it with the request body
    ad.save()
        .then(ad => {
            if (!ad) {
                return res.status(404).send({
                    message: "Ad not found with id " + req.params.adId
                });
            }
            res.send(ad);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Ad not found with id " + req.params.adId
                });
            }
            return res.status(500).send({
                message: "Error updating ad with id " + req.params.adId
            });
        });
};

/**
 * Delete a ad with the specified adId in the request
 * @param {Request} req 
 * @param {Response} res 
 */
exports.delete = (req, res) => {
    Ad.findByIdAndRemove(req.params.adId)
        .then(ad => {
            if (!ad) {
                return res.status(404).send({
                    message: "Ad not found with id " + req.params.adId
                });
            }
            res.send({ message: "Ad deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Ad not found with id " + req.params.adId
                });
            }
            return res.status(500).send({
                message: "Could not delete ad with id " + req.params.adId
            });
        });
};