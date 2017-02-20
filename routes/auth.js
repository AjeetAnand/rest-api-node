'use strict';

const jwt = require('jsonwebtoken');
const userModel = require('../model/users');

var auth = {
	validate: (req, res, next) => {
		if (!req.body.email) {
			return next(new Error('Email is required'));
		}
		if (!req.body.password) {
			return next(new Error('Password is required'));
		}
		next();
	},

	login: (req, res, next) => {

		let options = {};

		['email', 'password'].forEach((elem, index) => {
			if (req.body[elem]) {
				options[elem] = req.body[elem];
			}
		});

		userModel.get(options, (err, data) => {
			if (err){
				return next(err);
			} else {
				let user = data[0];
				if (!user) {
					res.json({ success: false, message: 'Authentication failed. User not found.' });
				} else {
					if (user.password != req.body.password) {
		        res.json({ success: false, message: 'Authentication failed. Wrong password.' });
		      } else {
		      	let token = jwt.sign(user, '!NtEkhAb', {
		          expiresIn : 60*60*24 // expires in 24 hours
		        });

		        // return the information including token as JSON
		        res.json({
		          success: true,
		          message: 'Enjoy your token!',
		          token: token
		        });
		      }
				}
			}
		});
	},

	checkAuth: function checkAuth(req, res, next) {
		//console.log('req.headers', req.headers);
		let token = req.body.token || req.query.token || req.headers['x-access-token'];

		if (token) {

	    // verifies secret and checks exp
	    jwt.verify(token, '!NtEkhAb', function(err, decoded) {      
	      if (err) {
	        return res.json({ success: false, message: 'Failed to authenticate token.' });    
	      } else {
	        // if everything is good, save to request for use in other routes
	        req.decoded = decoded;
	        //console.log(decoded);    
	        next();
	      }
	    });

	  } else {

	    // if there is no token
	    // return an error
	    return res.status(403).send({ 
	        success: false, 
	        message: 'No token provided.' 
	    });
	    
	  }
	}

};

module.exports = auth;