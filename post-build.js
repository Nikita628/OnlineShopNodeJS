const fs = require("fs");
const path = require("path");

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  let entries = fs.readdirSync(src, { withFileTypes: true });

  for (let entry of entries) {
    let srcPath = path.join(src, entry.name);
    let destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

console.log('post build actions running...');

console.log('copying static files...');
copyDir('src/views', 'dist/views');
copyDir('src/public', 'dist/public');
console.log('copied static files successfully');

console.log('\x1b[32m%s\x1b[0m', 'post build actions finished');