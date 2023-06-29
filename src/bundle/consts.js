import path from 'path';

const SRC = 'src';
const OUT = 'out';

export const CONFIG_FILENAME = 'ffluent';
export const META_FILENAME = '_meta';
export const PRIORITY_PREFIX = '+';

export const CWD = process.cwd();
export const DEFAULT_SRC_DIR = path.resolve(CWD, SRC);
export const DEFAULT_OUT_DIR = path.resolve(CWD, OUT);
export const DEFAULT_OUT_FILENAME = 'output.fountain';

export const LOG_LOCATION_PREFIX = '\n... @ ';

export const EXT = { YAML: '.yaml', JSON: '.json' };
export const CONFIG_EXTENSIONS = [EXT.YAML, EXT.JSON];

export const TOKENS = { FILE: 'file', TEXT: 'text' };
