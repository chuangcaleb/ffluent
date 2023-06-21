import fs from 'fs';
import path from 'path';
import YAML from 'js-yaml';

function readFile(filepath) {
  try {
    return fs.readFileSync(filepath, 'utf-8');
  } catch (e) {
    throw new Error(`An expected file was not found at ${filepath}`);
  }
}

export default async function readFiles(filepaths) {
  const result = filepaths.map((filepath) => readFile(filepath));
  // console.log(`Read ${result.length} files`);
  return result;
}

export async function readConfig(dir, filename) {
  // const extensions = ['.json'];
  const extensions = ['.yaml', '.json'];
  const filenameList = extensions.map((ext) => filename + ext);
  const filepathList = filenameList.map((filename) =>
    path.resolve(dir, filename)
  );

  const existingConfigPaths = filepathList.filter((filepath) =>
    fs.existsSync(filepath)
  );

  if (existingConfigPaths.length === 0)
    throw new ReferenceError(
      'No file named ' + filenameList.join(' or ') + ' found at ' + dir
    );

  const configPath = existingConfigPaths[0];

  const { ext } = path.parse(configPath);
  const textContent = readFile(configPath);

  try {
    if (ext === '.yaml') return YAML.parse(textContent);
    if (ext === '.json') return JSON.parse(textContent);
  } catch (err) {
    throw new Error(err + ' in ' + configPath);
  }
}
