//this makes the data model for the feed

module.exports = function(sequelize, Datatypes) {
	return sequelize.define('feed', {
		username: Datatypes.STRING,
		message: Datatypes.STRING
	});
};