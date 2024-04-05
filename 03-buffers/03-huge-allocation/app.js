import { Buffer, constants } from 'node:buffer';

const b = Buffer.alloc(1e9); // 1,000,000,000 bytes (1GB)

console.log(constants.MAX_LENGTH); // 4,294,967,296 bytes

// Fill the buffer with 0xff every 5 seconds
// Check the memory usage of the process
setInterval(() => {
  b.fill(0xff);
}, 5000);
