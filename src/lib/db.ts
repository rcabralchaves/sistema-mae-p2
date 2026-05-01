import { PrismaClient } from '@prisma/client'
import { PrismaLibSql } from '@prisma/adapter-libsql'
import path from 'path'

const DB_URL = process.env.DATABASE_URL || `file:${path.join(process.cwd(), 'prisma', 'dev.db')}`
const DB_TOKEN = process.env.DATABASE_AUTH_TOKEN

const SCHEMA_VERSION = 'v2'
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient; prismaVersion: string }

function createPrisma() {
  const config: { url: string; authToken?: string } = { url: DB_URL }
  if (DB_TOKEN) config.authToken = DB_TOKEN
  const adapter = new PrismaLibSql(config)
  return new PrismaClient({ adapter } as any)
}

const needsNew = !globalForPrisma.prisma || globalForPrisma.prismaVersion !== SCHEMA_VERSION
export const prisma = needsNew ? createPrisma() : globalForPrisma.prisma

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
  globalForPrisma.prismaVersion = SCHEMA_VERSION
}
