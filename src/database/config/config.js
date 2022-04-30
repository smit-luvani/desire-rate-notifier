/**
 * @author Smit Luvani
 * @description Export DB Config
 */

require('dotenv').config({ override: false })

const env_prefix = require('../../common').env_prefix()

const secrets = {
    host: process.env[`${env_prefix}postgres_host`],
    port: process.env[`${env_prefix}postgres_port`],
    username: process.env[`${env_prefix}postgres_user`],
    password: process.env[`${env_prefix}postgres_password`],
    database: process.env[`${env_prefix}postgres_database`],
    dialect: 'postgres',
    dialectOptions: {
        bigNumberStrings: true
    }
}

const migrationConfig = {
    // Use a different storage type. Default: sequelize
    "migrationStorage": "json",

    // Use a different file name. Default: sequelize-meta.json
    "migrationStoragePath": `${process.cwd()}/src/database/sequelize-meta.json`,

    // Use a different table name. Default: SequelizeMeta
    "migrationStorageTableName": "SequelizeMeta",

    // Use a different schema for the SequelizeMeta table
    "migrationStorageTableSchema": "migration_schema"
}

module.exports = {
    [process.env.NODE_ENV]: {...secrets, ...migrationConfig }
}