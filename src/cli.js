#!/usr/bin/env node
import chalk from 'chalk';
import { program } from 'commander';
import bundle from './bundle/index.js';

// Utility to use .catch chain for error handling; promises unsupported for program.error
// export function actionRunner(fn: (...args) => Promise<any>) {
function functionAsChain(fn) {
  return (...args) => fn(...args).catch((err) => program.error(err));
}

export default function cli(process) {
  program
    .name('ffluent')
    .description(chalk.bold('CLI to bundle atomic Fountain screenplay files'))
    .version('0.1.0', '-v, --version')
    .exitOverride(() => null);

  program.action(program.help);

  program
    .command('bundle')
    .alias('b')
    .description('Bundle source files to output directory')
    .action(functionAsChain(() => bundle(program)));

  program.configureOutput({
    outputError: (str, write) =>
      write(`${chalk.bgRed(' ERR ')} ${chalk.red(str)}`),
  });

  // Help not needed
  // program.showHelpAfterError(
  //   '\n' +
  //     chalk.bgBlue(' TIP ') +
  //     chalk.blue(' Append "--help" for additional information\n')
  // );

  program.parse(process.argv);

  // This template doesn't work because we're returning promises
  // https://github.com/tj/commander.js/issues/782
  // try {
  //   program.parse();
  // } catch (e) {
  //   program.error(e);
  // }
}
