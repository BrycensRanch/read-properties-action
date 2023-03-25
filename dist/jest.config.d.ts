import type { JestConfigWithTsJest } from "ts-jest";
export declare const coverageThreshold: {
    global: {
        lines: number;
        statements: number;
        branches: number;
        functions: number;
    };
};
declare const jestConfig: JestConfigWithTsJest;
export default jestConfig;
