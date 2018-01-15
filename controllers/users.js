var Users= require('../models/users');
md5 = require('md5');

function postUser(req,res){
	let users=new Users();
	console.log(req.body);
	
	users.email=req.body.email;
	users.secret=md5(req.body.secret);

	users.save( (err) => {
		let message = "";
		
		if(err){
			console.log(err);

			message=err.errmsg;
			
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
	res.json({ message : "List query is not supported." });
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
			res.json({ message : "No values passed." });
			return;
		}
		let updateRecord=new Object();
		Object.assign(updateRecord,req.body);
		if(updateRecord.secret) updatedRecord.secret=md5(updateRecord.secret);
		
		if(err){
			console.log(err);

			message = err.errmsg;
			
			//res.send(err);
		}else{
			message = "Success.";
		}
		Object.assign(user,updateRecord).save( (err,user) => {
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

function IdMustBeAuthenticated(req,res,next){
	if(req.authInfo._id != req.params.id){
		res.json({ message : "Invalid ID request." });
		return;
	}
	next();
}

module.exports = { postUser,getUser,deleteUser,updateUser,getUsers,IdMustBeAuthenticated };
