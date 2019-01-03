const {
    MASTERS_ARR,
    DBNAME
} = require('../../config');

//relative to the root folder the collection in json format of mongodb
const folderName = 'masters'

const util = require('util')
const exec = util.promisify(require('child_process').exec);

const importCollection = async () => {
    try {
        let cliArr = [];
        for (let table of MASTERS_ARR) {
            cliArr.push(await exec(`mongoimport --db ${DBNAME} --collection ${table} --file ${folderName}/${table}.json --jsonArray`))
        }
        let result = await Promise.all(cliArr);
        let tableCreate = await createTaskDb();
        console.log('tableCreate', tableCreate);
        return result;
    } catch (err) {
        console.log(err);
        return err;
    }
}

const createTaskDb = async () => {
    const arr = MASTERS_ARR.map((e) => {
        let obj = {}
        obj['tableName'] = e;
        obj['seed'] = true;
        obj['periodic'] = false;
        obj['enableSync'] = false;
        return obj;
    })
    const result = await global.mongoDB.collection('task_db').insertMany(arr);
    return result;
}

module.exports = {
    seedMongo: importCollection
}

