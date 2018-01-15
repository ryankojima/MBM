var mongoose=require('mongoose');

var userSchema= new mongoose.Schema({
	email : { type: String, unique: true, required: true},
	secret : { type: String, required : true }
});

module.exports= mongoose.model('user',usersSchema);
