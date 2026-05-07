const MemoryAdapter = require('./adapters/MemoryAdapter');
const RedisAdapter = require('./adapters/RedisAdapter')
const StorageManager = require('./storageManager');

console.log("inside thsi problem");
console.log("storage adaptor ####****************** is working");

const storage = new StorageManager(new RedisAdapter());
console.log("storage adaptor #### is working");

module.exports = storage;
