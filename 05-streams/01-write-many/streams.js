// Create a loop that writes some output to `text.txt` one million times,
// and use console.time() to benchmark how long it takes

import fs from "node:fs/promises";

// THIS CODE IS NOT PRODUCTION-READY
// Execution time: 224ms (M1 Pro)
// CPU usage: 100% (one core)
// Memory usage: 200MB
async function main() {
  console.time("writeMany");

  const fileHandle = await fs.open("./text.txt", "w");
  const stream = fileHandle.createWriteStream();

  for (let i = 0; i < 1_000_000; i++) {
    const buff = Buffer.from(` ${i} `, "utf-8");
    stream.write(buff);
  }

  console.timeEnd("writeMany");
}

main();
