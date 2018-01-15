var Users=require('../models/users');
var njwt=require('njwt');
var config=require('config');
var md5=require('md5');

function authenticate(req,res){
	let email=req.body.email;
	let secret=req.body.password;

	
	Users.find({ email : email , secret : md5(secret) }, (err,user) => {
		let message = "";
		let jwt;
		let token;
		
		if(err){
			console.log(err);

			message=err.errmsg;
			
			//res.send(err);
		}else{
			message = "Success.";


			if(user.length == 0){
				message = "Login Failed.";
			}else{
			
				const payload = {
					iss : config.JWT.ISS,
					sub : user[0]
				}
				jwt = njwt.create(payload,config.JWT.SECRET);
				jwt.setExpiration(new Date().getTime() + config.JWT.EXP*1000);
				console.log(jwt);
				token = jwt.compact();
				console.log(token);
			}

		}
		
		res.json({ message : message , token : token , data : user });
	});
}

function tokenRequired(req,res,next){
	let message;
	let token=req.headers['x-access-token'];
	njwt.verify(token,config.JWT.SECRET, (err,vJwt) => {
		if(err){
			message = "Invalid Token.";
			res.json({ message : message });
		}else{
			req.authInfo=vJwt.body.sub;
			console.log(req.authInfo);
			next();
		}
	});
			   
}

module.exports = { authenticate, tokenRequired }
