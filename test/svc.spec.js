const svc = require('../lib/svc');
const https = require('https');
const fs = require('fs');

const fsSpy = jest.spyOn(fs, 'readFileSync');

const getVersion = new Promise((resolve) => {
  const url = `https://raw.githubusercontent.com/andr-ii/npsh/master/package.json`;
  let data = '';
  https.get(url, (res) => {
    res.on('data', (chunk) => {
      data += chunk;
    });

    res.on('end', () => {
      resolve(JSON.parse(data).version);
    });
  });
});

beforeEach(() => {
  process.argv[3] = 'andr-ii';
  process.argv[4] = 'npsh';
  process.argv[5] = 'master';
});

describe('error handling', () => {
  it('throws an error if not enough arguments', async () => {
    expect.assertions(1);

    try {
      process.argv.splice(3);

      await svc();
    } catch (error) {
      expect(error).toStrictEqual('svc failed: not enough arguments.');
    }
  });

  it('throws an error if arguments contain not existing user/repo/branch', async () => {
    expect.assertions(1);

    try {
      process.argv[4] = 'not-existing-repo';

      await svc();
    } catch (error) {
      expect(error).toStrictEqual(
        'Request has failed with status - 404: Not Found.',
      );
    }
  });

  it('throws an error if semantic version was not updated', async () => {
    expect.assertions(1);

    try {
      const version = await getVersion;

      fsSpy.mockImplementationOnce(() => {
        return JSON.stringify({ version });
      });

      await svc();
    } catch (error) {
      expect(error).toStrictEqual(
        'Please update semantic version before merging!',
      );
    }
  });

  it('throws an error if semantic version has smaller number', async () => {
    expect.assertions(1);

    const version = await getVersion;
    const [major, minor, patch] = version.split('.');
    try {
      fsSpy.mockImplementationOnce(() => {
        return `{"version":"${[major, minor, Number(patch) - 1].join('.')}"}`;
      });

      await svc();
    } catch (error) {
      expect(error).toStrictEqual(
        `Patch version should be equal to ${+patch + 1}.`,
      );
    }
  });

  it('throws an error if semantic version contains not a number', async () => {
    expect.assertions(1);

    const version = await getVersion;
    try {
      fsSpy.mockImplementationOnce(() => {
        const [major, minor] = version.split('.');
        return `{"version":"${[major, minor, 'foo'].join('.')}"}`;
      });

      await svc();
    } catch (error) {
      expect(error).toStrictEqual(
        `Semantic version contains not a number: "foo".`,
      );
    }
  });

  it('throws an error if semantic version is more than +1', async () => {
    expect.assertions(1);

    const version = await getVersion;
    const [major, minor, patch] = version.split('.');
    try {
      fsSpy.mockImplementationOnce(() => {
        return `{"version":"${[major, minor + 3, patch].join('.')}"}`;
      });

      await svc();
    } catch (error) {
      expect(error).toStrictEqual(
        `Minor version should be equal to ${minor} or ${+minor + 1}.`,
      );
    }
  });

  it('throws an error if after updating minor/major version 0 were not set', async () => {
    expect.assertions(1);

    const version = await getVersion;
    const [major, minor, patch] = version.split('.');
    try {
      fsSpy.mockImplementationOnce(() => {
        return `{"version":"${[
          major,
          Number(minor) + 1,
          Number(patch) + 3,
        ].join('.')}"}`;
      });

      await svc();
    } catch (error) {
      expect(error).toStrictEqual(`Patch version should be equal to 0.`);
    }
  });

  it('throws an error if major semantic version is not valid', async () => {
    expect.assertions(1);

    const version = await getVersion;
    const [major, minor, patch] = version.split('.');
    try {
      fsSpy.mockImplementationOnce(() => {
        return `{"version":"${[major + 2, minor, patch].join('.')}"}`;
      });

      await svc();
    } catch (error) {
      expect(error).toStrictEqual(
        `Major version should be equal to ${major} or ${+major + 1}.`,
      );
    }
  });
});

describe('success', () => {
  it('checks semantic version of a package', async () => {
    expect.assertions(1);

    const version = await getVersion;

    fsSpy.mockImplementationOnce(() => {
      const [major, minor, patch] = version.split('.');
      return `{"version":"${[major, minor, Number(patch) + 1].join('.')}"}`;
    });

    const result = await svc();

    expect(result).toStrictEqual('Semantic versioning is valid.');
  });
});
