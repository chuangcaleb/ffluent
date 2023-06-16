import fs from 'fs';
import path from 'path';

function recurseReadDir(filepath) {
  const dirents = fs.readdirSync(filepath, { withFileTypes: true });

  return dirents
    .map((dirent) => {
      if (dirent.isDirectory()) {
        return recurseReadDir(path.resolve(filepath, dirent.name));
      }
      return path.resolve(dirent.path, dirent.name);
    })
    .flat();
}

export default async function getSrcFilepaths(filepath) {
  const result = recurseReadDir(filepath);
  console.log(`Found ${result.length} files`);
  return result;
}
