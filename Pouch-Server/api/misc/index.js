const express = require('express');
var PouchDB = require('../pouch');
const cors = require('cors');
const app = express();
app.use(cors());
app.use('/db',require('express-pouchdb')(PouchDB))
module.exports = app;