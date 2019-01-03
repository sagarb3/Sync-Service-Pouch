const { MASTERS_ARR } = require('../../config');
const syncSingleCollection = async (params) => {
    try {
        const { collectionName } = params;
        let pouchMap = {};
        global.PouchDB.forEach((e) => {
            for (let key in e) {
                pouchMap[key] = e[key];
            }
        })
        const pouch = pouchMap[collectionName]
        let mongoDocs = await global.mongoDB.collection(collectionName).find({}).toArray();
        if (!mongoDocs.length) {
            throw 'No Record Found'
        }
        let idList = [];
        mongoDocs = mongoDocs.map((e) => {
            if (typeof e._id == 'object') {
                e._id = e._id.toHexString();
            } else {
                e._id = e._id
            }
            idList.push(e._id);
            return e;
        })
        const { rows: pouchDocs } = await pouch.allDocs({
            include_docs: true,
            attachments: true
        });
        let deletedDoc = [];
        let delCount = 0;
        if (pouchDocs.length > 0) {
            deletedDoc = await Promise.all(pouchDocs.map(async (e) => {
                let { doc } = e;
                if (!idList.includes(doc._id)) {
                    let document = await pouch.get(doc._id);
                    let deleteRecord = await pouch.remove(document);
                    delCount++;
                    return deleteRecord;
                } else {
                    return null;
                }
            }))
        }
        const bulkInsertCollection = await pouch.upsertBulk([...mongoDocs])
        return { save: bulkInsertCollection.length, delete: delCount };
    } catch (err) {
        throw err;
    }
}

const seedSingleCollection = async (params) => {
    try {
        const { collectionName } = params;
        let pouchMap = {};
        global.PouchDB.forEach((e) => {
            for (let key in e) {
                pouchMap[key] = e[key];
            }
        })
        const pouch = pouchMap[collectionName]
        let mongoDocs = await global.mongoDB.collection(collectionName).find({}).toArray();
        if (!mongoDocs.length) {
            throw 'No Record Found'
        }
        mongoDocs = mongoDocs.map((e) => {
            if (typeof e._id == 'object') {
                e._id = e._id.toHexString();
            } else {
                e._id = e._id
            }
            return e;
        })

        const bulkInsertCollection = await pouch.upsertBulk([...mongoDocs])
        return { save: bulkInsertCollection.length };
    } catch (err) {
        throw err;
    }
}

const syncAllCollection = async (params) => {
    try {
        const arr = await Promise.all(MASTERS_ARR.map(async (e) => {
            return syncSingleCollection({
                collectionName: e
            })
        }))
        console.log('arr of response', arr);
        return arr;
    } catch (err) {
        throw err;
    }
}

const getSingleCollection = async (params) => {
    try {
        let { collectionName, options } = params;
        let pouchMap = {};
        global.PouchDB.forEach((e) => {
            for (let key in e) {
                pouchMap[key] = e[key];
            }
        })
        const pouch = pouchMap[collectionName]
        options = Object.assign({
            include_docs: true,
            attachments: true
        }, options)
        return await pouch.allDocs(options)
    } catch (err) {
        console.log('error in fetching single collection', err);
        throw err;
    }

}

const getAllCollection = async (params) => {
    try {
        const arr = await Promise.all(MASTERS_ARR.map(async (e) => {
            return getSingleCollection({
                collectionName: e
            })
        }))
        return arr;
    } catch (err) {
        throw err;
    }
}

const deleteCollection = async (params) => {
    try {

    } catch (err) {

    }
}

const deleteRecord = async (params) => {
    try {

    } catch (err) {

    }
}

const updateRecord = async (params) => {
    try {

    } catch (err) {

    }
}

module.exports = {
    syncSingle: syncSingleCollection,
    syncAll: syncAllCollection,
    getAll: getAllCollection,
    getSingle: getSingleCollection,
    seedSingle: seedSingleCollection
}