import { CWD, ERROR_LOCATION_PREFIX } from './consts.js';

export default function processMeta(meta, dirents) {
  if (!meta) return dirents;

  const sequence = meta?.sequence;
  if (sequence) {
    const sequencedDirents = sequence.map((filename) => {
      const fullFilename = filename + '.fountain';
      const dirent = dirents.find((d) => d.name === fullFilename);
      if (!dirent)
        throw new Error(
          `A file was sequenced but doesn't exist, whose filename is "${filename}", in a _meta configuration file` +
            ERROR_LOCATION_PREFIX +
            `${CWD}/${dirents[0].path}`
        );
      return dirent;
    });

    return sequencedDirents;
  }

  return dirents;
}
