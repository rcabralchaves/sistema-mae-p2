import { prisma } from '@/lib/db'
import Link from 'next/link'

const TIPO_LABEL: Record<string, string> = {
  psicopedagogico: 'Relatório Psicopedagógico',
  parecer_psicopedagogico: 'Parecer Psicopedagógico',
  parecer_psicologico: 'Parecer Psicológico',
}

export default async function RelatoriosPage() {
  const relatorios = await prisma.relatorio.findMany({
    orderBy: { createdAt: 'desc' },
    include: { aluno: true, paciente: true },
  })

  return (
    <div style={{ maxWidth: 900 }}>
      <p style={{ fontSize: 13, color: '#6b7280', marginBottom: 20 }}>{relatorios.length} relatório(s) emitido(s)</p>

      {relatorios.length === 0 ? (
        <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 10, padding: '64px 20px', textAlign: 'center' }}>
          <p style={{ fontWeight: 600, color: '#374151', marginBottom: 6 }}>Nenhum relatório emitido</p>
          <p style={{ fontSize: 13, color: '#9ca3af' }}>Crie relatórios nas fichas individuais dos alunos ou pacientes.</p>
        </div>
      ) : (
        <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 10, overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
                {['Título', 'Tipo', 'Pessoa', 'Data', ''].map(h => (
                  <th key={h} style={{ textAlign: 'left', padding: '11px 16px', fontSize: 11, fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {relatorios.map((r, i) => (
                <tr key={r.id} style={{ borderBottom: i < relatorios.length - 1 ? '1px solid #f3f4f6' : 'none' }}>
                  <td style={{ padding: '12px 16px', fontSize: 13, fontWeight: 500, color: '#111827' }}>{r.titulo}</td>
                  <td style={{ padding: '12px 16px' }}>
                    <span style={{ fontSize: 11, padding: '3px 8px', borderRadius: 20, background: '#f5f3ff', color: '#6d28d9', fontWeight: 500 }}>
                      {TIPO_LABEL[r.tipo] || r.tipo}
                    </span>
                  </td>
                  <td style={{ padding: '12px 16px', fontSize: 13 }}>
                    {r.aluno ? <Link href={`/alunos/${r.aluno.id}`} style={{ color: '#3b82f6' }}>{r.aluno.nome}</Link>
                      : r.paciente ? <Link href={`/pacientes/${r.paciente.id}`} style={{ color: '#3b82f6' }}>{r.paciente.nome}</Link> : '—'}
                  </td>
                  <td style={{ padding: '12px 16px', fontSize: 13, color: '#6b7280' }}>
                    {new Date(r.createdAt).toLocaleDateString('pt-BR')}
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    <Link href={r.aluno ? `/alunos/${r.aluno.id}` : `/pacientes/${r.paciente?.id}`} style={{ fontSize: 12, color: '#3b82f6', fontWeight: 500 }}>Ver ficha</Link>
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
