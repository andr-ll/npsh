#!/usr/bin/env node

/**
 * @description A helper for creating commit hooks.
 * @author Andrii Lytovchenko <andr.lyt.dev@gmail.com>
 * @license MIT
 */

const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const hooksPath = './.git/hooks';
const gitSetHooks = `git config core.hooksPath '${hooksPath}'`;
const files = ['pre-commit', 'commit-msg'];
const mode = 0777;

for (const file of files) {
  const validPath = path.join(__dirname, file);
  const data = fs.readFileSync(validPath, { encoding: 'utf-8' });
  const newFilePath = `${hooksPath}/${file}`;
  fs.writeFileSync(newFilePath, data, { mode });
}

exec(gitSetHooks, (err) => {
  if (err != null) {
    console.log(`Could not setup hooks directory: ${err.message}`);
  }
});
