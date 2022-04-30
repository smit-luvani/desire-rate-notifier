'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Users extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Users.init({
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
            field: 'id'
        },
        uid: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false,
            unique: true,
            field: 'uid'
        },
        firstName: {
            type: Sequelize.STRING,
            allowNull: false,
            field: 'first_name'
        },
        lastName: {
            type: Sequelize.STRING,
            allowNull: true,
            field: 'last_name'
        },
        telegram_id: {
            type: Sequelize.INTEGER,
            field: 'telegram_id'
        },
        username: {
            type: Sequelize.STRING,
            field: 'username'
        },
        language_code: {
            type: Sequelize.STRING,
            field: 'language_code'
        },
        createdAt: {
            allowNull: false,
            type: Sequelize.DATE
        },
        updatedAt: {
            allowNull: false,
            type: Sequelize.DATE
        }
    }, {
        sequelize,
        modelName: 'Users',
    });
    return Users;
};