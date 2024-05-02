import fs from 'node:fs/promises';
import { pipeline } from 'node:stream';

async function main() {
  console.time('copy');

  const srcFileHandle = await fs.open('text.txt', 'r');
  const destFileHandle = await fs.open('text-copy.txt', 'w');

  const readStream = srcFileHandle.createReadStream();
  const writeStream = destFileHandle.createWriteStream();

  pipeline(readStream, writeStream, (err) => {
    if (err) {
      throw new Error(err);
    }

    console.timeEnd('copy');
  });
}

main();
