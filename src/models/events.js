"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  const event = sequelize.define("event", {
    ETitle: {
      type: DataTypes.STRING,
    },
    EBrief: {
      type: DataTypes.STRING,
    },
    EParagraph: {
      type: DataTypes.STRING,
    },
    EPhotos: {
        type: DataTypes.STRING,
    allowNull: false,
    get() {
        return this.getDataValue('EPhotos').split(';')
    },
    set(val) {
       this.setDataValue('EPhotos',val.join(';'));
    },
      },
    ECover: {
      type: DataTypes.STRING,
    },
    EDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    ELink: {
        type: DataTypes.STRING,
        allowNull: false,
  }});

  return event;
};
