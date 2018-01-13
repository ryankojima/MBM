var express= require('express');

var app = express();

app.set('port', process.env.PORT || 3000);

var fs = require('fs');
var https = require('https');

var privateKey = fs.readFileSync('certs/private.key');
var certificate = fs.readFileSync( 'certs/server.crt');
//var ca = fs.readFileSync( 'encryption/intermediate.crt' );


app.get('/',function(req,res){
	console.log('getting a new request');
	res.type('text/plain');
	res.send('Hello SSL World');
});



https.createServer({
	key: privateKey,
	cert: certificate
}, app).listen(app.get('port'));
