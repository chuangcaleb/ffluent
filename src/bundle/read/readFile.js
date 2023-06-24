import fs from 'fs';

export default function readFile(filepath) {
  try {
    return fs.readFileSync(filepath, 'utf-8');
  } catch (e) {
    throw new Error(`An expected file was not found at ${filepath}`);
  }
}
