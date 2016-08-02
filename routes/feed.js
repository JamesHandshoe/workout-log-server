var router = require('express').Router();
var sequelize = require('../db');
var Feed = sequelize.import('../models/feed');

router.get('/', function(req, res){
	
	Feed
	.findAll()
		.then(
			function success(data) {
				res.json(data);
			},
			function error(err) {
				res.json(err);	
			});
});

module.exports = router;