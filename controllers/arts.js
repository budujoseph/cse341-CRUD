const mongodb = require('../db/db_config');
const ObjectId = require('mongodb').ObjectId;

const getAllArts = async (req, res, next) => {
    try {
        const result = await mongodb.getdb().db().collection('arts').find();
        result.toArray().then(arts => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(arts);
        });
    } catch (error) { 
        next(error);
    }


}

const getArtById = async (req, res, next) => {
    try {
            if(!ObjectId.isValid(req.params.id)) {
                res.status(400).json('Invalid art ID.');
                return;
        }
        const artId = new ObjectId(req.params.id);
        const result = await mongodb.getdb().db().collection('arts').findOne({ _id: artId });
        if(!result) {
            res.status(404).json('Art not found.');
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
}

const createArt = async (req, res, next) => {
    try {
        const newArtInfo = {
            title: req.body.title,
            artist: req.body.artist,
            year: req.body.year,
            description: req.body.description,
        }
        const response = await mongodb.getdb().db().collection('arts').insertOne(newArtInfo);
        if(response.acknowledged) {
            res.status(201).json(response);
        } else {
            res.status(500).json({error: 'Failed to create art.'});
        }
    } catch (error) {
        next(error);
    }
}

const updateArtInfo = async (req, res, next) => {
    try {
        if(!ObjectId.isValid(req.params.id)) {
            res.status(400).json({ error: 'Invalid art ID' });
            return;
        }
        const artId = new ObjectId(req.params.id);
        const art = {
            title: req.body.title,
            artist: req.body.artist,
            year: req.body.year,
            description: req.body.description
        };
        const response = await mongodb.getdb().db().collection('arts').replaceOne({ _id: artId }, art);
        if (response.matchedCount === 0) {
            res.status(404).json({error: 'Art not found'});
        }
        if (response.modifiedCount > 0) {
            res.status(204).send();
        }
    } catch (error) {
        next(error);
    }
}

const deleteArt = async (req, res, next) => {
    try {
        if (!ObjectId.isValid(req.params.id)) {
            res.status(400).json({ error: "Invalid Art ID" });
            return;
        }
        const artId = new ObjectId(req.params.id)
        const response = await mongodb.getdb().db().collection('arts').deleteOne({ _id: artId });
        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'An error occured while deleting');
        }
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllArts,
    getArtById,
    createArt,
    updateArtInfo,
    deleteArt
}