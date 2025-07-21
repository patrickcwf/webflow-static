interface PurgeOptions {
    type: "durableObject" | "direct";
}
export declare const purgeCache: ({ type }: PurgeOptions) => {
    name: string;
    invalidatePaths(paths: {
        initialPath: string;
        rawPath: string;
        resolvedRoutes: import("@opennextjs/aws/types/open-next").ResolvedRoute[];
    }[]): Promise<void>;
};
export {};
