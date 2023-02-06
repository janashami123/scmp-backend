'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    const user = sequelize.define("user", {
        U_Name: {
            type: DataTypes.STRING,
        },
        U_Hash: {
            type: DataTypes.STRING,
        },
        admin: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        auth: {
            type: DataTypes.STRING,
        },   
    })


    return user;
};
