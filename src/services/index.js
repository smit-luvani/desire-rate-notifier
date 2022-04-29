/**
 * @author Smit Luvani
 * @description Distribute All Service to Application
 * @implements [RECOMMEND] Use Particular Service instead of all service or remove unwanted service
 */

module.exports = {
    NODE_ENV: require('./NODE_ENV'), // Do not comment this, Used in many services
    winston: require('./winston'),
    firebaseAdmin: require('./firebase-admin'),
    jwt: require('./jwt'),
    bcryptjs: require('./bcryptjs'),
    aws: require('./aws-sdk'),
    nodemailer: require('./nodemailer'),
};

// To Disable, Use Single Line Comment

// Service Log
// Enable/Disable Service Logging in config/default.json file