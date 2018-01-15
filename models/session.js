var mongoose=require('mongoose');

var sessionSchema= new mongoose.Schema({
	token : { type: String, unique: true, required: true},
});
module.exports= mongoose.model('user',usersSchema);
