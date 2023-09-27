const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/user');
const userController = require('../controllers/users');
const { storeReturnTo } = require('../middleware')


router.get('/register', userController.getRegister) 
 

router.post('/register', userController.postRegister);


router.get('/login', userController.getLogin)


router.post('/login',storeReturnTo,passport.authenticate('local',{failureFlash:true,failureRedirect:'/login'}), userController.postLogin)




router.get('/logout', function(req, res, next){
    req.logout(function(err) {
      if (err) { return next(err); }
      req.flash('success','Goodbye!');
      res.redirect('/lecture');
    });
  });

module.exports = router;