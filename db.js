//gets the module sequelize
var Sequelize = require('sequelize');

//connects to postgres gives location and what time of db client
var sequelize = new Sequelize('workoutlog', 'postgres', process.env.DB_PASSWORD, {
	host: 'localhost',
	dialect: 'postgres'
});

//makes sure that we are connected
sequelize.authenticate().then(
	function(){
		console.log('connected to workoutlog postgres db');
	},
	function(){
		console.log(err);
	}
);

//this brings User from /models/user.js
var User = sequelize.import('./models/user');

//this exports line 5
module.exports = sequelize;
