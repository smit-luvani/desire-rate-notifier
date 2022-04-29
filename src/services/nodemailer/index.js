/**
 * @author Smit Luvani
 * @description SMTP Mailer
 * @module https://www.npmjs.com/package/nodemailer
 * @tutorial https://nodemailer.com/about/
 * @example https://github.com/nodemailer/nodemailer/tree/master/examples
 */

const nodemailer = require('nodemailer'),
    { logging } = require('../../config/default.json'),
    logger = require('../winston')
const env_prefix = require('../../common').env_prefix()

const nodemailerSecret = {
    smtp: process.env[env_prefix + 'nodemailer_smtp'],
    port: process.env[env_prefix + 'nodemailer_port'],
    user: process.env[env_prefix + 'nodemailer_email'],
    pass: process.env[env_prefix + 'nodemailer_password'],
}

// Check Secret
if (nodemailerSecret || nodemailerSecret.smtp || nodemailerSecret.email || nodemailerSecret.password) {
    logger.error('Service [NODEMAILER]: SMTP or Email or Password not found for current environment')
}

let transporter = nodemailer.createTransport({
    service: nodemailerSecret.smtp || 'gmail',
    port: nodemailerSecret.port || 465,
    secure: true,
    debug: false,
    logger: true,
    auth: {
        user: nodemailerSecret.email,
        pass: nodemailerSecret.password,
    },
});

module.exports = async(fromMail, toMail, subject, body, senderName) => {
    if (!toMail || !subject || !body) {
        return logger.error('Service [NODEMAILER]: Missing Required Parameter')
    }

    try {
        let info = await transporter.sendMail({
            from: `${senderName || fromMail || 'Express Forster'}`, // sender address
            to: toMail, // list of receivers
            subject: subject, // Subject line
            html: body, // html body
        });

        logging.nodemailer ? logger.info(`Service [NODEMAILER]: Mail Sent Result => ${JSON.stringify(info)}`) : null;
        return info;
    } catch (error) {
        return logger.error('Service [NODEMAILER]: ', error)
    }
}