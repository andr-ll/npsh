const fs = require('fs');
const child_process = require('child_process');
const hooks = require('../lib/hooks');

jest.spyOn(fs, 'writeFileSync').mockImplementation(() => {});
jest.spyOn(fs, 'mkdirSync').mockImplementation(() => {});
jest.spyOn(fs, 'existsSync').mockReturnValue(false);

jest.mock('child_process', () => ({
  exec: (_, callback) => {
    callback(new Error('some-error'), {});
  },
}));

describe('error handling', () => {
  it('throws an error if exec throws an error', async () => {
    expect.assertions(1);
    try {
      await hooks();
    } catch (error) {
      expect(error.message).toStrictEqual('some-error');
    }
  });
});
