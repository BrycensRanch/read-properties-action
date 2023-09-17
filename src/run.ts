import * as core from "@actions/core";
// Do not use fast-glob, it's bundle size is double the size of glob
import { readFile } from "fs/promises";
import { glob } from "glob";
import fs from "node:fs";
import { getProperties as propertiesToObject } from "properties-file";

type Inputs = {
	file: string;
	property?: string;
	all?: boolean;
	default?: string;
};

// Kicking ass and taking names

const setSingleValue = (key: string, value: string): void => {
	core.debug(`🧪 Setting output ${key} to ${value}`);
	core.setOutput(key, value);

	// Legacy support for previous GitHub Action
	// Also for our integration tests that were stolen from the other GitHub Action :dab:

	core.setOutput("value", value);
	core.debug(`🧓 Setting legacy output value to ${value} (for backwards compatibility)`);
};

export const run = async (inputs: Inputs): Promise<void> => {
	core.debug(`Got back file ${inputs.file}`);
	const propertiesFiles = await glob(inputs.file, { ignore: ["**/node_modules/**", "**/.gradle/**"] });
	core.debug(`Got back propertiesFiles ${propertiesFiles}`);

	// Basic sanity checks

	if (propertiesFiles.length === 0) throw new Error(`No properties files found with pattern ${inputs.file}`);

	if (propertiesFiles.length > 1)
		core.warning(`Multiple properties files found, using first one (${propertiesFiles[0]}).`);

	if (!propertiesFiles[0]?.toLowerCase()?.endsWith(".properties"))
		throw new Error(`File ${propertiesFiles[0]} is not a properties file`);

	/* istanbul ignore next */
	if (!propertiesFiles[0]) throw new Error(`File ${propertiesFiles[0]} is undefined/null... This should not happen!`);

	/* istanbul ignore next */
	if (!fs.existsSync(propertiesFiles[0]))
		throw new Error(`File ${propertiesFiles[0]} does not exist... This should not happen!`);

	const propertiesFile = propertiesFiles[0];
	core.debug(`🤔 Using properties file ${propertiesFile}`);
	const content = await readFile(propertiesFile, "utf8"),
		// TODO: Make this less ugly because TypeScript loves to be difficult
		properties = propertiesToObject(content);
	if (inputs.all) {
		core.debug("🧪 Got all as true, setting all properties as outputs");
		for (const [key, value] of Object.entries(properties)) {
			core.debug(`🧪 Setting output ${key} to ${value}`);
			core.setOutput(key, value);
		}
		core.info("🚀 Successfully set all properties as outputs");
		return;
	}
	const { property } = inputs;
	if (!property) throw new Error("Property is not defined");

	// Why am I forced to do all of this. Why is life hard. Why
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore Recommended approach for this problem..? https://www.typescriptlang.org/tsconfig#suppressImplicitAnyIndexErrors
	const value = properties[property];

	if (value) {
		core.debug(`🧪 Setting output ${property} to ${value}`);
		setSingleValue(property, value);
		core.info(`🚀 Successfully set property ${property} as output`);
		return;
	}
	const defaultValue = inputs.default;
	if (defaultValue) {
		core.debug(`🧪 Got a default value ${defaultValue} for property ${property} returning that instead`);
		setSingleValue(property, defaultValue);
		core.info(`🚀 Successfully set property ${property} as output`);
		return;
	}
	throw new Error(`Property ${property} not found in properties file`);
};
