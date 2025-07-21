import { BuildOptions } from "@opennextjs/aws/build/helper.js";
import type { OpenNextConfig } from "../../api/config.js";
export declare function deploy(options: BuildOptions, config: OpenNextConfig, deployOptions: {
    passthroughArgs: string[];
    cacheChunkSize?: number;
}): Promise<void>;
