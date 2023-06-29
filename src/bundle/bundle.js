import { getConfig, composeSource } from './read/index.js';
import writeOutput from './write.js';

export default async function bundle() {
  const config = getConfig();
  const output = composeSource(config.srcDir);
  writeOutput(config.outputFilepath, output);
}
