import type { ParseArgsConfig } from "node:util";
import type { WranglerTarget } from "./utils/run-wrangler.js";
export type Arguments = ({
    command: "build";
    skipNextBuild: boolean;
    skipWranglerConfigCheck: boolean;
    minify: boolean;
} | {
    command: "preview" | "deploy" | "upload";
    passthroughArgs: string[];
    cacheChunkSize?: number;
} | {
    command: "populateCache";
    target: WranglerTarget;
    environment?: string;
    cacheChunkSize?: number;
}) & {
    outputDir?: string;
};
export declare function getArgs(): Arguments;
export declare function getPassthroughArgs<T extends ParseArgsConfig>(args: string[], { options }: T): string[];
