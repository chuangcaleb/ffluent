import path from 'path';
import {
  DEFAULT_OUT_DIR,
  DEFAULT_OUT_FILENAME,
  DEFAULT_SRC_DIR,
} from '../../consts.js';

export default function resolveConfig(config) {
  const { outputDir, outputFilename, title } = config;
  let { srcDir } = config;

  const outputFilepath = path.resolve(
    outputDir ?? DEFAULT_OUT_DIR,
    outputFilename ?? (title && `${title}.fountain`) ?? DEFAULT_OUT_FILENAME
  );

  srcDir ??= DEFAULT_SRC_DIR;

  return {
    ...config,
    outputFilepath,
    srcDir,
  };
}
