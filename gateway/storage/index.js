const MemoryAdapter = require('./adapters/MemoryAdapter');
const RedisAdapter = require('./adapters/RedisAdapter')
const StorageManager = require('./storageManager');

const storage = new StorageManager(new RedisAdapter());
console.log("storage adaptor #### is working");

module.exports = storage;

// When we start a server using node app.js. at that time it loads the fiels first of all.
// at that time it loads index.js and see redis in that or memoryadaptor in that and create the obj for it.
// it create the obj in cache of system.
// like here in redis we have given this.client = new Redis() so it will craete obj for redis and store it in memory.
// example : {
//    client: RedisClient
// }.
// after that it will pass to the storageManager who just forward the req. to adapter.
// after that whenever store is accessed it just use that obj. which is already created and req of get/set andd any other is passed and performs in memory.

// so, first of all obj is craeted then during all middlewares this all will use.

// i run node app.js whenvere any route or any middlewere first require index.js at that time it loads.
// loads index.js file
// allocate the data
