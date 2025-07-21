import type { CodePatcher } from "../codePatcher.js";
export declare const disablePreloadingRule = "\nrule:\n  kind: statement_block\n  inside:\n    kind: if_statement\n    any:\n      - has:\n          kind: member_expression\n          pattern: this.nextConfig.experimental.preloadEntriesOnStart\n          stopBy: end\n      - has:\n          kind: binary_expression\n          pattern: appDocumentPreloading === true\n          stopBy: end\nfix:\n  '{}'\n";
export declare const removeMiddlewareManifestRule = "\nrule:\n  kind: statement_block\n  inside:\n    kind: method_definition\n    has:\n      kind: property_identifier\n      regex: ^getMiddlewareManifest$\nfix:\n  '{return null;}'\n";
/**
 * Swaps the body for a throwing implementation
 *
 * @param methodName The name of the method
 * @returns A rule to replace the body with a `throw`
 */
export declare function createEmptyBodyRule(methodName: string): string;
/**
 * Drops `require("./node-environment-extensions/error-inspect");`
 */
export declare const errorInspectRule = "\nrule:\n  pattern: require(\"./node-environment-extensions/error-inspect\");\nfix: |-\n  // Removed by OpenNext\n  // require(\"./node-environment-extensions/error-inspect\");\n";
export declare const patchNextServer: CodePatcher;
