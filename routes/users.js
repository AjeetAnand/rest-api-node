"use strict";
const jwt = require('jsonwebtoken');

var userModel = require('../model/users');

var users = {

	get: (req, res, next) => {
		var options = {};

		['id'].forEach((elem, index) => {
			if (req.query[elem]) {
				options[elem] = req.query[elem];
			}
		});

		['fName', 'lName', 'email'].forEach((elem, index) => {
			if (req.query[elem]) {
				options[elem] = req.query[elem];
			}
		});

		userModel.get(options, (err, data) => {
			if (!err){
				res.json(data);
			} else {
				next(err);
			}
		});
	},
	
};

module.exports = users;