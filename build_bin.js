#!/usr/bin/env node

const fs = require('fs');

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
