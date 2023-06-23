import fs from 'fs';
import path from 'path';
import { CWD } from './consts.js';

function hasExtension(filename, extension) {
  return path.extname(filename).toLowerCase() === extension;
}

function recurseReadDir(filepath) {
  const dirents = fs.readdirSync(filepath, { withFileTypes: true });

  return (
    dirents
      // Filter for .fountain files
      .filter(
        (dirent) =>
          !(!dirent.isDirectory() && !hasExtension(dirent.name, '.fountain'))
      )
      // Filter out private/excluded fountain files (starts with _)
      .filter(({ name }) => !(name[0] === '_'))
      .map((dirent) => {
        if (dirent.isDirectory()) {
          return recurseReadDir(path.resolve(filepath, dirent.name));
        }
        return path.resolve(dirent.path, dirent.name);
      })
      .flat()
  );
}

export default async function getSrcFilepaths(dir) {
  if (!fs.existsSync(dir)) {
    throw new Error(
      `A source directory doesn't exist at ${CWD}/${dir}\nYou can configure a custom source directory with the "srcDir" field in your ffluent config.`
    );
  }
  const result = recurseReadDir(dir);
  // console.log(`Found ${result.length} files`);
  return result;
}
