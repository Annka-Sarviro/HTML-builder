const fs = require('fs');
const path = require('path');

// Функция для копирования файла
function copyFile(src, dest) {
  return new Promise((resolve, reject) => {
    const readStream = fs.createReadStream(src);
    const writeStream = fs.createWriteStream(dest);

    readStream.on('error', reject);
    writeStream.on('error', reject);
    writeStream.on('finish', resolve);

    readStream.pipe(writeStream);
  });
}

// Функция для копирования директории
async function copyDir(srcDir, destDir) {
  await fs.promises.mkdir(path.join(__dirname, destDir), { recursive: true });

  const files = await fs.promises.readdir(path.join(__dirname, srcDir), { withFileTypes: true });

  for (const file of files) {
    const srcPath = path.join(__dirname, srcDir, file.name);
    const destPath = path.join(__dirname, destDir, file.name);

    if (file.isDirectory()) {
      await copyDir(srcPath, destPath);
    } else {
      await copyFile(srcPath, destPath);
    }
  }
}

// Вызов функции для копирования директории
copyDir('files', 'files-copy')
  .then(() => console.log('Копирование завершено'))
  .catch((err) => console.error(err));
