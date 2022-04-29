/**
 * @author Smit Luvani
 * @description Set Firebase Admin SDK
 * @module https://www.npmjs.com/package/firebase-admin
 * @tutorial https://www.npmjs.com/package/firebase-admin#documentation
 */

const firebaseAdmin = require('firebase-admin'),
    env_prefix = require('../../common').env_prefix(),
    logger = require('../winston'),
    { logging } = require('../../config/default.json')

const secrets = {
    sdk: process.env[env_prefix + 'firebase_admin_sdk'],
    database: process.env[env_prefix + 'firebase_admin_sdk_databaseURL'],
}

if (!secrets.sdk || !secrets.databaseURL) {
    logger.error('Service [Firebase Admin]: SDK or Database URL Missing')
}

try {
    firebaseAdmin.initializeApp({
        credential: firebaseAdmin.credential.cert(secrets.sdk),
        databaseURL: secrets.databaseURL
    });
    logging.firebaseAdmin ? logger.info('Service [Firebase Admin]: SUCCESS') : null;
} catch {
    logger.info('Service [Firebase Admin]: Failed. SDK or database URL Invalid')
}