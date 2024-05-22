import { Transform } from 'node:stream';
import fs from 'node:fs/promises';

class Encrypt extends Transform {
  constructor(totalBytes) {
    super();
    this.totalBytes = totalBytes;
    this.totalBytesRead = 0;
  }

  _transform(chunk, encoding, callback) {
    for (let i = 0; i < chunk.length; ++i) {
      if (chunk[i] !== 255) {
        chunk[i] += 1;
      }
    }

    this.totalBytesRead += chunk.length;

    const progressPercentage = Math.floor(
      (this.totalBytesRead / this.totalBytes) * 100,
    );

    this.showPercentage(progressPercentage);

    callback(null, chunk);
  }

  showPercentage(percentage) {
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    process.stdout.write(`Encrypting: ${percentage}%`);
  }
}

async function main() {
  const readFileHandle = await fs.open('./read.txt', 'r');
  const writeFileHandle = await fs.open('./write.txt', 'w');

  const readFileSize = (await readFileHandle.stat()).size;

  const readStream = readFileHandle.createReadStream();
  const writeStream = writeFileHandle.createWriteStream();

  const encrypt = new Encrypt(readFileSize);

  readStream.pipe(encrypt).pipe(writeStream);
}

main();
