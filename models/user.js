//this makes the input from creating a user and prepares
//it for the database

module.exports = function(sequelize, Datatypes){
	//user model created using sequelize
	//talks to the table user
	var User = sequelize.define('user', {
		username: { type: Datatypes.STRING, unique: true},
		passwordhash: Datatypes.STRING
	});
	return User;
};





