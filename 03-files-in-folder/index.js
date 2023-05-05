const fs = require('fs');
const path = require('path');

const folderPath = path.join(__dirname, 'secret-folder');


fs.readdir(folderPath, { withFileTypes: true }, (err, dirents) => {
  if (err) {
    console.error(err);
    return;
  }

  dirents.forEach((dirent) => {
    if (dirent.isFile()) {
      const fileNameWithExt = dirent.name;
      const filePath = path.join(folderPath, fileNameWithExt);

      fs.stat(filePath, (err, stats) => {
        if (err) {
          console.error(err);
          return;
        }

        const { name: fileName, ext: extension } = path.parse(fileNameWithExt);
        const fileSizeInBytes = stats.size;
        const fileSizeInKb = (fileSizeInBytes / 1024);

        console.log(`${fileName}-${extension.substring(1)}-${fileSizeInKb}kb`);
      });
    }
  });
});