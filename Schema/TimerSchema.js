var mongoose = require('mongoose');
var TimerSchema = mongoose.Schema({
	username: String,
	timerName: String,
	timerNum: Number,
	timerHour: {type:Number, default: 0},
	timerMinute: {type:Number, default: 0},
	timerSecond: {type:Number, default: 0},
	doneTime: {type:Number, default:-1},
	state: {type:Number, default:0}
});

module.exports = TimerSchema