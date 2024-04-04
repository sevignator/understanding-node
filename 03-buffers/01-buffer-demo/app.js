import { Buffer } from 'node:buffer';

const memoryContainer = Buffer.from('4c616d70', 'hex');

console.log(memoryContainer.toString('ascii')); // Lamp
