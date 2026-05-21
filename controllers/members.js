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

module.exports = {
    getMembers
};