"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {

    class User extends Model {
        static associate(models) {

            User.hasMany(models.Company, {
                foreignKey: 'adminId'
            });

            User.hasMany(models.Testimony, {
                foreignKey: 'studentId'
            });
        
            User.hasMany(models.Testimony, {
                foreignKey: 'adminId'
            });

        }
    }

    User.init({
        name: {
            type: DataTypes.STRING
        },
        emailAddress: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        phoneNumber: {
            type: DataTypes.STRING
        },
        password: {
            type: DataTypes.STRING
        },
        userRole: {
            type: DataTypes.STRING
        }
    }, {
        sequelize,
        modelName: "User",
    })
    
    return User;
}
    