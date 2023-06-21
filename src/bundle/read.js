import fs from 'fs';

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

export async function readJson(filepath) {
  const textContent = readFile(filepath);
  return JSON.parse(textContent);
}
