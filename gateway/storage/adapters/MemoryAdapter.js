class MemoryAdapter {
    constructor() {
        this.store = new Map();
        console.log("memory adaptor is working");
        console.log(this.store, "new store is right here");
    }

    get(key) {
        return this.store.get(key);
    }

    set(key, value) {
        this.store.set(key, value);
    }

    delete(key) {
        this.store.delete(key);
    }

    increment(key) {
        const current = this.store.get(key) || 0;
        const updated = current + 1;
        this.store.set(key, updated);
        return updated;
    }
}

module.exports = MemoryAdapter;

// memory adaptor is where whole data is stored, it is actual memory.
// currenlty memory adaptoor stores the data in PC's RAM. in future it will chnage to redis
