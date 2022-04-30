/**
 * @author Smit Luvani
 * @description Postgres Connection
 * @package https://www.npmjs.com/package/pg
 * @tutorial https://node-postgres.com/
 */

const { Sequelize } = require('sequelize')
const env_prefix = require('../../common').env_prefix()
const logger = require('../winston')
const { logging } = require('../../config/default.json')

const secrets = {
    postgres_host: process.env[`${env_prefix}postgres_host`],
    postgres_port: process.env[`${env_prefix}postgres_port`],
    postgres_user: process.env[`${env_prefix}postgres_user`],
    postgres_password: process.env[`${env_prefix}postgres_password`],
    postgres_database: process.env[`${env_prefix}postgres_database`],
}

let sequelizeConnection;

try {
    sequelizeConnection = new Sequelize('postgres://' + secrets.postgres_user + ':' + secrets.postgres_password + '@' + secrets.postgres_host + ':' + secrets.postgres_port + '/' + secrets.postgres_database, {
        logging: logging.sequelize,
        dialect: 'postgres'
    })

    sequelizeConnection.authenticate().then(() => {
        logger.info('Service [Sequelize]: Connected')
    }).catch((error) => {
        logger.error('Service [Sequelize]: ', error)
        throw new Error(error.message)
    })
} catch (e) {
    logger.error(`Service [Sequelize]: ${e.message}`)
    throw new Error(e)
}

module.exports = sequelizeConnection;