import type { BuildOptions } from "@opennextjs/aws/build/helper.js";
import type { OpenNextConfig } from "@opennextjs/aws/types/open-next.js";
import type { WranglerTarget } from "../utils/run-wrangler.js";
export type CacheAsset = {
    isFetch: boolean;
    fullPath: string;
    key: string;
    buildId: string;
};
export declare function getCacheAssets(opts: BuildOptions): CacheAsset[];
export declare function populateCache(options: BuildOptions, config: OpenNextConfig, populateCacheOptions: {
    target: WranglerTarget;
    environment?: string;
    cacheChunkSize?: number;
}): Promise<void>;
