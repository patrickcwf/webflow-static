import type { NextConfig } from "@opennextjs/aws/types/next-types";
interface ExtendedNextConfig extends NextConfig {
    experimental: {
        ppr?: boolean;
        taint?: boolean;
        viewTransition?: boolean;
        serverActions?: boolean;
    };
}
export declare function needsExperimentalReact(nextConfig: ExtendedNextConfig): boolean;
export {};
