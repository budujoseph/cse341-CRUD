
require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;

let database;

const initdb = callback => {
    if(database) {
        console.log('Database is already initialized!');
        return callback(null, database);
    }

    return MongoClient.connect(process.env.MONGO_URL)
        .then(client => {
            database = client;
            callback(null, database);
        })
        .catch(err => {
            callback(err);
        });
}

const getdb = () => {
    if(!database) {
        throw new Error('Database not initialized!');
    }
    return database;
}

module.exports = {
    initdb,
    getdb
};