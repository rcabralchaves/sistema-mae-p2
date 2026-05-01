import { prisma } from '@/lib/db'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import FichaAluno from '@/components/FichaAluno'

export const dynamic = 'force-dynamic'

export default async function PacientePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const paciente = await prisma.paciente.findUnique({
    where: { id },
    include: {
      sessoes: { orderBy: { data: 'desc' } },
      contratos: { orderBy: { createdAt: 'desc' } },
      encaminhamentos: { orderBy: { data: 'desc' } },
      relatorios: { orderBy: { createdAt: 'desc' } },
      testes: { orderBy: { createdAt: 'desc' } },
    },
  })
  if (!paciente) notFound()

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <Link href="/pacientes" className="text-gray-400 hover:text-gray-600">← Pacientes</Link>
      </div>
      <FichaAluno aluno={paciente} tipo="paciente" />
    </div>
  )
}
