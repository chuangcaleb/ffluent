import path from 'path';
import getSrcFilepaths from './getSrcFilepaths.js';
import readFiles from './readFiles.js';
import writeOutput from './write.js';

export default async function build() {
  try {
    const CWD = process.cwd();
    const SRC_DIR = path.resolve(CWD, 'src');

    const OUT_DIR = path.resolve(CWD, 'out');
    const OUT_FILENAME = 'output.fountain';

    const filepaths = await getSrcFilepaths(SRC_DIR);
    const fileContents = await readFiles(filepaths);

    // TODO: add final newline to all if not last char
    const output = fileContents.join('\n\n');

    // write
    writeOutput(OUT_DIR, OUT_FILENAME, output);
  } catch (e) {
    console.error(e);
  }
}
