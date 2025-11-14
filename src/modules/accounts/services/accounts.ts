import { retry } from "@src/modules/shared/utils/retry.js";
import type { UpdateAccountFoundsProps } from "@src/modules/accounts/interfaces/update-account-founds.js";
import { accountRepository } from "@src/modules/accounts/repositories/repository.js";
import type { AccountGet } from "@src/modules/accounts/schema/accounts.js";
import { AccountNotFoundException } from "@src/modules/accounts/exceptions/account-not-found-exception.js";
export const updateAccountFounds = async ({
  accountId,
  ...rest
}: UpdateAccountFoundsProps): Promise<AccountGet> => {
  const repository = accountRepository();
  try {
    const account = await repository.findForUpdate(accountId);

    const { version } = account;

    if (!version) {
      throw new Error("Version not provided");
    }
    const updated = await repository.updateWithVersion(accountId, version, {
      ...rest,
    });

    return updated;
  } catch (error) {
    if (error instanceof AccountNotFoundException) {
      const result = retry(
        () => updateAccountFounds({ accountId, ...rest }),
        3,
      );
      console.log(result);
      return result;
    }
    throw error;
  }
};
