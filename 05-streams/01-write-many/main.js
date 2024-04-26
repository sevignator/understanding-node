import fs from 'node:fs/promises';

// THIS CODE IS NOT PRODUCTION-READY
// Execution time: 224ms (M1 Pro)
// CPU usage: 100% (one core)
// Memory usage: 200MB
export async function main() {
  console.time('writeMany');

  const fileHandle = await fs.open('./text.txt', 'w');
  const stream = fileHandle.createWriteStream();

  console.log(stream.writableHighWaterMark);

  const buff = Buffer.alloc(16384, 'a');
  stream.write(buff);

  setInterval(() => {}, 1000);

  // for (let i = 0; i < 1_000_000; i++) {
  //   const buff = Buffer.from(` ${i} `, "utf-8");
  //   stream.write(buff);
  // }
  console.timeEnd('writeMany');

  fileHandle.close();
}
