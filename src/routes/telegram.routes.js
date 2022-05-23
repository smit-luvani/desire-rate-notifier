/**
 * API Routes for Telegram: /api/telegram/v1
 */

const telegramRoutes = require('express').Router();

// -- Controllers --
const { telegramController: controllers } = require('../controllers');

// -- Routes --

module.exports = telegramRoutes;