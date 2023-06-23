import chalk from 'chalk';
import fs from 'fs';
import path from 'path';

export default async function writeOutput(filepath, content) {
  // mkdir if not exists
  const { dir } = path.parse(filepath);

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  // write
  fs.writeFileSync(filepath, content);
  console.log(
    `${chalk.bgGreen(' SUC ')} ${chalk.green(
      'Successfully bundled!' + '\n... @ ' + filepath
    )}`
  );
}
