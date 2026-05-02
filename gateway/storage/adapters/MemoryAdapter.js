class MemoryAdapter {
    constructor() {
        this.store = new Map();
        console.log("memory adaptor is working");
        
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
}

module.exports = MemoryAdapter;
