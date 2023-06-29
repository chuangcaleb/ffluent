import fs from 'fs';
import path from 'path';
import { COVER_FILENAME, CWD, META_FILENAME, TOKENS } from '../../consts.js';
import processByMeta from './processByMeta.js';
import readConfig from '../readConfig.js';

function isValidSourceFile(dirent) {
  function hasValidExtension(filename, extension) {
    return path.extname(filename).toLowerCase() === extension;
  }
  return !(dirent.isFile() && !hasValidExtension(dirent.name, '.fountain'));
}

function recurseReadDirectory(directory, depth) {
  function recurse(dirent) {
    const { name: dName, path: dPath } = dirent;
    const { name: dNameBase } = path.parse(dName);

    const sectionTextToken = {
      type: TOKENS.TEXT,
      content: `${'#'.repeat(depth)} ${dNameBase}`,
    };

    if (dirent.isDirectory()) {
      const directoryPath = path.resolve(directory, dName);
      return [
        sectionTextToken,
        ...recurseReadDirectory(directoryPath, depth + 1),
      ];
    }

    return [
      ...(dNameBase.toLowerCase() !== COVER_FILENAME ? [sectionTextToken] : []),
      { type: TOKENS.FILE, content: path.resolve(dPath, dName) },
    ];
  }

  const dirents = fs
    .readdirSync(directory, { withFileTypes: true })
    .filter(isValidSourceFile);

  const metaConfig = readConfig(directory, META_FILENAME, false);
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

export default function getSrcTokens(directory) {
  if (!fs.existsSync(directory)) {
    throw new Error(
      `A source directory doesn't exist at ${CWD}/${directory}\nYou can configure a custom source directory with the "srcDir" field in your ffluent config.`
    );
  }
  const result = recurseReadDirectory(directory, 1);
  // console.log(`Found ${result.length} files`);
  return result;
}
