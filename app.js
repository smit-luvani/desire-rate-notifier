/**
 * Author: Smit Luvani
 * Description: This is the main file for the application.
 */

const express = require('express'),
    app = express(),
    httpStatus = require('http-status'),
    logger = require('./src/services/winston'),
    packageInfo = require('./package.json'),
    response = require('./src/utils/response'),
    { randomDigit } = require('./src/utils/random')

const serverUpTime = new Date();

// Console Clear
console.clear() // Comment this for Continuos logging

// Environment Checker
require('dotenv').config({ override: false })
try {
    if (process.env.NODE_ENV == undefined) {
        throw new Error('\x1b[31m\x1b[1m NODE_ENV NOT FOUND. Please Set NODE_ENV and PORT to make it run \x1b[0m')
    }
    logger.info(`Server: \x1b[32m\x1b[1m PORT: ${process.env.PORT} \x1b[0m || \x1b[32m\x1b[1m NODE_ENV: ${process.env.NODE_ENV || '\x1b[31m\x1b[1m NODE_ENV NOT FOUND'} \x1b[0m`)
} catch (e) {
    console.log(e.message)
    process.exit(1)
}


// Body Parser
app.use(express.urlencoded({ extended: true }), express.json(), (error, req, res, next) => {
    if (error instanceof SyntaxError) {
        return response(res, httpStatus.BAD_REQUEST, 'SyntaxError: Invalid Body')
    }
    if (error instanceof ReferenceError) {
        return response(res, httpStatus.BAD_REQUEST, 'ReferenceError: Invalid Reference. [REPORT TO DEVELOPER]')
    }
    next()
})

// Cookie Parser
app.use(require('cookie-parser')())

// URI Error Handling
app.use((req, res, next) => {
    try {
        decodeURIComponent(req.path);
        next();
    } catch (error) {
        return response(res, httpStatus.BAD_REQUEST, 'URIError: Invalid URI/ URL. URI/ URL may contain invalid character.' + error.message || '', error)
    }
})

// Request Logger
app.use((req, res, next) => {
    try {
        // Track Individual Request
        let requestID = randomDigit();
        res._requestID = requestID;
        res._requestTime = new Date();

        let header = {...req.headers }
        delete header.authorization
        header = JSON.stringify(header)

        logger.info(`
--------------- INCOMING REQUEST ---------------------------------------------
Request ID: ${res._requestID} | IP: ${(req.headers[ 'x-forwarded-for' ] || req.socket.remoteAddress).split(",")[0]}
Headers [MAY CONTAINS SECRETS]: ${header}
Path: ${req.path} | Method: ${req.method}
Body: ${JSON.stringify(req.body)}
Query: ${JSON.stringify(req.query)}
------------------------------------------------------------------------------`)

        next();
    } catch (error) {
        logger.error(error.message)
        return response(res, httpStatus.BAD_REQUEST, 'URIError: Invalid URI/ URL. URI/ URL may contain invalid character.')
    }
})

// App Health Check
app.get(['/', '/health'], (req, res) => {
    return response(res, httpStatus.OK, 'success', {
        message: 'Health: OK',
        environment: process.env.NODE_ENV,
        app: packageInfo.name,
        version: packageInfo.version,
        description: packageInfo.description,
        author: packageInfo.author,
        license: packageInfo.license,
        time_info: {
            timezone: serverUpTime.toLocaleDateString(undefined, { day: '2-digit', timeZoneName: 'long' }).substring(4),
            server_uptime: { Date: serverUpTime, locale_string: serverUpTime.toLocaleString() },
            server_time: { Date: new Date(), locale_string: new Date().toLocaleString() }
        }
    })
})


// Routes

const { telegramRoutes } = require('./src/routes')

app.use('/api/telegram/v1', telegramRoutes)

app.use((req, res) => { return response(res, httpStatus.METHOD_NOT_ALLOWED, 'Invalid API/Method. Please check HTTP Method.') })

module.exports = app;

// const req = unirest("GET", "https://currency-exchange.p.rapidapi.com/exchange");

// req.query({
//     "from": "EUR",
//     "to": "INR",
//     "q": "1.0"
// });

// req.headers({
//     "X-RapidAPI-Host": "currency-exchange.p.rapidapi.com",
//     "X-RapidAPI-Key": "d78d3ec461msh20d095d98ebed24p135424jsn5c1f61ad45c5",
//     "useQueryString": true
// });

// req.end(function(res) {
//     if (res.error) throw new Error(res.error);

//     console.log({ status: res.status, i, price: res.raw_body });
// });