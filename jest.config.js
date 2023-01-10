module.exports = {
  clearMocks: true,
  forceExit: true,
  coveragePathIgnorePatterns: ['/node_modules/', '/.github/'],
  coverageProvider: 'v8',
  coverageReporters: ['text', 'lcov'],
  coverageThreshold: {
    global: {
      branches: 99,
      functions: 99,
      lines: 99,
      statements: 99,
    },
  },
  collectCoverageFrom: ['./lib/**'],
  testMatch: ['**/?(*.)+(spec|test).[tj]s?(x)'],
  verbose: true,
};
