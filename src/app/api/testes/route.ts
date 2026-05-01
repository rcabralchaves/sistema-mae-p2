import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET() {
  const testes = await prisma.testeAvaliativo.findMany({
    orderBy: { createdAt: 'desc' },
    include: { aluno: true, paciente: true },
  })
  return NextResponse.json(testes)
}

export async function POST(req: NextRequest) {
  const data = await req.json()
  const teste = await prisma.testeAvaliativo.create({ data })
  return NextResponse.json(teste, { status: 201 })
}
