var PouchDB = require('pouchdb');
var upsertBulk= require('pouchdb-upsert-bulk')
PouchDB.plugin(upsertBulk)
var TempPouchDB = PouchDB.defaults({prefix: 'db/'});
module.exports = TempPouchDB;




