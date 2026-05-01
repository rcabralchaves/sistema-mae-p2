import { PrismaClient } from '@prisma/client'
import { PrismaLibSql } from '@prisma/adapter-libsql'

const DB_URL = 'file:/Users/renatocabralchaves/SISTEMA MAE P2/sistema-mae-p2/prisma/dev.db'

const SCHEMA_VERSION = 'v2'
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient; prismaVersion: string }

function createPrisma() {
  const adapter = new PrismaLibSql({ url: DB_URL })
  return new PrismaClient({ adapter } as any)
}

const needsNew = !globalForPrisma.prisma || globalForPrisma.prismaVersion !== SCHEMA_VERSION
export const prisma = needsNew ? createPrisma() : globalForPrisma.prisma

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
  globalForPrisma.prismaVersion = SCHEMA_VERSION
}
