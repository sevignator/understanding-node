import fs from 'node:fs/promises';

(async () => {
  try {
    await fs.copyFile('file.txt', 'file-copy-promise.txt');
  } catch (error) {
    console.log(error);
  }
})();
