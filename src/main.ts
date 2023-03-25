import * as core from "@actions/core";
import parser from "action-input-parser";

import { run } from "./run";

const main = async (): Promise<void> => {
	await run({
		file: parser.getInput("file", {
			type: "string",
			required: true,
		}) as string,
		property: parser.getInput("property", {
			type: "string",
			required: false,
			disableable: true,
		}) as string,
		all: parser.getInput("all", {
			type: "boolean",
			default: false,
			disableable: true,
		}) as boolean,
		default: parser.getInput("default", {
			type: "string",
			required: false,
			disableable: true,
		}) as string,
	});
};

main().catch(e => core.setFailed(e instanceof Error ? e : String(e)));
