import { prisma } from '@/lib/db'
import Link from 'next/link'
import DeleteButton from '@/components/DeleteButton'

export const dynamic = 'force-dynamic'

export default async function PacientesPage() {
  const pacientes = await prisma.paciente.findMany({ orderBy: { nome: 'asc' } })

  return (
    <div style={{ maxWidth: 1000 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <p style={{ fontSize: 13, color: '#6b7280' }}>{pacientes.length} paciente(s) cadastrado(s)</p>
        <Link href="/pacientes/novo">
          <button className="btn-primary" style={{ background: '#3b82f6', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: 7, fontSize: 13, fontWeight: 500, cursor: 'pointer' }}>
            + Novo paciente
          </button>
        </Link>
      </div>

      {pacientes.length === 0 ? (
        <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 10, padding: '64px 20px', textAlign: 'center' }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>🩺</div>
          <p style={{ fontWeight: 600, color: '#374151', marginBottom: 6 }}>Nenhum paciente cadastrado</p>
          <p style={{ fontSize: 13, color: '#9ca3af', marginBottom: 16 }}>Comece cadastrando o primeiro paciente</p>
          <Link href="/pacientes/novo">
            <button className="btn-primary" style={{ background: '#3b82f6', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: 7, fontSize: 13, cursor: 'pointer' }}>
              + Cadastrar paciente
            </button>
          </Link>
        </div>
      ) : (
        <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 10, overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
                {['Nome', 'Responsável', 'Telefone', 'Queixa principal', ''].map(h => (
                  <th key={h} style={{ textAlign: 'left', padding: '11px 16px', fontSize: 11, fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {pacientes.map((p, i) => (
                <tr key={p.id} className="table-row" style={{ borderBottom: i < pacientes.length - 1 ? '1px solid #f3f4f6' : 'none' }}>
                  <td style={{ padding: '12px 16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ width: 30, height: 30, borderRadius: '50%', background: '#f0fdf4', color: '#10b981', fontSize: 12, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        {p.nome.charAt(0).toUpperCase()}
                      </div>
                      <Link href={`/pacientes/${p.id}`} className="action-link" style={{ fontWeight: 500, fontSize: 13, color: '#111827' }}>{p.nome}</Link>
                    </div>
                  </td>
                  <td style={{ padding: '12px 16px', fontSize: 13, color: '#6b7280' }}>{p.responsavel || '—'}</td>
                  <td style={{ padding: '12px 16px', fontSize: 13, color: '#6b7280' }}>{p.telefone || '—'}</td>
                  <td style={{ padding: '12px 16px', fontSize: 13, color: '#6b7280' }}>{p.queixaPrincipal ? p.queixaPrincipal.slice(0, 45) + (p.queixaPrincipal.length > 45 ? '…' : '') : '—'}</td>
                  <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                    <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end', alignItems: 'center' }}>
                      <Link href={`/pacientes/${p.id}`} style={{ fontSize: 12, color: '#3b82f6', fontWeight: 500 }}>Ver ficha</Link>
                      <DeleteButton id={p.id} endpoint="pacientes" redirectTo="/pacientes" label="Excluir" />
                    </div>
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
