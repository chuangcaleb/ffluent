import { CONFIG_FILEPATH, SRC_DIR } from './consts.js';
import getSrcFilepaths from './getSrcFilepaths.js';
import readFiles, { readJson } from './read.js';
import resolveConfig from './resolveConfig.js';
import writeOutput from './write.js';

export default async function build(program) {
  try {
    const config = resolveConfig(await readJson(CONFIG_FILEPATH));

    const filepaths = await getSrcFilepaths(program, config.srcDir);

    // Process files -> return [[content], [meta]]
    const fileContents = await readFiles(filepaths);

    // TODO: add final newline to all if not last char
    const outputContent = fileContents.join('\n');

    // write
    writeOutput(config.outputFilepath, outputContent);
  } catch (e) {
    program.error(e.message);
  }
}
