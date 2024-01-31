'use strict';
module.exports = (sequelize, DataTypes) => {
  let user = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      unique: true
    }
  }, {});
  user.associate = function(models) {
    // associations can be defined here
  };
  return user;
};