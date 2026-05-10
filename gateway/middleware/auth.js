// Simple version (no DB yet)
const validKeys = require('../config/apiKeys');

module.exports = function auth(req, res, next) {
    const apiKey = req.headers['x-api-key'];

    if (!apiKey) {
        return res.status(401).json({
            status: "error",
            message: "API key missing"
        });
    }

    // TEMP: Hardcoded keys (later MongoDB)

    const user = validKeys[apiKey];
    // console.log(user, "user");

    if (!user) {
        return res.status(403).json({
            status: "error",
            message: "Invalid API key"
        });
    }

    // Attach user info for next middleware
    req.user = user;
    req.apiKey = apiKey;
    console.log(req.user, "Userrrrrr", req.apiKey, "api keyyyyyyy")
    // o/p: { plan: 'free' } Userrrrrr free-key api keyyyyyyy
    next();
};
