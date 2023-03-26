import * as core from "@actions/core";
import { getInput } from "action-input-parser";
import { run } from "./run";
const start = Date.now(), main = async () => {
    core.debug("⌛ Starting...");
    await run({
        file: getInput("file", {
            type: "string",
            required: true,
        }),
        property: getInput("property", {
            type: "string",
            required: false,
            disableable: true,
        }),
        all: getInput("all", {
            type: "boolean",
            default: false,
            disableable: true,
        }),
        default: getInput("default", {
            type: "string",
            required: false,
            disableable: true,
        }),
    });
    core.debug(`⌛ Ran in ${Date.now() - start}ms`);
};
main().catch(e => {
    core.setFailed(e instanceof Error ? e : String(e));
    core.debug(`⌛ Ran in ${Date.now() - start}ms`);
});
//# sourceMappingURL=main.js.map