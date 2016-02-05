"use strict";

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    name: DataTypes.STRING,
    password : DataTypes.STRING,
    email : DataTypes.STRING
  });

  return User;
};