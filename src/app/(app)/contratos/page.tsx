import { prisma } from '@/lib/db'
import Link from 'next/link'

export default async function ContratosPage() {
  const contratos = await prisma.contrato.findMany({
    orderBy: { createdAt: 'desc' },
    include: { aluno: true, paciente: true },
  })

  return (
    <div style={{ maxWidth: 900 }}>
      <p style={{ fontSize: 13, color: '#6b7280', marginBottom: 20 }}>{contratos.length} contrato(s) emitido(s)</p>

      {contratos.length === 0 ? (
        <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 10, padding: '64px 20px', textAlign: 'center' }}>
          <p style={{ fontWeight: 600, color: '#374151', marginBottom: 6 }}>Nenhum contrato emitido</p>
          <p style={{ fontSize: 13, color: '#9ca3af' }}>Crie contratos nas fichas individuais dos alunos ou pacientes.</p>
        </div>
      ) : (
        <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 10, overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
                {['Título', 'Pessoa', 'Valor', 'Vigência', ''].map(h => (
                  <th key={h} style={{ textAlign: 'left', padding: '11px 16px', fontSize: 11, fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {contratos.map((c, i) => (
                <tr key={c.id} style={{ borderBottom: i < contratos.length - 1 ? '1px solid #f3f4f6' : 'none' }}>
                  <td style={{ padding: '12px 16px', fontSize: 13, fontWeight: 500, color: '#111827' }}>{c.titulo}</td>
                  <td style={{ padding: '12px 16px', fontSize: 13, color: '#374151' }}>
                    {c.aluno ? (
                      <Link href={`/alunos/${c.aluno.id}`} style={{ color: '#3b82f6' }}>{c.aluno.nome}</Link>
                    ) : c.paciente ? (
                      <Link href={`/pacientes/${c.paciente.id}`} style={{ color: '#3b82f6' }}>{c.paciente.nome}</Link>
                    ) : '—'}
                  </td>
                  <td style={{ padding: '12px 16px', fontSize: 13, color: '#6b7280' }}>{c.valor ? `R$ ${c.valor}` : '—'}</td>
                  <td style={{ padding: '12px 16px', fontSize: 13, color: '#6b7280' }}>
                    {c.dataInicio && c.dataFim ? `${c.dataInicio} → ${c.dataFim}` : c.dataInicio || '—'}
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    <Link href={c.aluno ? `/alunos/${c.aluno.id}` : `/pacientes/${c.paciente?.id}`} style={{ fontSize: 12, color: '#3b82f6', fontWeight: 500 }}>Ver ficha</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
