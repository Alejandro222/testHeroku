module.exports = function(sequelize, DataTypes) {
	var User = sequelize.define('users', {
		name: DataTypes.STRING,
		user_name: DataTypes.STRING,
		password: DataTypes.STRING
	});
  return User;
};