import { Buffer } from 'node:buffer';

const memoryContainer = Buffer.from('486921', 'hex');

console.log(memoryContainer.toString('utf-8')); // Hi!
