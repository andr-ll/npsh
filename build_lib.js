#!/usr/bin/env node

const fs = require('fs');

const methodName = process.argv[2];
const libPath = './lib';
const mode = 0777;

const content = `#!/usr/bin/env node

require('../lib')${methodName == null ? '' : `.${methodName}`};`;

if (fs.existsSync(libPath)) {
  fs.rmSync(libPath, { recursive: true, force: true });
}

fs.mkdirSync(libPath);
fs.writeFileSync(`${libPath}/index.js`, content, { mode });
