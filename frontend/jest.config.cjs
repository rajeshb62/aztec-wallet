module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/setupTests.ts'],
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', {
      tsconfig: 'tsconfig.json',
    }],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
    '^@aztec/accounts/schnorr$': '<rootDir>/__mocks__/aztecAccountsMock.js'
  },
  testMatch: ['<rootDir>/src/test/SimpleTest.test.tsx'], // This line specifies which test file to run
};