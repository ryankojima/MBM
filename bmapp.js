let express= require('express');

let app = express();

//app.set('port', process.env.PORT || 3000);

let config = require("config");

let fs = require('fs');
let https = require('https');

let users=require('./controllers/users');
let login = require('./controllers/login');

let privateKey = fs.readFileSync('certs/private.key');
let certificate = fs.readFileSync( 'certs/server.crt');

bodyParser=require('body-parser');

app.use(bodyParser.json());;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: 'application/json'}));  



let router=express.Router();


app.get('/', (req,res) => {
	console.log('getting a new request');
	res.type('text/plain');
	res.send('Top design is under development.');
});


var mongoose = require('mongoose');
let options = {
	server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
	replset: { socketOptions: { keepAlive: 1, connectTimeoutMS : 30000 } }
};
mongoose.connect(config.get('DB_HOST'), options);
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

app.use('/api/v1',router);



router.route("/login")
	.post(login.authenticate);


router.route("/user")
	.get(users.getUsers)
	.post(users.postUser);

router.use("/user/:id",login.tokenRequired);

router.route("/user/:id")
	.get(users.IdMustBeAuthenticated,users.getUser)
	.delete(users.IdMustBeAuthenticated,users.deleteUser)
	.put(users.IdMustBeAuthenticated,users.updateUser);



https.createServer({
	key: privateKey,
	cert: certificate
}, app).listen(config.get('PORT'));

module.exports = app; // for testing
