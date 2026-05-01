import { prisma } from '@/lib/db'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import FichaAluno from '@/components/FichaAluno'

export const dynamic = 'force-dynamic'

export default async function AlunoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const aluno = await prisma.aluno.findUnique({
    where: { id },
    include: {
      sessoes: { orderBy: { data: 'desc' } },
      contratos: { orderBy: { createdAt: 'desc' } },
      encaminhamentos: { orderBy: { data: 'desc' } },
      relatorios: { orderBy: { createdAt: 'desc' } },
      testes: { orderBy: { createdAt: 'desc' } },
    },
  })
  if (!aluno) notFound()

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <Link href="/alunos" className="text-gray-400 hover:text-gray-600">← Alunos</Link>
      </div>
      <FichaAluno aluno={aluno} tipo="aluno" />
    </div>
  )
}
