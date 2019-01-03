const { promisify } = require('util');
const mongodb = require('mongodb')
var Promise = require('bluebird')
const MongoClient = mongodb.MongoClient;
const Collection = mongodb.Collection;
const {
    HOSTURL,
    DBNAME
} = require('../../config');

let mongoConnection = '';




const openConnection = async () => {
    try {
        mongoConnection = await MongoClient.connect(HOSTURL);
        const mongoDB = mongoConnection.db(DBNAME)
        global.mongoDB = mongoDB;
        return null;
    } catch (err) {
        console.log('error in mongo connection', err);
        throw err;
    }
}
const closeConnection = async () => {
    try {
        return mongoConnection.close(DBNAME)
    } catch (err) {
        throw err;
    }
}




module.exports = {
    closeConnection,
    openConnection
}
