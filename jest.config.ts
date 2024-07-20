import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  preset: "ts-jest",
  testEnvironment: "node",
  roots: ["<rootDir>/tests"],
  testMatch: ["**/?(*.)+(spec|test).[tj]s?(x)"],
  collectCoverage: true,
  collectCoverageFrom: ["<rootDir>/src/**/*.{js,ts}"],
  coverageDirectory: "coverage",
  coverageReporters: ["text", "lcov"],
};

export default config;
