import type { getManifests } from "../copyTracedFiles.js";
import * as buildHelper from "../helper.js";
type Versions = `>=${number}.${number}.${number} <=${number}.${number}.${number}` | `>=${number}.${number}.${number}` | `<=${number}.${number}.${number}`;
export interface VersionedField<T> {
    /**
     * The versions of Next.js that this field should be used for
     * Should be in the format `">=16.0.0 <=17.0.0"` or `">=16.0.0"` or `"<=17.0.0"`
     * **Be careful with spaces**
     */
    versions?: Versions;
    field: T;
}
export type PatchCodeFn = (args: {
    /**
     * The code of the file that needs to be patched
     */
    code: string;
    /**
     * The final path of the file that needs to be patched
     */
    filePath: string;
    /**
     * All files that are traced and will be included in the bundle
     */
    tracedFiles: string[];
    /**
     * Next.js manifests that are used by Next at runtime
     */
    manifests: ReturnType<typeof getManifests>;
}) => Promise<string>;
interface IndividualPatch {
    pathFilter: RegExp;
    contentFilter?: RegExp;
    patchCode: PatchCodeFn;
}
export interface CodePatcher {
    name: string;
    patches: IndividualPatch | VersionedField<IndividualPatch>[];
}
export declare function parseVersions(versions?: Versions): {
    before?: string;
    after?: string;
};
export declare function extractVersionedField<T>(fields: VersionedField<T>[], version: string): T[];
export declare function applyCodePatches(buildOptions: buildHelper.BuildOptions, tracedFiles: string[], manifests: ReturnType<typeof getManifests>, codePatcher: CodePatcher[]): Promise<void>;
export {};
