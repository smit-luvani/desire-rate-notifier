/**
 * @author Smit Luvani
 * @description Distribute All Service to Application
 * @implements [RECOMMEND] Use Particular Service instead of all service or remove unwanted service
 */

module.exports = {
    winston: require('./winston'),
    firebaseAdmin: require('./firebase-admin'),
    jwt: require('./jwt'),
    bcryptjs: require('./bcryptjs'),
    nodemailer: require('./nodemailer'),
    postgres: require('./postgres'),
    sequelize: require('./sequelize'),
};

// To Disable, Use Single Line Comment

// Service Log
// Enable/Disable Service Logging in config/default.json file