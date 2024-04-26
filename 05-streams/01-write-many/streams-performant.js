// Create a loop that writes some output to `text.txt` one million times,
// and use console.time() to benchmark how long it takes

import fs from 'node:fs/promises';

// THIS CODE IS NOT PRODUCTION-READY
// Execution time: 224ms (M1 Pro)
// CPU usage: 100% (one core)
// Memory usage: 200MB
async function main() {
  console.time('writeMany');

  const fileHandle = await fs.open('./text.txt', 'w');
  const stream = fileHandle.createWriteStream();

  let i = 0;
  const totalIterations = 1_000_000;

  function writeMany() {
    while (i < totalIterations) {
      const buff = Buffer.from(` ${i} `, 'utf-8');

      if (i === totalIterations - 1) {
        stream.end(buff);
        return;
      }

      const hasSpace = stream.write(buff);

      // Increment the index before the loop potentially breaks,
      // otherwise you risk having duplicate numbers
      i++;

      if (!hasSpace) {
        break;
      }
    }
  }

  writeMany();

  stream.on('drain', writeMany);

  stream.on('finish', () => {
    fileHandle.close();
    console.timeEnd('writeMany');
  });
}

main();
