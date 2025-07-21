import type { NextModeTagCache } from "@opennextjs/aws/types/overrides.js";
export declare const DEFAULT_WRITE_RETRIES = 3;
export declare const DEFAULT_NUM_SHARDS = 4;
export declare const NAME = "do-sharded-tag-cache";
export declare const DEFAULT_REGION: "enam";
export declare const AVAILABLE_REGIONS: readonly ["enam", "weur", "apac", "sam", "afr", "oc"];
type AllowedDurableObjectRegion = (typeof AVAILABLE_REGIONS)[number];
interface ShardedDOTagCacheOptions {
    /**
     * The number of shards that will be used.
     *
     * 1 shards means 1 durable object instance.
     * Soft (internal next tags used for `revalidatePath`) and hard tags (the one you define in your app)
     * will be split in different shards.
     *
     * The number of requests made to Durable Objects will scale linearly with the number of shards.
     * For example, a request involving 5 tags may access between 1 and 5 shards, with the upper limit being
     * the lesser of the number of tags or the number of shards
     *
     * @default 4
     */
    baseShardSize: number;
    /**
     * Whether to enable a regional cache on a per-shard basis
     * Because of the way tags are implemented in Next.js, some shards will have more requests than others. For these cases, it is recommended to enable the regional cache.
     *
     * @default false
     */
    regionalCache?: boolean;
    /**
     * The TTL for the regional cache in seconds
     * Increasing this value will reduce the number of requests to the Durable Object, but it could make `revalidateTags`/`revalidatePath` call being longer to take effect
     *
     * @default 5
     */
    regionalCacheTtlSec?: number;
    /**
     * Enable shard replication to handle higher load.
     *
     * By default shards are not replicated (`numberOfSoftReplicas = 1` or `numberOfHardReplicas = 1`).
     *
     * Setting the number of replicas to a number greater than 1 will replicate the shards.
     * Write operations always apply to all of the shards.
     * However read operations read from a single shard to spread the load.
     *
     * Soft replicas are for internal next tags used for `revalidatePath` (i.e. `_N_T_/layout`, `_N_T_/page1`).
     * Hard replicas are the tags defined in your app.
     *
     * Soft replicas are accessed more often  than hard replicas, so it is recommended to have more soft replicas
     * than hard replicas (2x is a good rule of thumb)
     */
    shardReplication?: {
        numberOfSoftReplicas: number;
        numberOfHardReplicas: number;
        /**
         * Enable regional replication for the shards.
         *
         * If not set, no regional replication will be performed and durable objects will be created without a location hint
         *
         * Can be used to reduce latency for users in different regions and to spread the load across multiple regions.
         *
         * This will increase the number of durable objects created, as each shard will be replicated in all regions.
         */
        regionalReplication?: {
            defaultRegion: AllowedDurableObjectRegion;
        };
    };
    /**
     * The number of retries to perform when writing tags
     *
     * @default 3
     */
    maxWriteRetries?: number;
}
interface DOIdOptions {
    baseShardId: string;
    numberOfReplicas: number;
    shardType: "soft" | "hard";
    replicaId?: number;
    region?: DurableObjectLocationHint;
}
export declare class DOId {
    options: DOIdOptions;
    shardId: string;
    replicaId: number;
    region?: DurableObjectLocationHint;
    constructor(options: DOIdOptions);
    private generateRandomNumberBetween;
    get key(): string;
}
interface CacheTagKeyOptions {
    doId: DOId;
    tags: string[];
    type: "boolean" | "number";
}
declare class ShardedDOTagCache implements NextModeTagCache {
    private opts;
    readonly mode: "nextMode";
    readonly name = "do-sharded-tag-cache";
    readonly numSoftReplicas: number;
    readonly numHardReplicas: number;
    readonly maxWriteRetries: number;
    readonly enableRegionalReplication: boolean;
    readonly defaultRegion: AllowedDurableObjectRegion;
    localCache?: Cache;
    constructor(opts?: ShardedDOTagCacheOptions);
    private getDurableObjectStub;
    /**
     * Generates a list of DO ids for the shards and replicas
     * @param tags The tags to generate shards for
     * @param shardType Whether to generate shards for soft or hard tags
     * @param generateAllShards Whether to generate all shards or only one
     * @returns An array of TagCacheDOId and tag
     */
    private generateDOIdArray;
    getClosestRegion(): "enam" | "sam" | "weur" | "apac" | "oc" | "afr";
    /**
     * Same tags are guaranteed to be in the same shard
     * @param tags
     * @returns An array of DO ids and tags
     */
    groupTagsByDO({ tags, generateAllReplicas }: {
        tags: string[];
        generateAllReplicas?: boolean;
    }): {
        doId: DOId;
        tags: string[];
    }[];
    private getConfig;
    getLastRevalidated(tags: string[]): Promise<number>;
    /**
     * This function checks if the tags have been revalidated
     * It is never supposed to throw and in case of error, it will return false
     * @param tags
     * @param lastModified default to `Date.now()`
     * @returns
     */
    hasBeenRevalidated(tags: string[], lastModified?: number): Promise<boolean>;
    /**
     * This function writes the tags to the cache
     * Due to the way shards and regional cache are implemented, the regional cache may not be properly invalidated
     * @param tags
     * @returns
     */
    writeTags(tags: string[]): Promise<void>;
    performWriteTagsWithRetry(doId: DOId, tags: string[], lastModified: number, retryNumber?: number): Promise<void>;
    getCacheInstance(): Promise<Cache | undefined>;
    getCacheUrlKey(opts: CacheTagKeyOptions): string;
    getFromRegionalCache(opts: CacheTagKeyOptions): Promise<Response | undefined>;
    putToRegionalCache(optsKey: CacheTagKeyOptions, value: number | boolean): Promise<void>;
    deleteRegionalCache(optsKey: CacheTagKeyOptions): Promise<void>;
}
declare const _default: (opts?: ShardedDOTagCacheOptions) => ShardedDOTagCache;
export default _default;
