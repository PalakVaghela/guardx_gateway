const store = require('../storage')

module.exports = (req, res, next) => {
    const key = req.storeKey;
    const timestamps = store.get(key);
    const window = timestamps.slice(-20);
    console.log(key, "key   from   anomaly");
    
    if (window.length < 6) return next();
    console.log(key, "keyyyeyeye");
    console.log(timestamps, "time stamps ");
    
    let intervals = [];
    console.log(intervals, "interval before  anomaly");
    
    for (let i = 1; i < window.length; i++) {
        intervals.push(window[i] - window[i - 1]);
    }
    console.log(intervals, "interaval from anomaly");

    // remove outliers
    const median = [...intervals].sort((a, b) => a - b)[Math.floor(intervals.length / 2)];
    console.log(median, "median #####    ###  ##  ");
    
    console.log(median, "mediannnnn");

    const clean = intervals.filter(i => i < 3 * median);
    console.log(clean, "cleannnnnnnnnnn");
    
    if (clean.length < 5) return next();

    const avg = clean.reduce((a, b) => a + b, 0) / clean.length;
    console.log(avg, "AVG........................");
    

    const variance = clean.reduce((sum, val) => {
        return sum + Math.pow(val - avg, 2);
    }, 0) / clean.length;
    console.log(variance, "variance");
    

    const cv = Math.sqrt(variance) / avg;
    console.log(cv, "CVVVVVVVVVVVVV");
    
    console.log("CV:", cv);

    if (cv < 0.2) {
        return res.status(403).json({
            error: "Bot detected"
        });
    }

    next();
};

// There can be cases like if bot is sending a req then it have same interval so we will recognize that if it is bot, we can block it.
// we cannot just use difference because bot can be do like gap btw req is(in ms) - 101, 102, 103 like that so fo that we can't detect without variance.
// there can be cases like 100,100,100,300. this is also bot. and 110,120,130,140... also, so we can;t just do it using jitter we need variance.
// variance ca
// s^2 = sum of all (xi - mean)^2 / n-1, that's how it will calculate the variance. if variance is low all intervals are similar.
// this is exact calculation that will detect specific behavoiur of the bot.
