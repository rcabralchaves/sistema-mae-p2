import { createClient } from '@libsql/client'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const dbPath = join(__dirname, 'prisma', 'dev.db')

const url = process.env.DATABASE_URL || `file:${dbPath}`
const authToken = process.env.DATABASE_AUTH_TOKEN
const db = createClient(authToken ? { url, authToken } : { url })

const SQL = `
CREATE TABLE IF NOT EXISTS User (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS Aluno (
  id TEXT PRIMARY KEY,
  nome TEXT NOT NULL,
  dataNascimento TEXT,
  escola TEXT,
  serie TEXT,
  turma TEXT,
  turno TEXT,
  responsavel TEXT,
  telefone TEXT,
  email TEXT,
  convenio TEXT,
  observacoes TEXT,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS Paciente (
  id TEXT PRIMARY KEY,
  nome TEXT NOT NULL,
  dataNascimento TEXT,
  escola TEXT,
  serie TEXT,
  responsavel TEXT,
  telefone TEXT,
  email TEXT,
  convenio TEXT,
  queixaPrincipal TEXT,
  observacoes TEXT,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS Sessao (
  id TEXT PRIMARY KEY,
  data TEXT NOT NULL,
  presente INTEGER DEFAULT 1,
  justificada INTEGER DEFAULT 0,
  observacoes TEXT,
  alunoId TEXT,
  pacienteId TEXT,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (alunoId) REFERENCES Aluno(id) ON DELETE CASCADE,
  FOREIGN KEY (pacienteId) REFERENCES Paciente(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Contrato (
  id TEXT PRIMARY KEY,
  titulo TEXT NOT NULL,
  conteudo TEXT NOT NULL,
  dataInicio TEXT,
  dataFim TEXT,
  valor TEXT,
  alunoId TEXT,
  pacienteId TEXT,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (alunoId) REFERENCES Aluno(id) ON DELETE CASCADE,
  FOREIGN KEY (pacienteId) REFERENCES Paciente(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Encaminhamento (
  id TEXT PRIMARY KEY,
  profissional TEXT NOT NULL,
  especialidade TEXT,
  motivo TEXT,
  observacoes TEXT,
  data TEXT NOT NULL,
  alunoId TEXT,
  pacienteId TEXT,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (alunoId) REFERENCES Aluno(id) ON DELETE CASCADE,
  FOREIGN KEY (pacienteId) REFERENCES Paciente(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Relatorio (
  id TEXT PRIMARY KEY,
  tipo TEXT NOT NULL,
  titulo TEXT NOT NULL,
  conteudo TEXT NOT NULL,
  alunoId TEXT,
  pacienteId TEXT,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (alunoId) REFERENCES Aluno(id) ON DELETE CASCADE,
  FOREIGN KEY (pacienteId) REFERENCES Paciente(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS TesteAvaliativo (
  id TEXT PRIMARY KEY,
  tipo TEXT NOT NULL,
  titulo TEXT NOT NULL,
  respostas TEXT NOT NULL,
  pontuacao INTEGER,
  nivel TEXT,
  observacoes TEXT,
  alunoId TEXT,
  pacienteId TEXT,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (alunoId) REFERENCES Aluno(id) ON DELETE CASCADE,
  FOREIGN KEY (pacienteId) REFERENCES Paciente(id) ON DELETE CASCADE
);
`

const statements = SQL.split(';').map(s => s.trim()).filter(Boolean)

for (const stmt of statements) {
  await db.execute(stmt)
}

console.log('✅ Banco de dados inicializado com sucesso!')
