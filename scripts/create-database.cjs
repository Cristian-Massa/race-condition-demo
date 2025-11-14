const fs = require("fs");
const path = require("path");

const databaseDir = path.join(__dirname, "..", "database");
const databaseFile = path.join(databaseDir, "local.db");

if (!fs.existsSync(databaseDir)) {
  fs.mkdirSync(databaseDir, { recursive: true });
  console.log("Carpeta 'database' creada.");
}

if (!fs.existsSync(databaseFile)) {
  fs.writeFileSync(databaseFile, "");
  console.log("Archivo 'local.db' creado.");
} else {
  console.log("Archivo 'local.db' ya existe.");
}
