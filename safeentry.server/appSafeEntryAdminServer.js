var express = require('express');
var app = express();
var server = require('http').Server(app);
var path = require('path');

app.use('/site.admin', express.static(__dirname + '/avalon'));

app.use('/api/hola', function(req, res) {
    res.status(200).send('Hola mundo API avalon');
});

app.get('*', function(req, res, next) {
    res.sendFile(path.resolve('avalon/index.html'))
});

server.listen(5005, () => {
    console.log('Servidor funcionando en http://localhost:5005');
});
