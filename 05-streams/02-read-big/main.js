import fs from 'node:fs/promises';

async function main() {
  const fileHandleRead = await fs.open('src.txt', 'r');
  const fileHandleWrite = await fs.open('dest.txt', 'w');

  const readStream = fileHandleRead.createReadStream();
  const writeStream = fileHandleWrite.createWriteStream();

  readStream.on('data', (chunk) => {
    if (!writeStream.write(chunk)) {
      readStream.pause();
    }
  });

  readStream.on('drain', (chunk) => {
    readStream.resume();
  });
}

main();
