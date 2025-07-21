import type { QueueMessage } from "@opennextjs/aws/types/overrides";
declare const _default: {
    name: string;
    send: (msg: QueueMessage) => Promise<void>;
};
export default _default;
