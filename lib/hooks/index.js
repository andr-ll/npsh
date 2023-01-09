/**
 * @description A helper for creating commit hooks.
 * @author Andrii Lytovchenko <andr.lyt.dev@gmail.com>
 * @license MIT
 */

const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const { promisify } = require('util');

const execAsync = promisify(exec);

async function hooks() {
  const hooksPath = './.git/hooks';
  const files = ['pre-commit', 'commit-msg'];

  if (!fs.existsSync(hooksPath)) {
    fs.mkdirSync(hooksPath);
  }

  for (const file of files) {
    const validPath = path.join(__dirname, file);
    const data = fs.readFileSync(validPath, { encoding: 'utf-8' });

    const newFilePath = `${hooksPath}/${file}`;
    fs.writeFileSync(newFilePath, data, { mode: 0o777 });
  }

  return new Promise((resolve, reject) => {
    exec(`git config core.hooksPath '${hooksPath}'`, (error) => {
      if (error != null) {
        reject(error);
      }

      resolve('Hooks were successfully set up.');
    });
  });
}

module.exports = hooks;
