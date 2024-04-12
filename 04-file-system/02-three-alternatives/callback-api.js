import fs from 'node:fs';

fs.copyFile('file.txt', 'file-copy-callback.txt', (error) => {
  if (error) {
    console.log(error);
  }
});
