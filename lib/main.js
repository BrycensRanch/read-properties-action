import * as core from "@actions/core";
import parser from 'action-input-parser';
import { run } from "./run";
const main = async () => {
    await run({
        file: parser.getInput("file", {
            type: "string",
            required: true
        }),
        property: parser.getInput('property', {
            type: 'string',
            required: false,
            disableable: true
        }),
        all: parser.getInput('all', {
            type: 'boolean',
            default: false,
            disableable: true
        }),
        default: parser.getInput('default', {
            type: 'string',
            required: false,
            disableable: true
        }),
    });
};
main().catch(e => core.setFailed(e instanceof Error ? e : String(e)));
//# sourceMappingURL=main.js.map