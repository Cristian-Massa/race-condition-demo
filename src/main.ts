import { question, rl } from "@src/modules/shared/utils/question.js";
import { updateAccountFounds } from "@src/modules/accounts/services/accounts.js";
import type { TransactionType } from "@src/modules/shared/types/accounts.js";
import { isUUID } from "@src/modules/shared/utils/is-uuid.js";

// Mini aplicacion de consola para probar la funcionalidad de updateAccountFounds

async function main() {
  let process = true;

  while (process) {
    try {
      const accountIdInput = await question("Ingrese account ID (UUID): ");
      const accountId = accountIdInput.trim();
      if (!isUUID(accountId)) throw new Error("ID inválido");

      const typeInput = await question(
        "Ingrese tipo de transacción (deposit/withdraw): ",
      );
      const type = typeInput.toLowerCase() as TransactionType;
      if (!["deposit", "withdraw"].includes(type))
        throw new Error("Tipo inválido");

      const amountInput = await question("Ingrese cantidad (mayor a 0): ");
      const amount = parseFloat(amountInput);
      if (isNaN(amount) || amount <= 0) throw new Error("Cantidad inválida");

      const updated = await updateAccountFounds({ accountId, type, amount });
      console.dir(updated);

      console.log("\n--- Transacción completada ---\n");
      const continueInput = await question("Quiere continuar? Y / N");
      if (continueInput.toUpperCase() !== "Y") process = false;
    } catch (err: any) {
      console.error("Error:", err.message);
      process = false;
    } finally {
      rl.close();
    }
  }

  // Para ver comportamiento en condicion de carrera descomentar lo de abajo y comentar lo de arriba

  // const p1 = updateAccountFounds({
  //   accountId: "a06b838e-e958-4a04-8294-a256da103535",
  //   type: "deposit",
  //   amount: 10000,
  // });
  // const p2 = updateAccountFounds({
  //   accountId: "a06b838e-e958-4a04-8294-a256da103535",
  //   type: "deposit",
  //   amount: 120000,
  // });

  // const results = await Promise.all([p1, p2]);

  // console.log("Resultados simultáneos:", results);
}

main();
