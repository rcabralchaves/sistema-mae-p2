import { prisma } from '@/lib/db'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function EncaminhamentosPage() {
  const encaminhamentos = await prisma.encaminhamento.findMany({
    orderBy: { data: 'desc' },
    include: { aluno: true, paciente: true },
  })

  return (
    <div style={{ maxWidth: 900 }}>
      <p style={{ fontSize: 13, color: '#6b7280', marginBottom: 20 }}>{encaminhamentos.length} encaminhamento(s)</p>

      {encaminhamentos.length === 0 ? (
        <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 10, padding: '64px 20px', textAlign: 'center' }}>
          <p style={{ fontWeight: 600, color: '#374151', marginBottom: 6 }}>Nenhum encaminhamento registrado</p>
          <p style={{ fontSize: 13, color: '#9ca3af' }}>Registre encaminhamentos nas fichas individuais.</p>
        </div>
      ) : (
        <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 10, overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
                {['Data', 'Profissional', 'Especialidade', 'Pessoa', 'Motivo', ''].map(h => (
                  <th key={h} style={{ textAlign: 'left', padding: '11px 16px', fontSize: 11, fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {encaminhamentos.map((enc, i) => (
                <tr key={enc.id} style={{ borderBottom: i < encaminhamentos.length - 1 ? '1px solid #f3f4f6' : 'none' }}>
                  <td style={{ padding: '12px 16px', fontSize: 13, color: '#6b7280' }}>{enc.data}</td>
                  <td style={{ padding: '12px 16px', fontSize: 13, fontWeight: 500, color: '#111827' }}>{enc.profissional}</td>
                  <td style={{ padding: '12px 16px', fontSize: 13, color: '#6b7280' }}>{enc.especialidade || '—'}</td>
                  <td style={{ padding: '12px 16px', fontSize: 13 }}>
                    {enc.aluno ? <Link href={`/alunos/${enc.aluno.id}`} style={{ color: '#3b82f6' }}>{enc.aluno.nome}</Link>
                      : enc.paciente ? <Link href={`/pacientes/${enc.paciente.id}`} style={{ color: '#3b82f6' }}>{enc.paciente.nome}</Link> : '—'}
                  </td>
                  <td style={{ padding: '12px 16px', fontSize: 13, color: '#6b7280' }}>{enc.motivo ? enc.motivo.slice(0, 40) + (enc.motivo.length > 40 ? '…' : '') : '—'}</td>
                  <td style={{ padding: '12px 16px' }}>
                    <Link href={enc.aluno ? `/alunos/${enc.aluno.id}` : `/pacientes/${enc.paciente?.id}`} style={{ fontSize: 12, color: '#3b82f6', fontWeight: 500 }}>Ver ficha</Link>
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
