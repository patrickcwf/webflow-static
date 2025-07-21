import { error } from "@opennextjs/aws/adapters/logger.js";
import { getCloudflareContext } from "../../cloudflare-context.js";
import { debugCache, FALLBACK_BUILD_ID, purgeCacheByTags } from "../internal.js";
export const NAME = "d1-next-mode-tag-cache";
export const BINDING_NAME = "NEXT_TAG_CACHE_D1";
export class D1NextModeTagCache {
    mode = "nextMode";
    name = NAME;
    async getLastRevalidated(tags) {
        const { isDisabled, db } = this.getConfig();
        if (isDisabled)
            return 0;
        try {
            const result = await db
                .prepare(`SELECT MAX(revalidatedAt) AS time FROM revalidations WHERE tag IN (${tags.map(() => "?").join(", ")})`)
                .run();
            if (result.results.length === 0)
                return 0;
            // We only care about the most recent revalidation
            return (result.results[0]?.time ?? 0);
        }
        catch (e) {
            error(e);
            // By default we don't want to crash here, so we return false
            // We still log the error though so we can debug it
            return 0;
        }
    }
    async hasBeenRevalidated(tags, lastModified) {
        const { isDisabled, db } = this.getConfig();
        if (isDisabled)
            return false;
        try {
            const result = await db
                .prepare(`SELECT 1 FROM revalidations WHERE tag IN (${tags.map(() => "?").join(", ")}) AND revalidatedAt > ? LIMIT 1`)
                .bind(...tags.map((tag) => this.getCacheKey(tag)), lastModified ?? Date.now())
                .raw();
            return result.length > 0;
        }
        catch (e) {
            error(e);
            // By default we don't want to crash here, so we return false
            // We still log the error though so we can debug it
            return false;
        }
    }
    async writeTags(tags) {
        const { isDisabled, db } = this.getConfig();
        // TODO: Remove `tags.length === 0` when https://github.com/opennextjs/opennextjs-aws/pull/828 is used
        if (isDisabled || tags.length === 0)
            return Promise.resolve();
        await db.batch(tags.map((tag) => db
            .prepare(`INSERT INTO revalidations (tag, revalidatedAt) VALUES (?, ?)`)
            .bind(this.getCacheKey(tag), Date.now())));
        await purgeCacheByTags(tags);
    }
    getConfig() {
        const db = getCloudflareContext().env[BINDING_NAME];
        if (!db)
            debugCache("No D1 database found");
        const isDisabled = !!globalThis.openNextConfig
            .dangerous?.disableTagCache;
        return !db || isDisabled
            ? { isDisabled: true }
            : {
                isDisabled: false,
                db,
            };
    }
    getCacheKey(key) {
        return `${this.getBuildId()}/${key}`.replaceAll("//", "/");
    }
    getBuildId() {
        return process.env.NEXT_BUILD_ID ?? FALLBACK_BUILD_ID;
    }
}
export default new D1NextModeTagCache();
