import { CONFIG_FILENAME, CWD } from '../../consts.js';
import readConfig from './readConfig.js';
import resolveConfig from './resolveConfig.js';

export default function getConfig() {
  return resolveConfig(readConfig(CWD, CONFIG_FILENAME));
}
