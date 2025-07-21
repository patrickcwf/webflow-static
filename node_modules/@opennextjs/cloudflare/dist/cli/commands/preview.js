import { getWranglerEnvironmentFlag, runWrangler } from "../utils/run-wrangler.js";
import { populateCache } from "./populate-cache.js";
export async function preview(options, config, previewOptions) {
    await populateCache(options, config, {
        target: "local",
        environment: getWranglerEnvironmentFlag(previewOptions.passthroughArgs),
        cacheChunkSize: previewOptions.cacheChunkSize,
    });
    runWrangler(options, ["dev", ...previewOptions.passthroughArgs], { logging: "all" });
}
