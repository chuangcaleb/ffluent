import path from 'path';

const SRC = 'src';
const OUT = 'out';

export const CONFIG_FILENAME = 'ffluent';
export const DEFAULT_OUT_FILENAME = 'output.fountain';

export const CWD = process.cwd();
export const DEFAULT_SRC_DIR = path.resolve(CWD, SRC);

export const DEFAULT_OUT_DIR = path.resolve(CWD, OUT);
