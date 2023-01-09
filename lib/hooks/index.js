/**
 * @description A helper for creating commit hooks.
 * @author Andrii Lytovchenko <andr.lyt.dev@gmail.com>
 * @license MIT
 */

const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

function hooks() {
  const hooksPath = './.git/hooks';
  const files = ['pre-commit', 'commit-msg'];

  for (const file of files) {
    const validPath = path.join(__dirname, file);
    const data = fs.readFileSync(validPath, { encoding: 'utf-8' });

    const newFilePath = `${hooksPath}/${file}`;
    fs.writeFileSync(newFilePath, data, { mode: 0o777 });
  }

  exec(`git config core.hooksPath '${hooksPath}'`, (err) => {
    if (err != null) {
      console.log(`Could not setup hooks directory: ${err.message}`);
      process.exit(1);
    }
  });
}

module.exports = hooks;
