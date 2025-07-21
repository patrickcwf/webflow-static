/**
 * Misc patches for `next-server.js`
 *
 * Note: we will probably need to revisit the patches when the Next adapter API lands
 *
 * - Inline `getBuildId` as it relies on `readFileSync` that is not supported by workerd
 * - Override the cache and composable cache handlers
 */
import { type BuildOptions } from "@opennextjs/aws/build/helper.js";
import type { ContentUpdater, Plugin } from "@opennextjs/aws/plugins/content-updater.js";
export declare function patchNextServer(updater: ContentUpdater, buildOpts: BuildOptions): Plugin;
export declare const buildIdRule = "\nrule:\n  pattern:\n    selector: method_definition\n    context: \"class { getBuildId($$$PARAMS) { $$$_ } }\"\nfix: |-\n  getBuildId($$$PARAMS) {\n    return process.env.NEXT_BUILD_ID;\n  }\n";
/**
 * The cache handler used by Next.js is normally defined in the config file as a path. At runtime,
 * Next.js would then do a dynamic require on a transformed version of the path to retrieve the
 * cache handler and create a new instance of it.
 *
 * This is problematic in workerd due to the dynamic import of the file that is not known from
 * build-time. Therefore, we have to manually override the default way that the cache handler is
 * instantiated with a dynamic require that uses a string literal for the path.
 */
export declare function createCacheHandlerRule(handlerPath: string): string;
export declare function createComposableCacheHandlersRule(handlerPath: string): string;
