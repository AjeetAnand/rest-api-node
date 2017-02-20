"use strict";

var allowedHosts = [
    'http://localhost:3001',
];
module.exports = function (req,res,next) {
	//console.log('cors hdears entered', allowedHosts.indexOf(req.headers.origin), req.headers.origin);
	if(~allowedHosts.indexOf(req.headers.origin)){ 
		console.log('cors hdears passed');
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT');
    res.header('Access-Control-Allow-Headers', 'Content-Type, x-access-token');
	}
  next();
};