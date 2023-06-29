import fs from 'fs';
import YAML from 'js-yaml';
import path from 'path';
import { CONFIG_EXTENSIONS } from '../../consts.js';
import { composeLocation } from '../../utils.js';
import readFile from '../readFile.js';

export default function readConfig(dir, filename, isRequired = true) {
  const configFilenames = CONFIG_EXTENSIONS.map((ext) => filename + ext);
  const configPaths = configFilenames.map((fullFilename) =>
    path.resolve(dir, fullFilename)
  );

  const existingConfigPaths = configPaths.filter((filepath) =>
    fs.existsSync(filepath)
  );

  if (existingConfigPaths.length === 0) {
    if (isRequired) {
      throw new Error(
        'Expected a ffluent configuration file named ' +
          configFilenames.join(' or ') +
          composeLocation(dir)
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
    if (ext === '.yaml')
      return { content: YAML.load(textContent), path: configPath };
    if (ext === '.json')
      return { content: JSON.parse(textContent), path: configPath };
  } catch (err) {
    err.message += composeLocation(configPath);
    throw err;
  }
  return null;
}
