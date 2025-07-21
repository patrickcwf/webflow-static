import { BuildOptions } from "@opennextjs/aws/build/helper.js";
import type { OpenNextConfig } from "../../api/config.js";
export declare function upload(options: BuildOptions, config: OpenNextConfig, uploadOptions: {
    passthroughArgs: string[];
    cacheChunkSize?: number;
}): Promise<void>;
