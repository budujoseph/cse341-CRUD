const mongodb = require('../db/db_config');
const ObjectId = require('mongodb').ObjectId;

const getMembers = async (req, res) => {
    {
        const result = await mongodb.getdb().db().collection('members').find();
        result.toArray().then(members => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(members);
        });
    }
}

const getMembersById = async (req, res, next) => {
    try {
        if (!ObjectId.isValid(req.params.id)) {
            res.status(400).json({ error: 'Invalid member ID' });
            return;
        }
        const memberId = new ObjectId(req.params.id);
        const result = await mongodb.getdb().db().collection('members').findOne({ _id: memberId });
        if (!result) {
            res.status(404).json({ error: 'Member not found' });
            return;
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
}

const createMember = async (req, res) => {
    const member = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        dateOfBirth: req.body.dateOfBirth,
        gender: req.body.gender,
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address,
        recordNumber: req.body.recordNumber
    };
    const response = await mongodb.getdb().db().collection('members').insertOne(member);
    if (response.acknowledged) {
        res.status(201).json(response);
    } else {
        res.status(500).json({ error: 'Failed to create member' });
    }
   }

const updateMemberInfo = async (req, res, next) => {
    try {
        if(!ObjectId.isValid(req.params.id)) {
            res.status(400).json({ error: 'Invalid member ID' });
            return;
        }
        const memberId = new ObjectId(req.params.id);
        const member = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            dateOfBirth: req.body.dateOfBirth,
            gender: req.body.gender,
            email: req.body.email,
            phone: req.body.phone,
            address: req.body.address,
            recordNumber: req.body.recordNumber
        };
        const response = await mongodb.getdb().db().collection('members').replaceOne({ _id: memberId }, member);
        if (response.matchedCount === 0) {
        res.status(400).json({error: 'Member does not exist'})
    }
    if (response.modifiedCount > 0) {
        res.status(204).send()
    }
    } catch (error) {
        next(error)
    }
}

const deleteMember = async (req, res, next) => {
    try {
        if (!ObjectId.isValid(req.params.id)) {
            res.status(400).json({ error: "Invalid Member ID" });
            return;
        }
        const memberId = new ObjectId(req.params.id)
        const response = await mongodb.getdb().db().collection('members').deleteOne({ _id: memberId });
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
    getMembers,
    getMembersById,
    createMember,
    getMembersById,
    updateMemberInfo,
    deleteMember
};