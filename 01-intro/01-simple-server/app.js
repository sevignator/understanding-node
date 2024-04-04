import http from 'node:http';
import fs from 'node:fs';

const server = http.createServer();

server.on('request', (request, response) => {
  const result = fs.readFileSync('./text.txt');

  response.setHeader('Content-Type', 'text/plain');

  response.end(result);
});

server.listen(4080, '127.0.0.1', () => {
  console.log('Server has started on:', server.address());
});
