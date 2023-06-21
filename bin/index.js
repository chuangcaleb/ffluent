#!/usr/bin/env node
import chalk from 'chalk';
import { program } from 'commander';
import bundle from '../src/bundle/index.js';

program
  .name('ffluent')
  .description(chalk.bold('CLI to bundle atomic Fountain screenplay files'))
  .version('0.1.0', '-v, --version');

program
  .command('bundle')
  .alias('b')
  .description('Bundle source files to output directory')
  .action(() => bundle(program));

program.showHelpAfterError(
  '\n' +
    chalk.bgBlue(' TIP ') +
    chalk.blue(' Append "--help" for additional information\n')
);
program.parse();
