const fs = require('fs');
const buildBin = require('../lib/buildBin');

jest.spyOn(fs, 'writeFileSync').mockImplementation(() => {});
jest.spyOn(fs, 'mkdirSync').mockImplementation(() => {});
jest.spyOn(fs, 'rmSync').mockImplementation(() => {});
jest.spyOn(fs, 'existsSync').mockReturnValue(true);

describe('success', () => {
  it('creates valid "bin" directory', async () => {
    expect.assertions(1);

    const result = await buildBin();

    expect(result).toStrictEqual('The "bin" directory has been created.');
  });

  it('creates valid "bin" directory with valid method', async () => {
    expect.assertions(1);

    process.argv[3] = 'myFunc()';
    const result = await buildBin();

    expect(result).toStrictEqual('The "bin" directory has been created.');
  });
});
