var express = require('express'),   
	mongoose = require('mongoose');
	config = require('./server/configure'),
	crypto = require("crypto")    
	app = express(); 


mongoose.connect('mongodb://localhost/timer')

app.set('port', process.env.PORT || 3630); 
app.set('views', __dirname + '/views'); 
app = config(app);
 app.get('/', function(req, res){ 
    res.send('Hello World'); 
	res.render('timer');
 });
var server = app.listen(app.get('port'), function() {   
	console.log('Server up: http://localhost:' + app.get('port')); 
}); 
