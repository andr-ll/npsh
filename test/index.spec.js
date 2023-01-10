jest.spyOn(console, 'log').mockImplementation(() => {});
jest.spyOn(process, 'exit').mockImplementation(() => {});

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

  it('throw an error if script fails', () => {
    process.argv[2] = 'svc';

    require('../lib');
  });
});

describe('success', () => {
  it('run the main file', () => {
    process.argv[2] = 'svc';
    process.argv[3] = 'andr-ii';
    process.argv[4] = 'npsh';
    process.argv[5] = 'master';

    require('../lib');
  });
});
