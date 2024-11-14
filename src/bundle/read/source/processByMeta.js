import chalk from 'chalk';
import { PRIORITY_PREFIX } from '../../consts.js';
import { composeLocation } from '../../utils.js';

export default function processByMeta({ config, path }, dirents) {
  /*
   * Organize by configured sequence
   */
  const sequence = config?.sequence;
  if (sequence) {
    // const configFilepath = path.resolve(CWD, directory);
    const priorityDirents = dirents.filter(
      (d) => d.name[0] === PRIORITY_PREFIX
    );

    const sequencedDirents = sequence.map((name) => {
      if (name[0] === PRIORITY_PREFIX)
        console.log(
          chalk.yellow(
            `Warning: "${name}" was configured in a _meta file's sequence. Filenames prefixed with a "${PRIORITY_PREFIX}" character are automatically sequenced earlier.\nConsider removing this line of configuration if this was your intention.${composeLocation(
              path
            )}\n`
          )
        );

      const dirent = dirents.find(
        (d) => d.name === (d.isFile() ? name + '.fountain' : name)
      );

      if (!dirent)
        throw new Error(
          `"${name}" was sequenced in a "_meta" configuration file, but it does not exist in that _meta's folder` +
            composeLocation(path)
        );
      return dirent;
    });

    return [...priorityDirents, ...sequencedDirents];
  }

  // Fallback
  return dirents;
}
