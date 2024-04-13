import fs from 'node:fs/promises';
import { CREATE_FILE } from './utils/contants.js';
import { createFile } from './utils/functions.js';

(async () => {
  const commandFileHandler = await fs.open('./command.txt', 'r');
  const watcher = fs.watch('./command.txt');

  commandFileHandler.on('change', async () => {
    const fileSize = (await commandFileHandler.stat()).size;
    const buffer = Buffer.alloc(fileSize);

    await commandFileHandler.read({
      buffer,
      offset: 0,
      length: buffer.byteLength,
      position: 0,
    });

    const command = buffer.toString('utf-8');

    // Handle the create file command
    if (command.includes(CREATE_FILE)) {
      const filePath = command.substring(CREATE_FILE.length + 1);
      createFile(filePath);
    }
  });

  for await (const event of watcher) {
    if (event.eventType === 'change') {
      commandFileHandler.emit('change');
    }
  }
})();
