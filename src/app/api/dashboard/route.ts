import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET() {

  const [totalAlunos, totalPacientes, sessoesHoje, sessoesTotal] = await Promise.all([
    prisma.aluno.count(),
    prisma.paciente.count(),
    prisma.sessao.count({
      where: { data: new Date().toISOString().slice(0, 10) },
    }),
    prisma.sessao.count(),
  ])

  return NextResponse.json({ totalAlunos, totalPacientes, sessoesHoje, sessoesTotal })
}
