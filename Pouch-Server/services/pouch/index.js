var PouchDB = require('../../api/pouch');
const {
    MASTERS_ARR
} = require('../../config')
const initPouch = () => {
    try {
        if (!Array.isArray(global.PouchDB) || (global.PouchDB.length != MASTERS_ARR.length)) {
            global.PouchDB = MASTERS_ARR.map((e) => {
                let obj = {};
                obj[e] = new PouchDB(e);
                return obj;
            })
        }
    } catch (err) {
        console.log('error in creating pouch collection', err);
        throw err;
    }
}
module.exports = {
    initPouch
}