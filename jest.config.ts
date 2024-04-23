export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  modulePaths: ['<rootDir>'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@assets(.*)$': '<rootDir>/src/assets$1',
    '^@utils(.*)$': '<rootDir>/src/utils$1',
    '^@literals$': '<rootDir>/src/assets/strings/literals.json',
  },
};
