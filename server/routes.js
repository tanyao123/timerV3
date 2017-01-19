var express=require('express'),
	router=express.Router(),
	home=require('../controllers/home');
module.exports=function(app){
	router.get('/',home.index);
	router.get('/about',home.about);
	router.get('/loginform',home.loginForm);
	router.get('/logout',home.logout);
	router.post('/loginform',home.loginFormSubmit);
	router.get('/register',home.register);
	router.post('/registerUser', home.registerUser);
	router.post('/hanleState', home.hanleState);
	router.post('/updateNumber', home.updateNumber);
	router.post('/getState', home.getState);
	router.get('/timer/:username/:timernum', home.getTimer);
	router.put('/timer/:username/:timernum', home.setTimer);
	app.use(router);
};
