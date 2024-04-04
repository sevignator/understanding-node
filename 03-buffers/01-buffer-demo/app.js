import { Buffer } from 'node:buffer';

const memoryContainer1 = Buffer.alloc(5);
memoryContainer1[0] = 0x48;
memoryContainer1[1] = 0x65;
memoryContainer1[2] = 0x6c;
memoryContainer1[3] = 0x6c;
memoryContainer1[4] = 0x6f;

const memoryContainer2 = Buffer.from('576f726c64', 'hex');

const hiddenWord1 = memoryContainer1.toString('ascii');
const hiddenWord2 = memoryContainer2.toString('ascii');

console.log(hiddenWord1, hiddenWord2); // Hello World
