const usageMap = new Map();

module.exports = (req, res, next) => {
    const today = new Date().toISOString().split('T')[0];
    const key = `${req.apiKey}:${today}`;

    let usage = usageMap.get(key) || 0;

    const limit = req.user.plan === "pro" ? 10000 : 10000;

    if (usage >= limit) {
        return res.status(429).json({
            error: "Daily quota exceeded"
        });
    }
    console.log(limit, "limit.....")
    console.log(usage, "before usage");

    usageMap.set(key, usage + 1);
    console.log(usage, "after usage");

    next();
}
