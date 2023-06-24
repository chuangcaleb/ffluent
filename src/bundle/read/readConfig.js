import fs from 'fs';
import YAML from 'js-yaml';
import path from 'path';
import { CONFIG_EXTENSIONS, ERROR_LOCATION_PREFIX } from '../consts.js';
import readFile from './readFile.js';

export default async function readConfig(dir, filename) {
  const filepathList = CONFIG_EXTENSIONS.map((ext) =>
    path.resolve(dir, filename + ext)
  );

  const existingConfigPaths = filepathList.filter((filepath) =>
    fs.existsSync(filepath)
  );

  if (existingConfigPaths.length === 0) {
    throw new Error(
      'Expected a ffluent configuration file named ' +
        filenameList.join(' or ') +
        ERROR_LOCATION_PREFIX +
        dir
    );
  }

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
