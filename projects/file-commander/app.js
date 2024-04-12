const fs = require('fs/promises');

(async () => {
  const commandFileHandler = await fs.open('./command.txt', 'r');
  const watcher = fs.watch('./command.txt');

  commandFileHandler.on('change', async () => {
    const fileSize = (await commandFileHandler.stat()).size;
    const buffer = Buffer.alloc(fileSize);
    const content = await commandFileHandler.read({
      buffer,
      offset: 0,
      length: buffer.byteLength,
      position: 0,
    });

    console.log(content);
  });

  for await (const event of watcher) {
    if (event.eventType === 'change') {
      commandFileHandler.emit('change');
    }
  }
})();
