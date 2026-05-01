const botMap = new Map();

module.exports = (req, res, next) => {
    const timestamps = req.timestamps;
    console.log("inside anomaly detector11111111111");
    console.log(timestamps, "/////////////");

    if (!timestamps || timestamps.length < 5) {
        console.log("will not work");
        
        return next(); // not enough data
    }
    
    // calculate intervals
    let intervals = [];
    console.log(intervals, "interval before######");
    

    for (let i = 1; i < timestamps.length; i++) {
        intervals.push(timestamps[i] - timestamps[i - 1]);
    }
    console.log(intervals, "###############interval after");
    

    // calculate average interval
    // reduce() is used to do calculation on numarical array and provide single output.
    const avg = intervals.reduce((a, b) => a + b, 0) / intervals.length;

    // check variance (how similar intervals are)
    const variance = intervals.reduce((sum, val) => {
        return sum + Math.pow(val - avg, 2);
    }, 0) / intervals.length;
    console.log(variance, "**VARIENCE**");
    

    // BOT DETECTION CONDITION
    if (variance < 70) {
        return res.status(403).json({
            error: "Bot detected (too consistent requests)"
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
