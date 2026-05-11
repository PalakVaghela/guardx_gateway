const storage = require('../storage');
const rules = require('../config/rules.json');
const rateLimitService = require('../services/rateLimit');

module.exports = async (req, res, next) => {
    console.log("rate limiter is checkigggg");
    const key = `${req.apiKey}:${req.ip}`;
    req.storeKey = key;
    const config = rules.plans[req.user.plan];
    const {limit, window, algorithm} = config.rateLimit;
    const quota = config.quota.daily;
    console.log(key, "stkey");
    // o/p = free-key:::ffff:127.0.0.1

    const result = await rateLimitService[algorithm](key, limit, window);

    if (!result.allowed) {
        return res.status(429).json({
            error: "Rate limit exceeded"
        });
    }
    next();
};

// first of all array will be check if size is < 5 then all push. so 5th req will push and after that block every other reqs.
// take timestemps from array which is come in last 60sec only.
// if in array there is more than required req then we got to know that there is an multiple req from single user
