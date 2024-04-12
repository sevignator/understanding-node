import { Buffer } from 'node:buffer';

const b1 = Buffer.alloc(10000);
const b2 = Buffer.allocUnsafe(10000);

// console.log(b1);
// console.log(b2);

// Demonstrates that the buffer created with `allocUnsafe` contains random data
for (const i of b2) {
  if (i !== 0) {
    console.log(i.toString(2));
  }
}
