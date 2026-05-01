#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { createClient } from "@libsql/client";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbPath = path.resolve(__dirname, "prisma/dev.db");
const migrationPath = path.resolve(__dirname, "prisma/migrations/20260427223338_init/migration.sql");

async function reset() {
  if (fs.existsSync(dbPath)) {
    fs.unlinkSync(dbPath);
    console.log("✓ Banco anterior removido");
  }

  // Garante que o diretório existe
  const dir = path.dirname(dbPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  // Cria arquivo vazio
  fs.writeFileSync(dbPath, "");
  console.log("✓ Arquivo de banco criado");

  const client = createClient({ url: `file:${dbPath}` });
  const sql = fs.readFileSync(migrationPath, "utf8");
  const statements = sql.split(";").map((s) => s.trim()).filter((s) => s.length > 0);

  for (const stmt of statements) {
    try {
      await client.execute(stmt);
    } catch (e) {
      console.error("Erro:", e.message);
    }
  }

  console.log("✓ Banco resetado com sucesso!");
  console.log("✓ Agora pode acessar http://localhost:3000 e criar sua conta");
  client.close();
}

reset().catch(console.error);
