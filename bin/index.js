#!/usr/bin/env node
import { program } from 'commander';
import build from './build/index.js';

program
  .name('spillway')
  .description('CLI to transpile atomic Fountain screenplay files')
  .version('0.1.0');

program
  .command('build')
  .alias('b')
  .description('Transpile source files to output directory')
  .action(build);

program.parse(process.argv);
