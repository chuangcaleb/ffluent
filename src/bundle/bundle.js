import { getConfig, getSrcTokens, parseTokens } from './read/index.js';
import writeOutput from './write.js';

export default async function bundle() {
  const config = getConfig();

  const tokens = getSrcTokens(config.srcDir);

  const components = parseTokens(tokens);

  // TODO: add final newline to all if not last char
  const outputContent = components.join('\n');

  // write
  writeOutput(config.outputFilepath, outputContent);
}
