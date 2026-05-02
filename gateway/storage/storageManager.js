class StorageManager {
    constructor(adapter) {
        this.adapter = adapter;
        console.log("storage adaptor is working");
    }

    get(key) {
        return this.adapter.get(key);
    }

    set(key, value) {
        return this.adapter.set(key, value);
    }

    delete(key) {
        return this.adapter.delete(key);
    }
}

module.exports = StorageManager;
