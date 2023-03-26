import * as core from "@actions/core";
import { getInput } from "action-input-parser";

import { run } from "./run";

const start = Date.now(),
	main = async (): Promise<void> => {
		core.debug("⌛ Starting...");
		await run({
			file: getInput("file", {
				type: "string",
				required: true,
			}) as string,
			property: getInput("property", {
				type: "string",
				required: false,
				disableable: true,
			}) as string,
			all: getInput("all", {
				type: "boolean",
				default: false,
				disableable: true,
			}) as boolean,
			default: getInput("default", {
				type: "string",
				required: false,
				disableable: true,
			}) as string,
		});
		core.debug(`⌛ Ran in ${Date.now() - start}ms`);
	};

main().catch(e => {
	core.setFailed(e instanceof Error ? e : String(e));
	core.debug(`⌛ Ran in ${Date.now() - start}ms`);
});
