const Redis = require('ioredis');

class RedisAdapter {
    constructor() {
        console.log("Redis adapter connected");
        this.client = new Redis(); // default localhost:6379
    }

    async get(key) {
        const data = await this.client.get(key);
        return data ? JSON.parse(data) : null;
    }

    async set(key, value, ttl=null) {
        // data =  JSON.stringify(value)
        if (ttl){
            await this.client.set(key, JSON.stringify(value), 'EX', ttl);
            // EX means set expiration, this will tell redis that save this key and expire in ttl time, it will rub query internally and EX it in ttl time
        }
        else{
            await this.client.set(key, JSON.stringify(value));
        }
    }

    async increment(key) {
        return await this.client.incr(key);
    }

    async delete(key) {
        await this.client.del(key);
    }
}

module.exports = RedisAdapter;

// redis only saves string that's why we have to use JSON.parse that will take json string like '{"name":"Palak"}' to JSON formate.
// json.stringify convert json obj to  JSON-formatted string. revers to above
