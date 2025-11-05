import type { Config } from '@jest/types'

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.ts'],
  setupFilesAfterEnv: ['<rootDir>/tests/setupTests.ts'],
  coverageThreshold: {
    global: {
      branches: 60,
      functions: 75,
      lines: 80,
      statements: 80
    }
  }
}

export default config
