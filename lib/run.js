import * as core from "@actions/core";
import { glob } from 'glob';
import fs from "node:fs";
import { propertiesToJson as propertiesToObject } from 'properties-file';
export const run = async (inputs) => {
    core.debug(`Got back file ${inputs.file}`);
    const propertiesFiles = await glob(inputs.file, { ignore: ["**/node_modules/**", "**/.gradle/**"] });
    core.debug(`Got back propertiesFiles ${propertiesFiles}`);
    if (propertiesFiles.length === 0) {
        throw new Error(`No properties files found with pattern ${inputs.file}`);
    }
    if (propertiesFiles.length > 1) {
        core.warning(`Multiple properties files found, using first one (${propertiesFiles[0]}).`);
    }
    if (!propertiesFiles[0]?.toLowerCase()?.endsWith(".properties")) {
        throw new Error(`File ${propertiesFiles[0]} is not a properties file`);
    }
    if (!propertiesFiles[0]) {
        throw new Error(`File ${propertiesFiles[0]} is undefined/null... This should not happen!`);
    }
    if (!fs.existsSync(propertiesFiles[0])) {
        throw new Error(`File ${propertiesFiles[0]} does not exist... This should not happen!`);
    }
    const propertiesFile = propertiesFiles[0];
    core.debug(`🤔 Using properties file ${propertiesFile}`);
    const properties = propertiesToObject(propertiesFile);
    if (inputs.all) {
        for (const [key, value] of Object.entries(properties)) {
            core.debug(`🧪 Setting output ${key} to ${value}`);
            core.setOutput(key, value);
        }
        core.info(`🚀 Successfully set all properties as outputs`);
        return;
    }
    const property = inputs.property;
    if (!property) {
        throw new Error(`Property is not defined`);
    }
    const value = properties[property];
    if (value) {
        core.debug(`🧪 Setting output ${property} to ${value}`);
        core.setOutput(property, value);
        core.info(`🚀 Successfully set property ${property} as output`);
        return;
    }
    const defaultValue = inputs.default;
    if (defaultValue) {
        core.debug(`🧪 Setting output ${property} to ${defaultValue} (default)`);
        core.setOutput(property, defaultValue);
        core.info(`🚀 Successfully set property ${property} as output`);
        return;
    }
    throw new Error(`Property ${property} not found in properties file`);
};
//# sourceMappingURL=run.js.map