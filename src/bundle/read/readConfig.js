import fs from 'fs';
import YAML from 'js-yaml';
import path from 'path';
import { CONFIG_EXTENSIONS, ERROR_LOCATION_PREFIX } from '../consts.js';
import readFile from './readFile.js';

function composeConfigFilepaths(dir, filename) {
  const filenameList = CONFIG_EXTENSIONS.map((ext) => filename + ext);
  const filepathList = filenameList.map((fullFilename) =>
    path.resolve(dir, fullFilename)
  );
  return filepathList;
}

export default async function readConfig(dir, filename, isRequired = true) {
  const configPaths = composeConfigFilepaths(dir, filename);

  const existingConfigPaths = configPaths.filter((filepath) =>
    fs.existsSync(filepath)
  );

  if (existingConfigPaths.length === 0) {
    if (isRequired) {
      throw new Error(
        'Expected a ffluent configuration file named ' +
          filenameList.join(' or ') +
          ERROR_LOCATION_PREFIX +
          dir
      );
    } else {
      return null;
    }
  }

  // If multiple valid configs were found: select the first
  const configPath = existingConfigPaths[0];

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
