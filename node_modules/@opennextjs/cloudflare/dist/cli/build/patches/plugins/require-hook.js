import { join } from "node:path";
import { getCrossPlatformPathRegex } from "@opennextjs/aws/utils/regex.js";
export function shimRequireHook(options) {
    return {
        name: "replaceRelative",
        setup(build) {
            // Note: we (empty) shim require-hook modules as they generate problematic code that uses requires
            build.onResolve({ filter: getCrossPlatformPathRegex(String.raw `^\./require-hook$`, { escape: false }) }, () => ({
                path: join(options.outputDir, "cloudflare-templates/shims/empty.js"),
            }));
        },
    };
}
