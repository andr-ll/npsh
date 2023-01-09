#!/usr/bin/env node

/**
 * @description The main executable file of `npsh` library.
 * @author Andrii Lytovchenko <andr.lyt.dev@gmail.com>
 * @license MIT
 */

const svc = require('./svc.js');
const buildBin = require('./buildBin.js');
const hooks = require('./hooks');

const scripts = {
  svc,
  hooks,
  bin: buildBin,
};

const key = process.argv[2];
const script = scripts[key];

if (script == null) {
  throw new Error(`Unsupported argument: ${key}`);
}

script();
