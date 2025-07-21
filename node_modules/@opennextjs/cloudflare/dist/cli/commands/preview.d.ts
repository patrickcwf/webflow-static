import { BuildOptions } from "@opennextjs/aws/build/helper.js";
import type { OpenNextConfig } from "../../api/config.js";
export declare function preview(options: BuildOptions, config: OpenNextConfig, previewOptions: {
    passthroughArgs: string[];
    cacheChunkSize?: number;
}): Promise<void>;
