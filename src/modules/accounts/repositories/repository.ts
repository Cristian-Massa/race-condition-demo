import { db } from "@src/modules/database/db.js";
import { account } from "@src/modules/accounts/schema/accounts.js";
import { eq, sql } from "drizzle-orm";
import { AccountNotFoundException } from "@src/modules/accounts/exceptions/account-not-found-exception.js";
import type { TransactionType } from "@src/modules/shared/types/accounts.js";

export const accountRepository = () => {
  return {
    findForUpdate: async (accountId: string) => {
      const result = await db
        .select({
          amount: account.amount,
          version: account.version,
        })
        .from(account)
        .where(eq(account.accountId, accountId));

      if (!result[0]) throw new AccountNotFoundException(accountId);
      return result[0];
    },

    updateWithVersion: async (
      accountId: string,
      currentVersion: number,
      data: {
        amount?: number;
        type?: TransactionType;
      },
    ) => {
      const updated = await db
        .update(account)
        .set({
          amount:
            data.type === "deposit"
              ? sql`CASE
                WHEN account.amount + ${data.amount} > 0
                  THEN account.amount + ${data.amount}
                ELSE 0
              END`
              : sql`CASE
                WHEN account.amount - ${data.amount} > 0
                  THEN account.amount - ${data.amount}
                ELSE 0
              END`,
          version: sql`${account.version} + 1`,
        })
        .where(
          eq(account.accountId, accountId) &&
            eq(account.version, currentVersion),
        )
        .returning();

      if (updated.length === 0) throw new AccountNotFoundException(accountId);
      return updated[0];
    },
  };
};
