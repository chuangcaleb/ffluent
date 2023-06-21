import fs from 'fs';
import path from 'path';

function recurseReadDir(filepath) {
  const dirents = fs.readdirSync(filepath, { withFileTypes: true });

  return (
    dirents
      .map((dirent) => {
        if (dirent.isDirectory()) {
          return recurseReadDir(path.resolve(filepath, dirent.name));
        }
        return path.resolve(dirent.path, dirent.name);
      })
      // TODO: Filter for .fountain files
      // Filter for _meta.json files (return as second arg)
      .flat()
  );
}

export default async function getSrcFilepaths(dir) {
  if (!fs.existsSync(dir)) {
    throw new Error(`A source directory doesn't exist at "${dir}".`);
  }
  const result = recurseReadDir(dir);
  // console.log(`Found ${result.length} files`);
  return result;
}
