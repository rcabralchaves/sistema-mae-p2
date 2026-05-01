import { prisma } from '@/lib/db'
import Link from 'next/link'

export default async function SessoesPage() {
  const sessoes = await prisma.sessao.findMany({
    orderBy: { data: 'desc' },
    include: { aluno: true, paciente: true },
  })

  const presencas = sessoes.filter(s => s.presente).length
  const faltas = sessoes.filter(s => !s.presente).length

  return (
    <div style={{ maxWidth: 900 }}>
      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, marginBottom: 24 }}>
        {[
          { label: 'Total de sessões', value: sessoes.length, color: '#3b82f6' },
          { label: 'Presenças', value: presencas, color: '#10b981' },
          { label: 'Faltas', value: faltas, color: '#f59e0b' },
        ].map(s => (
          <div key={s.label} style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 10, padding: '16px 20px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 6 }}>{s.label}</div>
            <div style={{ fontSize: 28, fontWeight: 700, color: s.color }}>{s.value}</div>
          </div>
        ))}
      </div>

      {sessoes.length === 0 ? (
        <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 10, padding: '64px 20px', textAlign: 'center' }}>
          <p style={{ fontWeight: 600, color: '#374151', marginBottom: 6 }}>Nenhuma sessão registrada</p>
          <p style={{ fontSize: 13, color: '#9ca3af' }}>Registre sessões nas fichas dos alunos ou pacientes.</p>
        </div>
      ) : (
        <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 10, overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
                {['Data', 'Pessoa', 'Tipo', 'Status', 'Observações'].map(h => (
                  <th key={h} style={{ textAlign: 'left', padding: '11px 16px', fontSize: 11, fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sessoes.map((s, i) => (
                <tr key={s.id} style={{ borderBottom: i < sessoes.length - 1 ? '1px solid #f3f4f6' : 'none' }}>
                  <td style={{ padding: '11px 16px', fontSize: 13, fontWeight: 500, color: '#111827' }}>{s.data}</td>
                  <td style={{ padding: '11px 16px', fontSize: 13, color: '#374151' }}>
                    {s.aluno ? (
                      <Link href={`/alunos/${s.aluno.id}`} style={{ color: '#3b82f6' }}>{s.aluno.nome}</Link>
                    ) : s.paciente ? (
                      <Link href={`/pacientes/${s.paciente.id}`} style={{ color: '#3b82f6' }}>{s.paciente.nome}</Link>
                    ) : '—'}
                  </td>
                  <td style={{ padding: '11px 16px' }}>
                    <span style={{ fontSize: 11, padding: '3px 8px', borderRadius: 20, background: s.aluno ? '#eff6ff' : '#f0fdf4', color: s.aluno ? '#1d4ed8' : '#15803d', fontWeight: 500 }}>
                      {s.aluno ? 'Aluno' : 'Paciente'}
                    </span>
                  </td>
                  <td style={{ padding: '11px 16px' }}>
                    <span style={{
                      fontSize: 11, padding: '3px 8px', borderRadius: 20, fontWeight: 500,
                      background: s.presente ? '#dcfce7' : s.justificada ? '#fef9c3' : '#fee2e2',
                      color: s.presente ? '#15803d' : s.justificada ? '#92400e' : '#b91c1c',
                    }}>
                      {s.presente ? 'Presente' : s.justificada ? 'Justificada' : 'Falta'}
                    </span>
                  </td>
                  <td style={{ padding: '11px 16px', fontSize: 13, color: '#6b7280' }}>{s.observacoes || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
