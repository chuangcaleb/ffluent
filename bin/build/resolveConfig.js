import path from 'path';
import { OUT_DIR, OUT_FILENAME, SRC_DIR } from './consts.js';

// TODO: handle no config / missing required
export default function resolveConfig(config) {
  const outputFilepath = path.resolve(
    config?.outputDir ?? OUT_DIR,
    config?.outputFilename ?? `${config?.title}.fountain` ?? OUT_FILENAME
  );
  const srcDir = config?.srcDir ?? SRC_DIR;

  return {
    ...config,
    outputFilepath,
    srcDir,
  };
}
