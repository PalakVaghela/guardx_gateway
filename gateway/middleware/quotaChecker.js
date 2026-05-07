const storage = require('../storage');

module.exports = async (req, res, next) => {
    const today = new Date().toISOString().split('T')[0];
    const key = `quota:${req.apiKey}:${today}`;

    const usage = await storage.increment(key);

    const limit = req.user.plan === "pro" ? 10000 : 10000;

    console.log(limit, "limit.....");
    console.log(usage, "current usage");

    if (usage > limit) {
        return res.status(429).json({
            error: "Daily quota exceeded"
        });
    }

    next();
};
