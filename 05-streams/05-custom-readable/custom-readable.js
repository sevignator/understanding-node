import { Readable } from 'node:stream';
import fs from 'node:fs';

class FileReadStream extends Readable {
  constructor({ highWatermark, fileName }) {
    super({ highWaterMark });
    this.fileName = fileName;
    this.fd = null;
  }

  _construct(callback) {
    fs.open(this.fileName, 'r', (err, fd) => {
      if (err) {
        return callback(err);
      }

      this.fd = fd;
      callback();
    });
  }

  _read(size) {
    const buff = Buffer.alloc(size);
    fs.read(this.fd, buff, 0, size, null, (err, bytesRead) => {
      if (err) {
        return this.destroy(err);
      }

      // null indicates the end of the stream
      this.push(bytesRead > 0 ? buff.subarray(0, bytesRead) : null);
    });
  }

  _destroy(error, callback) {
    if (this.fd) {
      return fs.close(this.fd, (err) => callback(err || error));
    }

    callback(error);
  }
}
