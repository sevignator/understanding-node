import fs from 'node:fs';
import { Writable } from 'node:stream';

class FileWriteStream extends Writable {
  constructor({ highWaterMark, fileName }) {
    super({ highWaterMark });
    this.fileName = fileName;
    this.fd = null;
    this.chunks = [];
    this.chunksSize = 0;
    this.writesCount = 0;
  }

  // This will run after the constructor, and blocks the other methods
  // from running until the callback function has been called
  _construct(callback) {
    fs.open(this.fileName, 'w', (err, fd) => {
      if (err) {
        // Passing it an argument means that something went wrong
        return callback(err);
      }

      this.fd = fd;
      // No argument means it was successful
      callback();
    });
  }

  _write(chunk, _encoding, callback) {
    this.chunks.push(chunk);
    this.chunksSize += chunk.length;

    if (this.chunksSize < this.writableHighWaterMark) {
      return callback();
    }

    fs.write(this.fd, Buffer.concat(this.chunks), (err) => {
      if (err) {
        return callback(err);
      }

      this.chunks.length = 0;
      this.chunksSize = 0;
      ++this.writesCount;
      callback();
    });
  }

  // Will run when stream.end() is called
  _final(callback) {
    fs.write(this.fd, Buffer.concat(this.chunks), (err) => {
      if (err) {
        return callback(err);
      }

      this.chunks.length = 0;
      callback();
    });
  }

  _destroy(error, callback) {
    console.log('Number of writes:', this.writesCount);

    if (!this.fd) {
      return callback(error);
    }

    fs.close(this.fd, (err) => {
      callback(err || error);
    });
  }
}

const stream = new FileWriteStream({
  fileName: './text.txt',
});

stream.write(Buffer.from('This is some string.'));
stream.end(Buffer.from('Our last write.'));

stream.on('finish', () => {
  console.log('Stream was finished.');
});
