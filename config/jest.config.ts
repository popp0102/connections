import type { Config } from '@jest/types';
import path from 'path';

const config: Config.InitialOptions = {
  roots: [path.resolve(__dirname, '../tests')],
  rootDir: path.resolve(__dirname, '../'),
  testEnvironment: 'jsdom',
  testMatch: ["<rootDir>/tests/**/*.test.(tsx|ts)"],
  transform: {
    '^.+\\.tsx?$': ['ts-jest', {
      tsconfig: path.resolve(__dirname, './tsconfig.json'),
    }],
  },
  setupFilesAfterEnv: [path.resolve(__dirname, '../tests/jest.setup.ts')],
  moduleNameMapper: {
    '^.+\\.(css|less)$': '<rootDir>/tests/__mocks__/CSS_Stub.ts',
    '^@lib/(.*)$': '<rootDir>/lib/$1',
    '^@util/(.*)$': '<rootDir>/lib/util/$1',
    '^@components/(.*)$': '<rootDir>/lib/components/$1',
    '^@hooks/(.*)$': '<rootDir>/lib/hooks/$1'
  },
};
export default config;

