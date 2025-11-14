const { db } = require("../dist/src/modules/database/db");
const { account } = require("../dist/src/modules/accounts/schema/accounts");
const { randomUUID } = require("crypto");

(async () => {
  try {
    const newAccount = {
      accountId: randomUUID(),
      amount: 1000,
      version: 1,
    };

    await db.insert(account).values(newAccount);

    console.log("Cuenta de prueba creada:");
    console.log(newAccount);
  } catch (err) {
    console.error("Error creando la cuenta:", err);
  } finally {
    await db.end?.();
  }
})();
