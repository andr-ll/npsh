/**
 * @description The bin builder for node.js cli packages.
 * @author Andrii Lytovchenko <andr.lyt.dev@gmail.com>
 * @license MIT
 */

const fs = require('fs');

function buildBin() {
  const methodName = process.argv[2];
  const binPath = './bin';
  const mode = 0777;

  const content = `#!/usr/bin/env node

require('../lib')${methodName == null ? '' : `.${methodName}`};`;

  if (fs.existsSync(binPath)) {
    fs.rmSync(binPath, { recursive: true, force: true });
  }

  fs.mkdirSync(binPath);
  fs.writeFileSync(`${binPath}/index.js`, content, { mode });
}

module.exports = buildBin;