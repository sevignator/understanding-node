import fs from 'node:fs/promises';

export async function createFile(path) {
  try {
    // Attempt to read the file at the provided path; if it doesn't exist,
    // an error gets thrown and the file gets created in the `catch` block
    const existingFileHandle = await fs.open(path, 'r');
    existingFileHandle.close();
    console.log(`The file ${path} already exists.`);
  } catch (e) {
    // Handle file creation if it doesn't already exist
    if (e.code === 'ENOENT') {
      const newFileHandle = await fs.open(path, 'w');
      newFileHandle.close();
      console.log(`The file ${path} has been created.`);
      return;
    }
    // Fallback error message
    console.log(`Something went wrong while attempting to create the ${path}.`);
    console.log(e);
  }
}

export async function deleteFile(path) {
  try {
    // Attempt to delete the file at the provided path using `fs.unlink()`
    // as a safer alternative to `fs.rm()`
    await fs.unlink(path);
    console.log(`The file ${path} was deleted.`);
  } catch (e) {
    // Handle case where the file does not exist
    if (e.code === 'ENOENT') {
      console.log(`The file ${path} doesn't exist.`);
      return;
    }
    // Fallback error message
    console.log(`Something went wrong while attempting to delete ${path}.`);
    console.log(e);
  }
}

export async function renameFile(oldPath, newPath) {
  try {
    // Attempt to rename the file at the old path with the new path
    await fs.rename(oldPath, newPath);
    console.log(`The file ${oldPath} was renamed to ${newPath}.`);
  } catch (e) {
    // Handle case where the file does not exist
    if (e.code === 'ENOENT') {
      console.log(`The file ${oldPath} or the destination doesn't exist.`);
      return;
    }
    // Fallback error message
    console.log(`Something went wrong while attempting to rename ${oldPath}.`);
    console.log(e);
  }
}

export async function addToFile(path, data) {
  try {
    // Attempt to append data to the file at the provided path
    await fs.appendFile(path, data);
    console.log(`The data was added to the file ${path}.`);
  } catch (e) {
    // Handle case where the file does not exist
    if (e.code === 'ENOENT') {
      console.log(`The file ${path} doesn't exist.`);
      return;
    }
    // Fallback error message
    console.log(`Something went wrong while attempting to rename ${oldPath}.`);
    console.log(e);
  }
}
