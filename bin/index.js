#!/usr/bin/env node
import { program } from 'commander';
import bundle from './bundle/index.js';

program
  .name('ffluent')
  .description('CLI to bundle atomic Fountain screenplay files')
  .version('0.1.0');

program
  .command('bundle')
  .alias('b')
  .description('Bundle source files to output directory')
  .action(() => bundle(program));

program.showHelpAfterError(
  '\n[TIP] Append "--help" for additional information'
);
program.parse();
