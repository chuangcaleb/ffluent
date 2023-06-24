import fs from 'fs';
import YAML from 'js-yaml';
import path from 'path';
import { CONFIG_EXTENSIONS, ERROR_LOCATION_PREFIX } from '../consts.js';
import readFile from './readFile.js';

function composeConfigFilepath(dir, filename) {
  const filenameList = CONFIG_EXTENSIONS.map((ext) => filename + ext);
  const filepathList = filenameList
    .map((fullFilename) => path.resolve(dir, fullFilename))
    .filter((filepath) => fs.existsSync(filepath));

  if (filepathList.length === 0) {
    throw new Error(
      'Expected a ffluent configuration file named ' +
        filenameList.join(' or ') +
        ERROR_LOCATION_PREFIX +
        dir
    );
  }
  // Select the first extension config, if multiple were found
  return filepathList[0];
}

export default async function readConfig(dir, filename) {
  const configPath = composeConfigFilepath(dir, filename);

  const { ext } = path.parse(configPath);
  const textContent = readFile(configPath);

  try {
    if (ext === '.yaml') return YAML.load(textContent);
    if (ext === '.json') return JSON.parse(textContent);
  } catch (err) {
    err.message += ERROR_LOCATION_PREFIX + configPath;
    throw err;
  }
}
