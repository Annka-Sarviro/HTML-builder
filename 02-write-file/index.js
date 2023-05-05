const readline = require('readline');
const fs = require('fs');

const path = require('path');
const filePath = path.join(__dirname, 'output.txt');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const fileStream = fs.createWriteStream(filePath);

console.log('Привет! Введите текст. Для выхода введите "exit" или нажмите ctrl + c.');

rl.on('line', (input) => {
  if (input === 'exit') {
    console.log('До свидания!');
    process.exit(0);
  } else {

    fileStream.write(input + '\n');
  }
});

rl.on('close', () => {
  console.log('До свидания!');
  process.exit(0);
});