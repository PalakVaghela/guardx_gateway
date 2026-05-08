const metrics = require('../services/metricsEngine');

module.exports = (req, res, next) => {
    const start = Date.now();
    console.log("logger working........")

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
        metrics.trackRequestPerSecond()
    });

    next();
};
// middlewere is called on every req. so logger.js will called during /api hit also at that time it will call storage from this method. it ia used for write.
// while when we hit /matrics at that time matrics.routes run and call storage from that method. this is used for read, when we hit the route to fetch the data.
