const fs = require('fs');
const child_process = require('child_process');
const hooks = require('../lib/hooks');

jest.spyOn(fs, 'writeFileSync').mockImplementation(() => {});
jest.spyOn(fs, 'mkdirSync').mockImplementation(() => {});
jest.spyOn(fs, 'existsSync').mockReturnValue(false);

jest.mock('child_process', () => ({
  exec: (_, callback) => {
    callback(null, { stdout: 'success' });
  },
}));

describe('success', () => {
  it('sets hooks for the project', async () => {
    expect.assertions(1);

    const result = await hooks();

    expect(result).toStrictEqual('Hooks were successfully set up.');
  });
});
