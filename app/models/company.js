"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {

    class Company extends Model {
        static associate(models) {

            Company.belongsTo(models.User, {
                constraint: true,
                foreignKey: 'adminId'
            });

            Company.hasMany(models.Testimony, {
                foreignKey: 'companyId'
            });
        }
    }

    Company.init({
        companyName: {
            type: DataTypes.STRING
        },
        tradingName: {
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.STRING
        },
        cnpj: {
            type: DataTypes.STRING
        },
        mapCoordinates: {
            type: DataTypes.STRING
        }
    }, {
        sequelize,
        modelName: "Company",
    })

    return Company;
}