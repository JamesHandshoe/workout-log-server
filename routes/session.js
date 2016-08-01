//pull in the information
//login portion of the app
var router = require('express').Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var sequelize = require('../db');
var User = sequelize.import('../models/user');

//this is the login for individual sessions
router.post('/', function(req, res){
	//this checks the database for a specific user
	User.findOne({ where: { username: req.body.user.username } } ).then(
		function(user) {
			//if user is there it will check the password
			if(user) {
				bcrypt.compare(req.body.user.password, user.passwordhash, function(err, matches){
					//this then assigns a token and authenticates the user
					if (matches) {
						var token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24});
						res.json({
							user: user,
							message: "successfully authenticated",
							sessionToken: token
						});
					}
				});
			}
		},

		function(err) {

		}
	);
});

module.exports = router;

