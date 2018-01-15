var Users= require('../models/users');

function postUser(req,res){
	let users=new Users();//req.body);
	console.log(req.body);
	
	users.email=req.body.email;
	users.secret=req.body.secret;

	users.save( (err) => {
		let message = "";
		
		if(err){
			console.log(err);

			message=err.errmsg;
			
			//res.send(err);
		}else{
			message = "Record added succesfully.";
		}
		
		res.json({ message : message , data: users });
	});

};

function getUser(req,res){
	Users.find({ _id : req.params.id }, (err,user) => {
		let message = "";
		
		if(err){
			console.log(err);

			message=err.errmsg;
			
			//res.send(err);
		}else{
			message = "Success.";
		}
		
		res.json({ message : message , data: user });
	});
}
function getUsers(req,res){
	if(req.query.email){
		return getUserByEmail(req.query.email,req.query.password,res);
	}

	res.json({ message : "list query is not supported." });
}
function getUserByEmail(email,secret,res){
	Users.find({ email : email , secret : secret }, (err,user) => {
		let message = "";
		
		if(err){
			console.log(err);

			message=err.errmsg;
			
			//res.send(err);
		}else{
			message = "Success.";
		}
		
		res.json({ message : message , data: user });
	});
}

function deleteUser(req,res){
	Users.remove( { _id: req.params.id }, (err) => {
		let message = "";

		if(err){
			console.log(err);

			message = err.errmsg;
			
			//res.send(err);
		}else{
			message = "Success.";
		}

		res.json({ message : message });
	});
}
function updateUser(req,res){
	Users.findById( req.params.id, (err,user) => {
		let message = "";

		console.log(typeof(req.body));
		if(Object.keys(req.body).length == 0){			
			res.json({ message : "No values passed" });
			return;
		}
		
		if(err){
			console.log(err);

			message = err.errmsg;
			
			//res.send(err);
		}else{
			message = "Success.";
		}
		Object.assign(user,req.body).save( (err,user) => {
			if(err){
				console.log(err);
				message = err.errmsg;
			}else{
				message = "Updated.";
			}
			res.json({ message : message });
		});

		
	});
}


module.exports = { postUser,getUser,deleteUser,updateUser,getUserByEmail,getUsers };
