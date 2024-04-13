import fs from 'node:fs/promises';

export async function createFile(path) {
  try {
    const existingFileHandle = await fs.open(path, 'r');
    existingFileHandle.close();
    console.log(`The file ${path} already exists.`);
  } catch {
    const newFileHandle = await fs.open(path, 'w');
    newFileHandle.close();
    console.log(`The file ${path} was created.`);
  }
}

export async function deleteFile(path) {
  try {
    await fs.rm(path);
    console.log(`The file ${path} was deleted.`);
  } catch {
    console.log(`The file ${path} doesn't exist.`);
  }
}

export async function renameFile(oldPath, newPath) {
  console.log(`The file ${oldPath} was renamed to ${newPath}.`);
}

export async function addToFile(path, data) {
  console.log(`The data was added to the file ${path}.`);
}
