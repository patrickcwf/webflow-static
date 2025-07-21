/**
 * Removed unused `require.resolve` calls in Open Next.
 */
import { type BuildOptions } from "@opennextjs/aws/build/helper.js";
import type { ContentUpdater, Plugin } from "@opennextjs/aws/plugins/content-updater.js";
export declare function patchResolveCache(updater: ContentUpdater, buildOpts: BuildOptions): Plugin;
export declare const cacheHandlerRule = "\nrule:\n  pattern: var cacheHandlerPath = __require.resolve(\"./cache.cjs\");\nfix: |-\n  var cacheHandlerPath = \"\";\n";
export declare const compositeCacheHandlerRule = "\nrule:\n  pattern: var composableCacheHandlerPath = __require.resolve(\"./composable-cache.cjs\");\nfix: |-\n  var composableCacheHandlerPath = \"\";\n";
