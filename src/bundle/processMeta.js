import { CWD, ERROR_LOCATION_PREFIX, PRIORITY_PREFIX } from './consts.js';

export default function processMeta(meta, dirents) {
  if (!meta) return dirents;

  const sequence = meta?.sequence;
  if (sequence) {
    const priorityDirents = dirents.filter(
      (d) => d.name[0] === PRIORITY_PREFIX
    );

    const sequencedDirents = sequence.map((name) => {
      // TODO: log warning if name starts with reserved character

      const dirent = dirents.find(
        (d) => d.name === (d.isFile() ? name + '.fountain' : name)
      );

      if (!dirent)
        throw new Error(
          `A file was sequenced but doesn't exist, whose filename is "${name}", in a _meta configuration file` +
            ERROR_LOCATION_PREFIX +
            `${CWD}/${dirents[0].path}`
        );
      return dirent;
    });

    return [...priorityDirents, ...sequencedDirents];
  }

  // Fallback
  return dirents;
}
