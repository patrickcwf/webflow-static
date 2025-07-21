import type { BuildOptions } from "@opennextjs/aws/build/helper.js";
export type WranglerTarget = "local" | "remote";
type WranglerOptions = {
    target?: WranglerTarget;
    environment?: string;
    logging?: "all" | "error";
};
export declare function runWrangler(options: BuildOptions, args: string[], wranglerOpts?: WranglerOptions): void;
export declare function isWranglerTarget(v: string | undefined): v is WranglerTarget;
/**
 * Returns the value of the flag.
 *
 * The value is retrieved for `<argName> value` or `<argName>=value`.
 *
 * @param args List of args
 * @param argName The arg name with leading dashes, i.e. `--env` or `-e`
 * @returns The value or undefined when not found
 */
export declare function getFlagValue(args: string[], ...argNames: string[]): string | undefined;
/**
 * Find the value of the environment flag (`--env` / `-e`) used by Wrangler.
 *
 * @param args - CLI arguments.
 * @returns Value of the environment flag or undefined when not found
 */
export declare function getWranglerEnvironmentFlag(args: string[]): string | undefined;
/**
 * Find the value of the config flag (`--config` / `-c`) used by Wrangler.
 *
 * @param args - CLI arguments.
 * @returns Value of the config flag or undefined when not found
 */
export declare function getWranglerConfigFlag(args: string[]): string | undefined;
export {};
