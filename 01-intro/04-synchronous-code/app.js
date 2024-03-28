console.log('First');

// This loop will block the main thread for a while
for (let i = 0; i < 100_000_000_000; i++) {}

console.log('Second');
