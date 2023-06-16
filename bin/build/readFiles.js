import fs from 'fs';

export default async function readFiles(filepaths) {
  const result = filepaths.map((filepath) =>
    fs.readFileSync(filepath, 'utf-8')
  );

  console.log(`Read ${result.length} files`);
  return result;
}
