const storage = require('../storage');

module.exports = async (req, res, next) => {
    const today = new Date().toISOString().split('T')[0];
    // it will fetch today's days from obj of current datetime
    const key = `quota:${req.apiKey}:${today}`;
    // o/p : key = quota:free-key:2026-05-09
    const usage = await storage.increment(key);
    // internally redis save like this ...
    //    {
    //    "quota:free-key:2026-05-09": 2
    //   }
    const limit = req.user.plan === "pro" ? 10000 : 10000;

    console.log(limit, "limit.....");
    console.log(usage, "current usage");
    // usage = 1, then do increment
    if (usage > limit) {
        return res.status(429).json({
            error: "Daily quota exceeded"
        });
    }

    next();
};
