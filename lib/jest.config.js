export const coverageThreshold = {
    global: {
        lines: 80,
        statements: 80,
        branches: 70,
        functions: 80,
    },
};
const jestConfig = {
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
        "^.+\\.m?[tj]sx?$": [
            "ts-jest",
            {
                useESM: true,
            },
        ],
    },
};
export default jestConfig;
//# sourceMappingURL=jest.config.js.map