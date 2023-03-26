import { run } from "../src/run";
test("run successfully", async () => {
    await expect(run({ file: "tests/fixtures/gradle.properties", property: "version" })).resolves.toBeUndefined();
});
test("action rejects on unknown file", async () => {
    await expect(run({ file: "amongus.properties", property: "version" })).rejects.toThrow();
});
test("action rejects on no file at all", async () => {
    await expect(run({ file: undefined, property: "version" })).rejects.toThrow();
});
test("action defaults work", async () => {
    await expect(run({ file: "**/*.properties", property: "version", default: "1.0.0" })).resolves.toBeUndefined();
});
test("action outputs all properties", async () => {
    await expect(run({ file: "**/*.properties*", all: true, default: "1.2.0" })).resolves.toBeUndefined();
});
test("action rejects on no property", async () => {
    await expect(run({ file: "**/*.properties*", default: "1.2.0" })).rejects.toThrow();
});
test("action rejects on invalid file type", async () => {
    await expect(run({ file: "tests/fixtures/thanos.json", all: true })).rejects.toThrow();
});
test("action rejects on invalid property", async () => {
    await expect(run({ file: "tests/fixtures/trash.properties", property: "good" })).rejects.toThrow();
});
//# sourceMappingURL=run.test.js.map