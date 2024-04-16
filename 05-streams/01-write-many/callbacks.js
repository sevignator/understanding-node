// Create a loop that writes some output to `text.txt` one million times,
// and use console.time() to benchmark how long it takes

import fs from 'node:fs';

// Execution time: 2s (M1 Pro)
// CPU usage: 100% (one core)
// Memory usage: 50MB
console.time('writeMany');

fs.open('./text.txt', 'w', (error, fd) => {
  for (let i = 0; i < 1_000_000; i++) {
    fs.writeSync(fd, ` ${i} `);
  }

  console.timeEnd('writeMany');
});
