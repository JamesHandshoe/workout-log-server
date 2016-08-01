//gets the module sequelize
var Sequelize = require('sequelize');

//postgress://postgress:password@localhost:5432/workoutlog (database url)
//connects to postgres gives location and what time of db client
var sequelize = new Sequelize(process.env.DATABASE_URL, {
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
