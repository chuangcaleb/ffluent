import path from 'path';

const SRC = 'src';
const OUT = 'out';
const CONFIG = 'spillway.json';
export const OUT_FILENAME = 'output.fountain';

export const CWD = process.cwd();
export const SRC_DIR = path.resolve(CWD, SRC);

export const CONFIG_FILEPATH = path.resolve(CWD, CONFIG);

export const OUT_DIR = path.resolve(CWD, OUT);
