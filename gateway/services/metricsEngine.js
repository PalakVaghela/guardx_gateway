const storage = require('../storage');


module.exports = {
    // no of req handle by it.
    async totalRequests() {
        await storage.increment('metrics:total');
    },
    // we will give matrics:total key, and it will show values for metrics
    // when tere is any 404 error it will called
    async blockedRequests() {
        await storage.increment('metrics:blocked');
    },

    async trackIP(ip) {
        await storage.increment(`metrics:ip:${ip}`);
    },

    async trackRequestPerSecond() {
        const now = Math.floor(Date.now() / 1000); // current second
        console.log(now, "now time::");
        const key = `metrics:rps:${now}`;
        // metrics:rps:1778495222 will gice o/p like this.
        console.log(key, "key::::::::::");
        await storage.increment(key);
        await storage.expire(key, 60); // keep data for 60 seconds
    },

    async topIP(ip){
        const key = 'metrics:top_ips';
        await storage.zIncrement(key, 1, ip);
        // syn in redis: ZINCRBY key increment member.. increment by 1 everytime req come
    }
};

// we have add matrix engine and matrix route is used o check the logger.
//  we have set different routes for both like for testing of internal data.
// for debugge and testing we use /guardx/matrics and for extrnal traffice we will use /api.


// trackRequestPerSecond() is used to fetch the traffic per second. that how many req. come in second. Date.now() will give current time in ms.
// so suppose it will give 1714656005123 - ms. we will convert it into sec. and then for example is reqs. come on same sec. and if ms is diff only then it will get same key:value will be there
// if we got req. at a same sec it will have same key: and will update the count. like if ms only diff and sec is same for some continues request. for key it will save count(count will for every key but increase only when reqest are coming at same seconds)
// if we use ms insted of sec. to mesure the time it will give unique value each time and can't analysisi traffic for dashboard.
