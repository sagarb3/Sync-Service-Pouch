var socketPouchServer = require('socket-pouch/server');
var port = 5000;
socketPouchServer.listen(port, {
    remoteUrl: 'http://localhost:3000/db/'
}, function () {
    console.log('\nWebSocket Server Started on port\n',port)
});