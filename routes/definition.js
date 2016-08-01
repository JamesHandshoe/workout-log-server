var router = require('express').Router();
var sequelize = require('../db');
var Definition = sequelize.import('../models/definition');

//this portion takes the model and posts it
router.post('/', function(req, res){
	
	var description = req.body.definition.desc;
	var logType = req.body.definition.type; 
	var owner = req.user.id;

	Definition.create({
		description: description,
		logType: logType,
		owner: owner
	}).then(
		function createSuccess(definition){
			res.json({
				definition: definition,
			});
		},
		function createError(err){
			res.send(500, err.message);
		}
	);
});

//fetch definitions by userid
router.get('/', function(req, res){
	var owner = req.user.id;
	Definition
		.findAll({
			where: { owner: owner }
		})
		.then(
			function findAllSuccess(data){
				res.json(data);
			},
			function findAllError(err) {
				res.send(500, err.message);
			}
		);
});

router.delete('/', function(req, res){
	var data2 = req.body.definition.id;
	console.log(data2);
	Definition
		.destroy({
			where: { id : data2 }
		}).then(
			function deleteCatSuccess(data){
				res.send("You removed a category");
			},
			function deleteCatError(err){
				res.send(500, err.message);
			}
		);
});
module.exports = router;