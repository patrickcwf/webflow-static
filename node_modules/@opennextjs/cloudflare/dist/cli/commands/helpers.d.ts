import { type GetPlatformProxyOptions } from "wrangler";
export type WorkerEnvVar = Record<keyof CloudflareEnv, string | undefined>;
/**
 * Return the string env vars from the worker.
 *
 * @param options Options to pass to `getPlatformProxy`, i.e. to set the environment
 * @returns the env vars
 */
export declare function getEnvFromPlatformProxy(options: GetPlatformProxyOptions): Promise<WorkerEnvVar>;
/**
 * Escape shell metacharacters.
 *
 * When `spawnSync` is invoked with `shell: true`, metacharacters need to be escaped.
 *
 * Based on https://github.com/ljharb/shell-quote/blob/main/quote.js
 *
 * @param arg
 * @returns escaped arg
 */
export declare function quoteShellMeta(arg: string): string;
