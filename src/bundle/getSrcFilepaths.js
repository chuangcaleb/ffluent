import fs from 'fs';
import path from 'path';
import { CWD, META_FILENAME, VALID_SOURCE_EXTENSION } from './consts.js';
import readConfig from './read/readConfig.js';
import processMeta from './processMeta.js';

function isValidSourceFile(dirent) {
  // Handles a list of valid extensions
  // function hasValidExtension(filename, extensions) {
  //   return extensions.includes(path.extname(filename).toLowerCase());
  // }
  // return !(
  //   dirent.isFile() && !hasValidExtension(dirent.name, SOURCE_FILE_EXTENSIONS)
  // );
  function hasValidExtension(filename, extension) {
    return path.extname(filename).toLowerCase() === extension;
  }
  return !(
    dirent.isFile() && !hasValidExtension(dirent.name, VALID_SOURCE_EXTENSION)
  );
}

function recurseReadDirectory(directory) {
  function recurse(dirent) {
    if (dirent.isDirectory())
      return recurseReadDirectory(path.resolve(directory, dirent.name));
    return path.resolve(dirent.path, dirent.name);
  }

  const dirents = fs
    .readdirSync(directory, { withFileTypes: true })
    .filter(isValidSourceFile);

  const metaConfig = readConfig(directory, META_FILENAME, false);
  const processedDirents = metaConfig
    ? processMeta(metaConfig.content, dirents, metaConfig.path)
    : dirents;

  return (
    processedDirents
      // Filter out private/excluded fountain files (starts with _)
      // .filter(({ name }) => !(name[0] === '_'))
      .map(recurse)
      .flat()
  );
}

export default async function getSrcFilepaths(directory) {
  if (!fs.existsSync(directory)) {
    throw new Error(
      `A source directory doesn't exist at ${CWD}/${directory}\nYou can configure a custom source directory with the "srcDir" field in your ffluent config.`
    );
  }
  const result = recurseReadDirectory(directory);
  // console.log(`Found ${result.length} files`);
  return result;
}
