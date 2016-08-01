//this intercepts every authorization request and make sure the user has access

var jwt = require('jsonwebtoken');
var sequelize = require('../db');
var User = sequelize.import('../models/user');

module.exports = function(req, res, next){
	//this takes the request header
	var sessionToken = req.headers.authorization;
	//this processes the request header and ensures the correct access so the api can't get hammered
	if(!req.body.user && sessionToken) {
		jwt.verify(sessionToken, process.env.JWT_SECRET, function(err, decoded){
			if (decoded) {
				User.findOne({where: {id: decoded.id}}).then(
					function(user){
						req.user = user;
						next();
					},
					function(){
						res.status(401).send({error: 'you are not authorized'});
					}
				);
			} else {
				res.status(401).send({error: 'you are not authorized'});
			}
		});
	} else {
		next();
	}
};