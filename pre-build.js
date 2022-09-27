const fs = require("fs");

function cleanDir(dir) {
  if (fs.existsSync(dir) && fs.lstatSync(dir).isDirectory()) {
    fs.rmSync(dir, { recursive: true, force: true });
  }
}

console.log('pre build actions running...');

console.log(`cleaning /dist directory...`);
cleanDir("dist");
console.log("cleaned /dist directory successfully");

console.log('\x1b[32m%s\x1b[0m', 'pre build actions finished');