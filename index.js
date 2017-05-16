var express = require('express');
var wagner = require('wagner-core');
var https = require('https');
var http = require('http');
var fs = require('fs');
require('./models')(wagner);
var options = {
    key: fs.readFileSync('/etc/letsencrypt/live/korko.cf/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/korko.cf/cert.pem'),
    ca: fs.readFileSync('/etc/letsencrypt/live/korko.cf/chain.pem')
};
var app = express();
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Content-Type');
    next();
});
app.use('/api/v1', require('./api')(wagner));
var httpsServer = https.createServer(options, app);
/*app.listen(3000);
console.log('Listening on port 3000!'+'\n');*/
var httpServer = http.createServer(app);
httpServer.listen(3000);
httpsServer.listen(3001);
module.exports = app;