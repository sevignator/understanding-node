import fs from 'node:fs/promises';

export async function createFile(path) {
  let fileHandle;

  try {
    const existingFileHandle = await fs.open(path, 'r');
    existingFileHandle.close();
    console.log(`The file ${path} already exists.`);
  } catch {
    const newFileHandle = await fs.open(path, 'w');
    newFileHandle.close();
    console.log(`The file ${path} was created.`);
  }

  await fs.writeFile(path, '');
}

export function deleteFile(path) {
  console.log(`The file ${path} was deleted.`)
}

export function renameFile(oldPath, newPath) {
  console.log(`The file ${oldPath} was renamed to ${newPath}.`)
}

export function addToFile(path, data) {
  console.log(`The data was added to the file ${path}.`)
}
