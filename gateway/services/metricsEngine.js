const storage = require('../storage');


module.exports = {
    // no of req handle by it.
    totalRequests() {
        storage.increment('metrics:total');
    },

    // when tere is any 404 error it will called
    blockedRequests() {
        storage.increment('metrics:blocked');
    },

    trackIP(ip) {
        storage.increment(`metrics:ip:${ip}`);
    }
};
// we have add matrix engine and matrix route is used o check the logger.
//  we have set different routes for both like for testing of internal data.
// for debugge and testing we use /guardx/matrics and for extrnal traffice we will use /api.
