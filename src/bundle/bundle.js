import { CONFIG_FILENAME, CWD } from './consts.js';
import getSrcFilepaths from './getSrcFilepaths.js';
import readFiles, { readConfig } from './read.js';
import resolveConfig from './resolveConfig.js';
import writeOutput from './write.js';

export default async function bundle() {
  const config = resolveConfig(await readConfig(CWD, CONFIG_FILENAME));

  const filepaths = await getSrcFilepaths(config.srcDir);

  const fileContents = await readFiles(filepaths);

  // TODO: add final newline to all if not last char
  const outputContent = fileContents.join('\n');

  // write
  writeOutput(config.outputFilepath, outputContent);
}
