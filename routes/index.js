var express = require('express');
var router = express.Router();
var Message = require('../Models/Message.js');
var User = require('../Models/User.js');

//module.exports = function(app, passport) {

    /* GET home page. */
    router.get('/', function(req, res) {
      res.render('index', { title: 'Express' });
    });

    router.get('/messages', function(req, res) {
        Message.find({}, function(err, result) {
           if (!err) {
               res.render('messages', {"msgs" : result});
           } else {
               Console.log("Render failed");
           }
        });
    });

    /* Sign up new account */
    router.get('/signup', function(req, res) {
        res.render('signup', { title: 'Sign Up an Account' });
    });

    /*Post from signing up new account */
    router.post('/signup', function(req, res) {
        var password1 = req.body.Password1;
        var password2 = req.body.Password2;
        if (password1 == password2) {
            new User({
                username: req.body.userName,
                password: new User().generateHash(password1)
            }).save( function(err) {
                if (err) {
                    console.log("Error saving username & password");
                }
                res.redirect('signupsuccess');
            });
        } else {
            res.redirect('signup');
        }
    });

    /* route to successful signup */
    router.get('/signupsuccess', function(req, res) {
        res.render('signupsuccess', {title: 'Success!'});
    });

    /* Get a message ploz. */
    router.get('/newmessage', function(req, res) {
        res.render('newmessage', { title: 'Add New Message' });
    });

    /* POST to add new message Service */
    router.post('/newmessage', function(req, res) {
        new Message({msg: req.body.Message}).save( function(err) {
            if (err) {
                console.log("You goofed");
            }
            res.redirect('messages');
        });
    });
//}

// route middleware to make sure a user is logged in
/*function isLoggedIn(req, res, next) {

	// if user is authenticated in the session, carry on 
	if (req.isAuthenticated())
		return next();

	// if they aren't redirect them to the home page
	res.redirect('/');
}
*/