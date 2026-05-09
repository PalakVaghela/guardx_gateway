class StorageManager {
    constructor(adapter) {
        this.adapter = adapter;
        console.log("storage adaptor is working");
    }

    async get(key) {
        return this.adapter.get(key);
    }

    async set(key, value, ttl = null) {
        return this.adapter.set(key, value, ttl);
    }

    async delete(key) {
        return this.adapter.delete(key);
    }

    async increment(key) {
        return this.adapter.increment(key);
    }
}

module.exports = StorageManager;
// storage manager is use to communicate with any storage. currently we have memoryadaptor in future we will have redisAdaptor.
// so we don't need to direct communicate with moemory and it become scalable.
