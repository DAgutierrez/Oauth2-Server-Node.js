"use strict";

module.exports = function(sequelize, DataTypes) {
  var Controller = sequelize.define("Controller", {
    controllerId: DataTypes.STRING,
    statusController : DataTypes.STRING,
  });

  return Controller;
};