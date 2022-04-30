/**
 * @author Smit Luvani
 * @description Postgres Connection
 * @package https://www.npmjs.com/package/pg
 * @tutorial https://node-postgres.com/
 */

const { Client } = require('pg')
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

let connectionObject = {
    host: secrets.postgres_host,
    port: secrets.postgres_port,
    user: secrets.postgres_user,
    password: String(secrets.postgres_password),
    database: secrets.postgres_database,
}

let pgClient;


try {
    pgClient = new Client(connectionObject)

    pgClient.connect(error => error ? logger.error(error) : (logging.postgres ? logger.info('Service [Postgres Connected]') : null))
} catch (e) {
    logger.error(`Service [Postgres]: ${e.message}`)
    throw new Error(e)
}


module.exports = pgClient;