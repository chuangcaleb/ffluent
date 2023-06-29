import { CONFIG_FILENAME, CWD } from './consts.js';
import getSrcTokens from './getSrcTokens.js';
import { parseTokens, readConfig } from './read/index.js';
import resolveConfig from './resolveConfig.js';
import writeOutput from './write.js';

export default async function bundle() {
  const config = resolveConfig(await readConfig(CWD, CONFIG_FILENAME));

  const tokens = await getSrcTokens(config.srcDir);

  const components = parseTokens(tokens);

  // TODO: add final newline to all if not last char
  const outputContent = components.join('\n');

  // write
  writeOutput(config.outputFilepath, outputContent);
}
