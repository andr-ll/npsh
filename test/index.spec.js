const consoleSpy = jest.spyOn(console, 'log');

describe('error handling', () => {
  it('throw an error if not valid argument', () => {
    expect.assertions(1);

    process.argv[2] = 'foo-bar';

    try {
      require('../lib');
    } catch (error) {
      expect(error.message).toStrictEqual('Unsupported argument: foo-bar');
    }
  });
});

describe('success', () => {
  it('run the main file', () => {
    process.argv[2] = 'svc';
    process.argv[3] = 'andr-ii';
    process.argv[4] = 'npsh';
    process.argv[5] = 'master';

    jest.spyOn(console, 'log').mockImplementation(() => {});
    jest.spyOn(console, 'error').mockImplementation(() => {});

    require('../lib');
  });
});
