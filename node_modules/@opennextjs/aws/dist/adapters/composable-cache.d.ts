import type { ComposableCacheEntry } from "../types/cache";
declare const _default: {
    get(cacheKey: string): Promise<{
        value: import("stream/web").ReadableStream<any>;
        tags: string[];
        stale: number;
        timestamp: number;
        expire: number;
        revalidate: number;
    } | undefined>;
    set(cacheKey: string, pendingEntry: Promise<ComposableCacheEntry>): Promise<void>;
    refreshTags(): Promise<void>;
    getExpiration(...tags: string[]): Promise<number>;
    expireTags(...tags: string[]): Promise<void>;
    receiveExpiredTags(...tags: string[]): Promise<void>;
};
export default _default;
