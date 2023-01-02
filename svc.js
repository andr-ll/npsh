#!/usr/bin/env node

/**
 * @description Semantic version checker. Verifies if 
 * the branch/PR version in package.json is updated
 * against the last version of desired branch.
 * @author Andrii Lytovchenko <andr.lyt.dev@gmail.com>
 * @license MIT
 */

const https = require('https');
const fs = require('fs');

const args = process.argv.slice(2);

if (args.length < 3) {
  throw new Error('Not enough arguments.')
}

const [user, project, branch] = args;

const packageJson = JSON.parse(fs.readFileSync('./package.json', { encoding: 'utf-8' }));

const updatedVersion = packageJson.version;

const MASTER_PACKAGE_JSON_URL = `https://raw.githubusercontent.com/${user}/${project}/${branch}/package.json`;

const semanticVersions = ['major', 'minor', 'patch'];

https.get(MASTER_PACKAGE_JSON_URL, async (res) => {
  let rawData = '';

  res.on('data', (chunk) => {
    rawData += chunk;
  });

  res.on('end', () => {
    try {
      const { version } = JSON.parse(rawData);

      if (version === updatedVersion) {
        throw new Error('Please update semantic version before merging!');
      }

      const masterVersionArr = version.split('.').map((numb) => Number(numb));
      const updatedVersionArr = updatedVersion
        .split('.')
        .map((numb) => Number(numb));

      for (let i = 0; i < 3; i++) {
        const masterValue = masterVersionArr[i];
        const updatedValue = updatedVersionArr[i];
        const semanticVersion = semanticVersions[i];

        if (updatedValue !== masterValue) {
          if (updatedValue < masterValue) {
            throw new Error(
              `The ${semanticVersion} version must not be less than ${masterValue}.`,
            );
          }

          if (updatedValue !== masterValue + 1) {
            throw new Error(
              `The ${semanticVersion} version must be equal to ${
                masterValue + 1
              }.`,
            );
          } else {
            for (let j = i + 1; j < 3; j++) {
              if (updatedVersionArr[j] !== 0) {
                throw new Error(
                  `The ${semanticVersions[j]} version should be equal to 0 after updating ${semanticVersions[i]} version.`,
                );
              }
            }

            break;
          }
        }
      }

      console.log('Semantic versioning is valid.');
    } catch (e) {
      console.error(e.message);
      process.exit(1);
    }
  });
});
