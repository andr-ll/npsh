#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const hooksPath = './.git/hooks';
const gitSetHooks = `git config core.hooksPath '${hooksPath}'`;
const files = ['pre-commit', 'commit-msg'];

for (const file of files) {
  const validPath = path.join(__dirname, file);
  const data = fs.readFileSync(validPath, { encoding: 'utf-8' });
  fs.writeFileSync(`${hooksPath}/${file}`, data);
}

exec(getSetHooks, (err) => {
  if (err != null) {
    console.log(`Could not setup hooks directory: ${err.message}`);
  }
});
