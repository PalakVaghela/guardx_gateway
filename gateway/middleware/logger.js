const matrics = require('../services/metricsEngine');

module.exports = (req, res, next) => {
    const start = Date.now();

    res.on('finish', () => {
        const log = {
            ip: req.ip,
            apiKey: req.apiKey,
            path: req.originalUrl,
            method: req.method,
            status: res.statusCode,
            duration: Date.now() - start
        };

        console.log("LOG:", log);

        metrics.totalRequests()
        metrics.trackIP(req.ip);

        if (res.statusCode >= 400) {
            metrics.blockedRequests();
        }
    });

    next();
};
