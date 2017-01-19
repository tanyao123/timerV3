var User = require('../models/user')
var Timer = require('../models/timer')
var crypto = require("crypto")
module.exports = {  

	
	index: function(req, res) { 
		//res.send("sssss");
		res.render('main');
	},    
	about: function(req, res) {      
		res.render('about');
   },
   loginForm: function(req, res) {      
		res.render('loginform');
   },
    logout: function(req, res) { 
      console.log(req.query.id);
      var id = req.query.id;
      User.find({username: id},function(err, user){
         console.log(user);
         User.update({username: id}, {visits:0}, function(err){  //decrease the visits number to insure that user can normally login
            if(err) return;
         })
      })
		res.render('main');
   },
    loginFormSubmit: function(req, res) {
    	var md5 = crypto.createHash('md5');			//hashed the password
		var username = req.body.username;
   		var password = req.body.password;
   		md5.update(password);
   		var passwordHashed = md5.digest('hex');		//hased the password and use it to compare with the record in the database
   		User.find({username: username},function(err, user){
   			if(err){
   				console.log("Your username is wrong!");
   			}else if(user != [] && user[0] != undefined){
               console.log(user);
               if(user[0].visits < 1 && user[0].password == passwordHashed){
                  console.log(user);
                  var loginid={loginid:username};
                  var visits = user[0].visits + 1;
                  User.update({username: username}, {visits:visits, lastAccess: Date()}, function(err){
                     if(err) return;
                  })
                  User.find({username: username}, function(err, user){
                     var lastTime = user[0].lastAccess;
                     Timer.find({username: username}, function(err, user){
                        var timerName = {}
                        timerName.one = user[0].timerName;
                        timerName.two = user[1].timerName;
                        timerName.three = user[2].timerName;
                        var all = {loginid: loginid, lastTime: lastTime, timerName: timerName}
                        res.render('timer',all);
                     })
                  })
               }else{
                  res.render('loginform');
               }
            }else{
   				console.log(user);
   				res.render('loginform');
   			}
   		})
   },
   register: function (req, res) {
   		res.render('register');
   },
   registerUser: function(req, res){
   		var md5 = crypto.createHash('md5');
   		var username = req.body.username;
   		var password = req.body.password;
         var email = req.body.email;
   		md5.update(password);	
   		var passwordHashed = md5.digest('hex');		//hash the password and store it into the database
   		var user = new User({
   			username: username,
   			password: passwordHashed,
            email: email
   		})
   		user.save(function(err, user){
   			if (err) {
   				console.error(err);
   				return;
   			}else{
   				console.log(user);
   				res.redirect('/loginform')
   			}
   		})
         for(var i=0;i<3;i++){
            var timer = new Timer({
               username: username,
               timerName: username,
               timerNum: i
            })
            timer.save(function(err, timer){
               if(err){
                  return;
               }
            })
         }
   },
   hanleState: function(req, res){    //These code are used to update the state in database
      var state = req.body.state;
      var timerNum = req.body.timerNum;
      var username = req.body.username;
      var doneTime = req.body.doneTime || -1;
      var timerNumber = req.body.timerNumber || 0;
      Timer.update({username: username, timerNum: timerNum}, {state: state, doneTime: doneTime, timerNumber: timerNumber}, function(err){
         if(err) return;
      })
      res.send(state);
   },

   updateNumber: function(req, res){
      var timerNum = req.body.timerNum;
      var username = req.body.username;
      var hour = req.body.timerHour;
      var minute = req.body.timerMinute;
      var second = req.body.timerSecond;
      Timer.update({username: username, timerNum: timerNum}, {timerHour: hour, timerSecond: second, timerMinute: minute}, function(err){
         if(err) return;
      })
      Timer.find({username: username, timerNum: timerNum}, function(err, timer){
         console.log(timer[0].timerSecond);
      })
   },

   getState: function(req, res){
      var username = req.body.username;
      Timer.find({username: username}, function(err, timer){
         var timerState = [];
         var timerHour = [];
         var timerMinute = [];
         var timerSecond = [];
         for(var i = 0; i < timer.length; i ++){
            timerState.push(timer[i].state);
            timerHour.push(timer[i].timerHour);
            timerMinute.push(timer[i].timerMinute);
            timerSecond.push(timer[i].timerSecond);
         }
         var data = {timerState: timerState, timerHour: timerHour, timerMinute: timerMinute, timerSecond: timerSecond};
         res.send(data);
      })
   },

   getTimer: function(req, res){
      var username = req.params.username;
      var timernum = req.params.timernum;
      console.log(username);
      Timer.find({username: username, timerNum: timernum}, function(err, timer){
         console.log(timer);
         if(timer != undefined){
            var data = {
               username: timer[0].username,
               timerName: timer[0].timerName,
               timerNum: timer[0].timerNum,
               timerHour: timer[0].timerHour,
               timerMinute: timer[0].timerMinute,
               timerSecond: timer[0].timerSecond,
               doneTime: timer[0].doneTime,
               state: timer[0].state
            }
            res.send(data);
         }else{
            res.send({status:-1});
         }
      })
   },

   setTimer: function(req, res){
      var username = req.params.username;
      var timernum = req.params.timernum;
      var doneTime = req.body.doneTime;
      var state = req.body.state;
      var timerName = req.body.timerName;
      Timer.update({username: username, timerNum: timernum}, {doneTime: doneTime, state: state, timerName: timerName}, function(err){
         if(err){
            return;
         }
         Timer.find({username: username, timerNum: timernum}, function(err, timer){
            var data = {
               username: timer[0].username,
               timerName: timer[0].timerName,
               timerNum: timer[0].timerNum,
               timerHour: timer[0].timerHour,
               timerMinute: timer[0].timerMinute,
               timerSecond: timer[0].timerSecond,
               doneTime: timer[0].doneTime,
               state: timer[0].state
            }
            res.send(data);
         })
      })
   },
   
}; 
 console.log("sssshome");

