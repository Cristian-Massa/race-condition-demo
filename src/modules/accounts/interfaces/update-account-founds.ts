import type { TransactionType } from "@src/modules/shared/types/accounts.js";

export interface UpdateAccountFoundsProps {
  accountId: string;
  amount: number;
  type: TransactionType;
}
