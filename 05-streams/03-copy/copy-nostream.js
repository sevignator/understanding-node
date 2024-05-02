import fs from 'node:fs/promises';

async function main() {
  console.time('copy');

  const srcFileHandle = await fs.open('text.txt', 'r');
  const destFileHandle = await fs.open('text-copy.txt', 'w');
  let bytesRead;

  while (bytesRead !== 0) {
    const readResult = await srcFileHandle.read();
    bytesRead = readResult.bytesRead;

    if (bytesRead !== 16384) {
      const indexOfNotFilled = readResult.buffer.indexOf(0);
      const newBuffer = Buffer.alloc(indexOfNotFilled);

      readResult.buffer.copy(newBuffer, 0, 0, indexOfNotFilled);
      destFileHandle.write(newBuffer);
    } else {
      destFileHandle.write(readResult.buffer);
    }
  }

  console.timeEnd('copy');
}

main();
