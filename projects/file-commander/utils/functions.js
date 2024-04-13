import fs from 'node:fs/promises';

export async function createFile(path) {
  let fileHandle;

  try {
    const existingFileHandle = await fs.open(path, 'r');
    existingFileHandle.close();
    console.log(`The file ${path} already exists!`);
  } catch {
    const newFileHandle = await fs.open(path, 'w');
    newFileHandle.close();
    console.log(`The file ${path} was created!`);
  }

  await fs.writeFile(path, '');
}
