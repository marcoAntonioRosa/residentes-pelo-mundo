"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {

    class Testimony extends Model {
        static associate(models) {
            
            Testimony.belongsTo(models.User, {
                as: 'student',
                constraint: true,
                foreignKey: 'studentId'
            });

            Testimony.belongsTo(models.User, {
                as: 'admin',
                constraint: true,
                foreignKey: 'adminId'
            });

            Testimony.belongsTo(models.Company, {
                as: 'company',
                constraint: true,
                foreignKey: 'companyId'
            });
        }
    }

    Testimony.init({
        title: {
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.STRING
        },
        status: {
            type: DataTypes.STRING
        },
        initialDate: {
            type: DataTypes.DATE
        },
        endDate: {
            type: DataTypes.DATE
        }
    }, {
        sequelize,
        modelName: "Testimony",
    })

    return Testimony;

}