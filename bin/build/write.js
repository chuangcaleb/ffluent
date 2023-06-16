import fs from 'fs';
import path from 'path';

export default async function writeOutput(dir, filename, content) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }

  const filepath = path.resolve(dir, filename);
  fs.writeFileSync(filepath, content);
  console.log('Successfully transpiled to ' + filepath);
}
