const storage = require('../../storage');

module.exports = async function slidingWindow(key, limit, window){

    const timestamps = await storage.get(key) || [];
    // it will give an array of timestamps
    const now = Date.now();

    const filtered = timestamps.filter(
        ts => now - ts < window * 1000
    );
    // current time  - all reques's now time which we have stored in arrayy if it difference 60sec then will include.
    console.log(filtered, "arraaayyy");
    // o/p = [ 1778269547028 ] arraaayyy, filtered is basically now time, means time when req, come.
    // so for like last 60 sec reqs, it will filter it.
    // during first req it will timestamps = [] then, now-ts will be now - 0, so after second req. it will give
    filtered.push(now);

    await storage.set(key, filtered, window);
    // it will leave in 60sec.

    return {
        allowed: filtered.length <= limit,
        count: filtered.length
    };
};
