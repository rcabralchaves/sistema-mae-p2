import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const aluno = await prisma.aluno.findUnique({
    where: { id },
    include: { sessoes: { orderBy: { data: 'desc' } }, contratos: true, encaminhamentos: true, relatorios: true },
  })
  if (!aluno) return NextResponse.json({ error: 'Não encontrado' }, { status: 404 })
  return NextResponse.json(aluno)
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const data = await req.json()
  const aluno = await prisma.aluno.update({ where: { id }, data })
  return NextResponse.json(aluno)
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  await prisma.aluno.delete({ where: { id } })
  return NextResponse.json({ ok: true })
}
