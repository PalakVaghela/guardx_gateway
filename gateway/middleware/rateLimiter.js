const storage = require('../storage');

const RATE_WINDOW = 60 * 1000;

module.exports = async (req, res, next) => {
    console.log("rate limiter is checkigggg");
    const key = `${req.apiKey}:${req.ip}`;
    req.storeKey = key;

    const timestamps = await storage.get(key) || [];
    const now = Date.now();

    const filtered = timestamps.filter(ts => now - ts < RATE_WINDOW);
    filtered.push(now);

    storage.set(key, filtered);

    const MAX_REQUESTS = req.user.plan === "pro" ? 20 : 100;

    if (filtered.length > MAX_REQUESTS) {
        return res.status(429).json({
            error: "Rate limit exceeded"
        });
    }
    next();
};

// first of all array will be check if size is < 5 then all push. so 5th req will push and after that block every other reqs.
// take timestemps from array which is come in last 60sec only.
// if in array there is more than required req then we got to know that there is an multiple req from single user
