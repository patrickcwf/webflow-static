import type { BuildOptions } from "@opennextjs/aws/build/helper.js";
/**
 * Patches the usage of @vercel/og to be compatible with Cloudflare Workers.
 *
 * @param buildOpts Build options.
 */
export declare function patchVercelOgLibrary(buildOpts: BuildOptions): void;
