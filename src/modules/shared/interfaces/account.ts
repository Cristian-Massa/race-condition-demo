import type { UUID } from "@src/modules/shared/types/uuid.js"

export interface Account {
    accountId: UUID;
    amount: number;
    version: number;
}