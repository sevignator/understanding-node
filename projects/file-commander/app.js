import fs from 'node:fs/promises';
import {
  ADD_TO_FILE,
  CREATE_FILE,
  DELETE_FILE,
  RENAME_FILE,
} from './utils/contants.js';
import {
  addToFile,
  createFile,
  deleteFile,
  renameFile,
} from './utils/functions.js';

(async () => {
  const commandFileHandle = await fs.open('./command.txt', 'r');
  const watcher = fs.watch('./command.txt');

  // Custom event handler; gets triggered every time command.txt is saved
  commandFileHandle.on('change', async () => {
    // Get the file size of command.txt
    const fileSize = (await commandFileHandle.stat()).size;
    // Create a new buffer of that size
    const buffer = Buffer.alloc(fileSize);
    // Fill the new buffer with the binary data from command.txt
    await commandFileHandle.read({
      buffer,
      offset: 0,
      length: buffer.byteLength,
      position: 0,
    });

    // Decode the data from command.txt in UTF-8
    const command = buffer.toString('utf-8');

    // Create a file command handler
    // Format: `create a file <path>`
    if (command.includes(CREATE_FILE)) {
      const filePath = command.substring(CREATE_FILE.length + 1);
      createFile(filePath);
    }

    // Delete a file command handler
    // Format: `delete the file <path>`
    if (command.includes(DELETE_FILE)) {
      const filePath = command.substring(DELETE_FILE.length + 1);
      deleteFile(filePath);
    }

    // Rename a file command handler
    // Format: `rename the file <oldPath> to <newPath>`
    if (command.includes(RENAME_FILE)) {
      const separator = ' to ';
      const separatorIndex = command.indexOf(separator);
      const oldPath = command.substring(RENAME_FILE.length + 1, separatorIndex);
      const newPath = command.substring(separatorIndex + separator.length);
      renameFile(oldPath, newPath);
    }

    // Add to a file command handler
    // Format: `add to the file <data> this content: <data>`
    if (command.includes(ADD_TO_FILE)) {
      const separator = ' this content: ';
      const separatorIndex = command.indexOf(separator);
      const path = command.substring(ADD_TO_FILE.length + 1, separatorIndex);
      const data = command.substring(separatorIndex + separator.length);
      addToFile(path, data);
    }
  });

  for await (const event of watcher) {
    if (event.eventType === 'change') {
      commandFileHandle.emit('change');
    }
  }
})();
