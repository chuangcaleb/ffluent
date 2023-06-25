import chalk from 'chalk';
import { ERROR_LOCATION_PREFIX, PRIORITY_PREFIX } from './consts.js';

export default function processMeta(metaContent, dirents, metaPath) {
  /*
   * Organize by configured sequence
   */
  const sequence = metaContent?.sequence;
  if (sequence) {
    // const configFilepath = path.resolve(CWD, directory);
    const priorityDirents = dirents.filter(
      (d) => d.name[0] === PRIORITY_PREFIX
    );

    const sequencedDirents = sequence.map((name) => {
      if (name[0] === PRIORITY_PREFIX)
        console.log(
          chalk.yellow(
            `Warning: "${name}" was configured in a _meta file's sequence. Filenames prefixed with a "${PRIORITY_PREFIX}" character are automatically sequenced earlier.\nConsider removing this line of configuration if this was your intention.` +
              ERROR_LOCATION_PREFIX +
              metaPath
          )
        );

      const dirent = dirents.find(
        (d) => d.name === (d.isFile() ? name + '.fountain' : name)
      );

      if (!dirent)
        throw new Error(
          `A file was sequenced but doesn't exist, whose filename is "${name}", in a _meta configuration file` +
            ERROR_LOCATION_PREFIX +
            metaPath
        );
      return dirent;
    });

    return [...priorityDirents, ...sequencedDirents];
  }

  // Fallback
  return dirents;
}
