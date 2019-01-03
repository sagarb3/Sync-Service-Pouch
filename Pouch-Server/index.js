const { initPouch } = require('./services/pouch')
const app = require('./api');
const { openConnection } = require('./services/mongo');
initPouch();
openConnection().then((res) => {
    console.log('connection established', res)
    app.listen(3000, function () {
        console.log('started sync service on port', 3000);
    })
}).catch((err) => {
    console.log('error in establishing connection', err)
})
