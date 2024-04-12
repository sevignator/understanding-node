import fs from 'node:fs';

const content = fs.readFileSync('./text.txt', {
  encoding: 'utf-8'
});

console.log(content);
