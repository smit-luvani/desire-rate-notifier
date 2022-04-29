/**
 * @author Smit Luvani
 * @description Create Bearer Token for Object
 * @module https://www.npmjs.com/package/jsonwebtoken
 */

const jwt = require('jsonwebtoken'),
    env_prefix = require('../../common').env_prefix(),
    logger = require('../winston'),
    { logging } = require('../../config/default.json')

const secrets = process.env[env_prefix + 'jwt_secret_key']

module.exports.sign = (object, expiredIn) => {
    try {
        const token = object ? jwt.sign(object, secrets, { expiresIn: expiredIn || '1000d' }) : undefined;

        if (!token) {
            logger.error('Service [JWT]: String/Object Required to create Sign Token')
            return false
        }

        logging.jwt ? logger.info('Service [JWT]: Token: ' + token) : null;

        return token;
    } catch (error) {
        logger.error('Service [JWT]: ' + error)
        return null
    }
}

module.exports.verify = (token) => {
    try {
        logger.info((token, jwt.verify(token, secrets)) ? JSON.stringify(jwt.verify(token, secrets)) : 'Token Decode Failed/Expired')
        return token ? jwt.verify(token, secrets) : false;
    } catch (error) {
        logger.error('Service [JWT]: ' + error)
        return false;
    }
}