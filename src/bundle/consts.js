import path from 'path';

const SRC = 'src';
const OUT = 'out';

export const CONFIG_FILENAME = 'ffluent';
export const OUT_FILENAME = 'output.fountain';

export const CWD = process.cwd();
export const SRC_DIR = path.resolve(CWD, SRC);

export const OUT_DIR = path.resolve(CWD, OUT);
