import EventEmitter from 'node:events';

const myEmitter = new EventEmitter();

myEmitter.on('foo', () => {
  console.log('foo #1 occurs');
});

myEmitter.once('foo', () => {
  console.log('foo #2 occurs (once)');
});

myEmitter.on('foo', () => {
  console.log('foo #3 occurs');
});

myEmitter.on('bar', () => {
  console.log('bar #1 occurs');
});

for (let i = 0; i < 2; i++) {
  myEmitter.emit('foo');
  myEmitter.emit('bar');
  console.log('---------------');
}
