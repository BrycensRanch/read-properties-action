import type { JestConfigWithTsJest } from "ts-jest";

export const coverageThreshold = {
	global: {
		lines: 80,
		statements: 80,
		branches: 70,
		functions: 80,
	},
};

const jestConfig: JestConfigWithTsJest = {
	preset: "ts-jest/presets/js-with-ts-esm",
	testEnvironment: "node",
	resolver: "jest-ts-webcompat-resolver",
	clearMocks: true,
	extensionsToTreatAsEsm: [".ts"],
	moduleFileExtensions: ["js", "ts"],
	collectCoverage: true,
	testMatch: ["**/*.test.ts"],
	moduleNameMapper: {
		"^@/(.*)$": "<rootDir>/src/$1",
	},
	verbose: true,
	transform: {
		// ".(t|j)s$": "babel-jest",
		// '^.+\\.[tj]sx?$' to process js/ts with `ts-jest`
		// '^.+\\.m?[tj]sx?$' to process js/ts/mjs/mts with `ts-jest`
		"^.+\\.m?[tj]sx?$": [
			"ts-jest",
			{
				useESM: true,
			},
		],
	},
};
export default jestConfig;
