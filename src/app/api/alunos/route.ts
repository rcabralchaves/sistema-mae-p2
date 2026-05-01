import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET() {
  const alunos = await prisma.aluno.findMany({ orderBy: { nome: 'asc' } })
  return NextResponse.json(alunos)
}

export async function POST(req: NextRequest) {
  const data = await req.json()
  const aluno = await prisma.aluno.create({ data })
  return NextResponse.json(aluno, { status: 201 })
}
