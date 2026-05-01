#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const { createClient } = require("@libsql/client");

const dbPath = path.resolve(__dirname, "prisma/dev.db");
const migrationPath = path.resolve(__dirname, "prisma/migrations/20260427223338_init/migration.sql");

async function reset() {
  // Remove arquivo antigo se existir
  if (fs.existsSync(dbPath)) {
    fs.unlinkSync(dbPath);
    console.log("✓ Banco anterior removido");
  }

  // Cria novo cliente
  const client = createClient({ url: `file:${dbPath}` });

  // Lê e aplica a migration
  const sql = fs.readFileSync(migrationPath, "utf8");
  const statements = sql.split(";").map((s) => s.trim()).filter((s) => s.length > 0);

  for (const stmt of statements) {
    try {
      await client.execute(stmt);
    } catch (e) {
      console.error("Erro na migration:", e.message);
    }
  }

  console.log("✓ Banco resetado e migrações aplicadas");
  console.log("✓ Agora você pode acessar http://localhost:3000 e criar sua conta");
  client.close();
}

reset().catch(console.error);
