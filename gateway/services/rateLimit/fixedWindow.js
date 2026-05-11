const storage = require('../../storage')


module.exports = async function fixedWindow(key, limit, window) {
    const counter = await storage.increment(key);
    const ttl = await storage.ttl(key);

    if (ttl === -1) {
        await storage.expire(key, window);
    }

    return {
        allowed: counter <= limit,
        count: counter
    }
}
// whevere first req. come counter will increase and then fetch ttl.
// but for first req. we don't have ttl related with key, so ttl = -1, and will set expiration of window size. return allowed.
// for 2nd req. we will have ttl so will not set and directly set allowed if limit is not exceed.
