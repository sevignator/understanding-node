const { Buffer } = require('buffer');

const memoryContainer = Buffer.from('4c616d70', 'hex');

console.log(memoryContainer.toString('ascii')); // Lamp
