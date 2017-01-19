var mongoose = require('mongoose')
var UserSchema  = mongoose.Schema({
	username: String,
	password: String, 
	email: String,
	lastAccess: {type:Date,default: Date.now},
	visits: {type: Number, default:0},
	admin: {type: Boolean, default: false},
});
UserSchema.methods.checkPwd = function(username,pwd,next){

}
UserSchema.findUser = function(username,next) {

}
UserSchema.pre('save',function(next){
	if(this.isNew) {

	}else{

	}
	next()
})

UserSchema.statics = {
	fecth: function(cb) {
		return this.find({}).sort('username')
		exec(cb)
	},
	findByUsername: function(id, cb) {
		return this.findOne({username: username});
		exec(cb);
	}
}

module.exports = UserSchema