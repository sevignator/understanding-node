// Create a loop that writes some output to `text.txt` one million times,
// and use console.time() to benchmark how long it takes

import fs from 'node:fs/promises';

// Execution time: 12s (M1 Pro)
// CPU usage: 100% (one core)
// Memory usage: 50MB
async function main() {
  console.time('writeMany');

  let fileHandle;

  try {
    fileHandle = await fs.open('./text.txt', 'w');
    for (let i = 0; i < 1_000_000; i++) {
      await fileHandle.write(` ${i} `);
    }
  } catch (e) {
    console.log('Something went wrong.');
    console.log(e);
  }

  fileHandle?.close();

  console.timeEnd('writeMany');
}

main();
