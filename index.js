var express = require('express');
var wagner = require('wagner-core');

require('./models')(wagner);

var app = express();
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://korko.cf');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Content-Type');
    next();
});
app.use('/api/v1', require('./api')(wagner));

app.listen(3000);
console.log('Listening on port 3000!'+'\n');
module.exports = app;
