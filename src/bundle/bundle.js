import { getConfig, getSrcTokens, parseTokens } from './read/index.js';
import writeOutput from './write.js';

export default async function bundle() {
  const config = getConfig();

  const tokens = getSrcTokens(config.srcDir);

  const stringComponents = parseTokens(tokens);

  const outputContent = stringComponents.join('\n\n');

  // write
  writeOutput(config.outputFilepath, outputContent);
}
