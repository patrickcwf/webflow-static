import { DEPLOYMENT_MAPPING_ENV_NAME } from "../templates/skew-protection.js";
import { getWranglerEnvironmentFlag, runWrangler } from "../utils/run-wrangler.js";
import { getEnvFromPlatformProxy, quoteShellMeta } from "./helpers.js";
import { populateCache } from "./populate-cache.js";
import { getDeploymentMapping } from "./skew-protection.js";
export async function upload(options, config, uploadOptions) {
    const envVars = await getEnvFromPlatformProxy({
        // TODO: Pass the configPath, update everywhere applicable
        environment: getWranglerEnvironmentFlag(uploadOptions.passthroughArgs),
    });
    const deploymentMapping = await getDeploymentMapping(options, config, envVars);
    await populateCache(options, config, {
        target: "remote",
        environment: getWranglerEnvironmentFlag(uploadOptions.passthroughArgs),
        cacheChunkSize: uploadOptions.cacheChunkSize,
    });
    runWrangler(options, [
        "versions upload",
        ...uploadOptions.passthroughArgs,
        ...(deploymentMapping
            ? [`--var ${DEPLOYMENT_MAPPING_ENV_NAME}:${quoteShellMeta(JSON.stringify(deploymentMapping))}`]
            : []),
    ], { logging: "all" });
}
