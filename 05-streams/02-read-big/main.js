import fs from 'node:fs/promises';

async function main() {
  console.time('readBig');

  const fileHandleRead = await fs.open('text.txt', 'r');
  const fileHandleWrite = await fs.open('dest.txt', 'w');

  const readStream = fileHandleRead.createReadStream({
    highWaterMark: 64 * 1024,
  });
  const writeStream = fileHandleWrite.createWriteStream();
  let split = null;

  readStream.on('data', (chunk) => {
    const numbers = chunk.toString('utf-8').split('  ');

    // Determine whether the first number in the array is part of
    // the last number from the previous array
    if (Number(numbers[0]) !== Number(numbers[1]) - 1) {
      if (split) {
        numbers[0] = numbers[0] + split;
        split = null;
      }
    }

    // Determine whether the last number in the array is equal to
    // the previous numbers + 1
    if (
      Number(numbers[numbers.length - 1]) !==
      Number(numbers[numbers.length - 2]) + 1
    ) {
      split = numbers.pop();
    }

    console.log(numbers);

    if (!writeStream.write(chunk)) {
      readStream.pause();
    }
  });

  readStream.on('drain', () => {
    readStream.resume();
  });
}

main();
