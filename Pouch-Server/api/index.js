const app = require('./misc')
const {
    syncSingle,
    syncAll,
    getAll,
    getSingle
} = require('../services/mongoOperations')
const {
    enableCron,
    seedTasks
} = require('../services/cronTask')
const {
    seedMongo
} = require('../services/syncJsonCollections')


app.get('/createMongoTbl', function (req, res) {
    seedMongo().then((data) => {
        res.send({ res: data })
    }).catch((err) => {
        console.log('error trace', err);
        res.send({ err: err.message })
    })
})


app.get('/seed', function (req, res) {
    seedTasks().then((data) => {
        res.send({ res: data })
    }).catch((err) => {
        console.log('error trace', err);
        res.send({ err: err.message })
    })
})

app.get('/syncAll', function (req, res) {
    syncAll().then((data) => {
        res.send({ res: data })
    }).catch((err) => {
        console.log('error trace', err);
        res.send({ err: err.message })
    })
})

app.get('/getAll', function (req, res) {
    getAll().then((data) => {
        res.send({ res: data })
    }).catch((err) => {
        console.log('error trace', err);
        res.send({ err: err.message })
    })
})

app.get('/enableAuto', function (req, res) {
    let en = enableCron();
    res.send({ res: 'enabled cron tasks' })
})

app.get('/list', function (req, res) {
    console.log(req.query);
    getSingle({ collectionName: req.query.collection }).then((data) => {
        res.send({ res: data })
    }).catch((err) => {
        res.send({ err: err.message })
    })
})
app.get('/findOne', function (req, res) {

})
app.post('/update', function (req, res) {

})
app.post('/insert', function (req, res) {

})
app.post('/delete', function (req, res) {

})

module.exports = app;

