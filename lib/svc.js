/**
 * @description Semantic version checker. Verifies if
 * the branch/PR version in package.json is updated
 * against the last version of desired branch.
 * @author Andrii Lytovchenko <andr.lyt.dev@gmail.com>
 * @license MIT
 */

const https = require('https');
const fs = require('fs');
const { nuti } = require('nuti');

async function svc() {
  const args = process.argv.slice(3);

  if (args.length < 3) {
    throw 'svc failed: not enough arguments.';
  }

  const [user, project, branch] = args;

  const gitHubHost = 'raw.githubusercontent.com';
  const url = `https://${gitHubHost}/${user}/${project}/${branch}/package.json`;

  const packageJson = fs.readFileSync('./package.json', { encoding: 'utf-8' });
  const { version: updatedVersion } = JSON.parse(packageJson);

  const { body, ok, status } = await nuti.http.get(url);

  if (!ok) {
    throw `Request has failed with status - ${body}.`;
  }

  const json = JSON.parse(body);

  nuti.validate(json, { version: 'string' });
  const { version } = json;

  if (version === updatedVersion) {
    throw 'Please update semantic version before merging!';
  }

  const [major, minor, patch] = versionToNumbers(version);

  const validVersions = {
    [major + 1]: {
      0: 0,
    },
    [major]: {
      [minor + 1]: 0,
      [minor]: patch + 1,
    },
  };

  const [newMajor, newMinor, newPatch] = versionToNumbers(updatedVersion);

  const validMinor = validVersions[newMajor];

  if (validMinor == null) {
    throw generateMessage('Major', Object.keys(validVersions));
  }

  const validPatch = validMinor[newMinor];

  if (validPatch == null) {
    throw generateMessage('Minor', Object.keys(validMinor));
  }

  if (validPatch !== newPatch) {
    throw generateMessage('Patch', [validPatch]);
  }

  return 'Semantic versioning is valid.';
}

function versionToNumbers(version) {
  return version.split('.').map((value) => {
    const numb = Number(value);

    if (Number.isNaN(numb)) {
      throw `Semantic version contains not a number: "${value}".`;
    }

    return numb;
  });
}

function generateMessage(semver, versions) {
  return `${semver} version should be equal to ${versions.join(' or ')}.`;
}

module.exports = svc;
