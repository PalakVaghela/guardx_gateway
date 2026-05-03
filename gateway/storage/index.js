const MemoryAdapter = require('./adapters/MemoryAdapter');
const StorageManager = require('./storageManager');

const storage = new StorageManager(new MemoryAdapter());
console.log("storage adaptor is working");

module.exports = storage;

