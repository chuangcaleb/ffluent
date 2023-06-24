import fs from 'fs';
import path from 'path';
import { CWD, SOURCE_FILE_EXTENSIONS } from './consts.js';

function isValidSourceFile(dirent) {
  function hasValidExtension(filename, extensions) {
    return extensions.includes(path.extname(filename).toLowerCase());
  }
  return !(
    dirent.isFile() && !hasValidExtension(dirent.name, SOURCE_FILE_EXTENSIONS)
  );
}

function recurse(dirent) {
  if (dirent.isDirectory())
    return recurseReadDir(path.resolve(filepath, dirent.name));
  return path.resolve(dirent.path, dirent.name);
}

function recurseReadDir(filepath) {
  const dirents = fs.readdirSync(filepath, { withFileTypes: true });

  return (
    dirents
      // Filter for source files
      .filter(isValidSourceFile)
      // Filter out private/excluded fountain files (starts with _)
      // .filter(({ name }) => !(name[0] === '_'))
      .map(recurse)
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
