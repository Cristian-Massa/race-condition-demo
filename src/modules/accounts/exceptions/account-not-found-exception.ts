export class AccountNotFoundException extends Error {
  accountId: string;

  constructor(accountId: string) {
    super(`Account with ID "${accountId}" not found or already updated.`);
    this.name = "AccountNotFoundException";
    this.accountId = accountId;
  }
}
