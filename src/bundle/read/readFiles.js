import readFile from './readFile.js';

export default async function readFiles(filepaths) {
  const result = filepaths.map((filepath) => readFile(filepath));
  // console.log(`Read ${result.length} files`);
  return result;
}
