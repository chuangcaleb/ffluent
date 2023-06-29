import fs from 'fs';
import path from 'path';
import { COVER_FILENAME, CWD, META_FILENAME } from '../../consts.js';
import readConfig from '../readConfig.js';
import readFile from '../readFile.js';
import processByMeta from './processByMeta.js';

function isValidSourceFile(dirent) {
  function hasValidExtension(filename, extension) {
    return path.extname(filename).toLowerCase() === extension;
  }
  // If dirent is a file, then it must be a .fountain file
  return !(dirent.isFile() && !hasValidExtension(dirent.name, '.fountain'));
}

function recurseReadDirectory(directory, depth) {
  const composeSectionHeading = (title) => `${'#'.repeat(depth)} ${title}`;

  function recurse(dirent) {
    const { name: dName } = dirent;

    if (dirent.isDirectory()) {
      const directoryPath = path.resolve(directory, dName);
      return [
        composeSectionHeading(dName),
        ...recurseReadDirectory(directoryPath, depth + 1),
      ];
    }
    const { path: dPath } = dirent;
    const { name: dNameBase } = path.parse(dName);

    // Else, is a file:
    return [
      ...(dNameBase.toLowerCase() !== COVER_FILENAME
        ? [composeSectionHeading(dNameBase)]
        : []),
      readFile(path.resolve(dPath, dName)).trim(),
    ];
  }

  const dirents = fs
    .readdirSync(directory, { withFileTypes: true })
    .filter(isValidSourceFile);

  const metaConfig = readConfig(directory, META_FILENAME, false);
  // If metaConfig doesn't exist, then just use everything
  const processedDirents = metaConfig
    ? processByMeta(metaConfig.content, dirents, metaConfig.path)
    : dirents;

  return (
    processedDirents
      // Filter out private/excluded fountain files (starts with _)
      // .filter(({ name }) => !(name[0] === '_'))
      .map(recurse)
      .flat()
  );
}

export default function composeSource(directory) {
  if (!fs.existsSync(directory)) {
    throw new Error(
      `A source directory doesn't exist at ${CWD}/${directory}\nYou can configure a custom source directory with the "srcDir" field in your ffluent config.`
    );
  }
  return recurseReadDirectory(directory, 1).join('\n\n');
}
