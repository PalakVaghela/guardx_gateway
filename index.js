const express = require('express');
const auth = require('./gateway/middleware/auth');
const rateLimiter = require('./gateway/middleware/rateLimiter');
const quotaChecker = require('./gateway/middleware/quotaChecker');
const logger = require('./gateway/middleware/logger');

module.exports = function guardx() {

    const router = express.Router();

    router.use(auth);
    router.use(rateLimiter);
    router.use(quotaChecker);
    router.use(logger);

    return router;

    // router groups all middlewere togather, so uer can easily use it.
};
