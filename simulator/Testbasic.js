// testStorage.js

const storage = require('../gateway/storage');
console.log(storage, "storage is required");

storage.set('test', [1, 2, 3]);

console.log(storage.get('test')); // expect: [1,2,3]

storage.set('test', [1, 2, 3, 4]);

console.log(storage.get('test')); // expect: [1,2,3,4]
