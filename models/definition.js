// definition model needs description, logtype and an owner

module.exports = function(sequelize, DataTypes) {

	return sequelize.define('definition', {

		description: { type: DataTypes.STRING, unique: true },
		logType: DataTypes.STRING,
		owner: DataTypes.INTEGER
		
	});
};