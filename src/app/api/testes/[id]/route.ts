import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const teste = await prisma.testeAvaliativo.findUnique({
    where: { id },
    include: { aluno: true, paciente: true },
  })
  if (!teste) return NextResponse.json({ error: 'Não encontrado' }, { status: 404 })
  return NextResponse.json(teste)
}

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  await prisma.testeAvaliativo.delete({ where: { id } })
  return NextResponse.json({ ok: true })
}
