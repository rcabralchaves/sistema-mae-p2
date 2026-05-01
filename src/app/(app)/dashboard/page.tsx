import { prisma } from '@/lib/db'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function DashboardPage() {
  const [totalAlunos, totalPacientes, totalSessoes, totalRelatorios] = await Promise.all([
    prisma.aluno.count(),
    prisma.paciente.count(),
    prisma.sessao.count(),
    prisma.relatorio.count(),
  ])

  const alunosRecentes = await prisma.aluno.findMany({ orderBy: { createdAt: 'desc' }, take: 5 })
  const pacientesRecentes = await prisma.paciente.findMany({ orderBy: { createdAt: 'desc' }, take: 5 })

  const stats = [
    { label: 'Alunos', value: totalAlunos, href: '/alunos', color: '#3b82f6', bg: '#eff6ff' },
    { label: 'Pacientes', value: totalPacientes, href: '/pacientes', color: '#10b981', bg: '#f0fdf4' },
    { label: 'Sessões', value: totalSessoes, href: '/sessoes', color: '#f59e0b', bg: '#fffbeb' },
    { label: 'Relatórios', value: totalRelatorios, href: '/relatorios', color: '#8b5cf6', bg: '#faf5ff' },
  ]

  const actions = [
    { href: '/alunos/novo', label: '+ Novo aluno', color: '#3b82f6' },
    { href: '/pacientes/novo', label: '+ Novo paciente', color: '#10b981' },
    { href: '/testes', label: 'Testes avaliativos', color: '#f59e0b' },
    { href: '/intervencoes', label: 'Intervenções', color: '#8b5cf6' },
  ]

  return (
    <div style={{ maxWidth: 1100 }}>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 28 }}>
        {stats.map(s => (
          <Link key={s.label} href={s.href}>
            <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 10, padding: '18px 22px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', cursor: 'pointer', transition: 'box-shadow 0.15s' }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8 }}>{s.label}</div>
              <div style={{ fontSize: 34, fontWeight: 700, color: s.color, lineHeight: 1 }}>{s.value}</div>
              <div style={{ marginTop: 12, height: 3, borderRadius: 2, background: '#f3f4f6', overflow: 'hidden' }}>
                <div style={{ height: 3, borderRadius: 2, background: s.color, width: s.value > 0 ? '100%' : '0%' }} />
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick actions */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 12 }}>Ações rápidas</div>
        <div style={{ display: 'flex', gap: 10 }}>
          {actions.map(a => (
            <Link key={a.href} href={a.href}>
              <button className="btn-secondary" style={{ padding: '8px 16px', borderRadius: 7, fontSize: 13, fontWeight: 500, border: '1px solid #e5e7eb', background: '#fff', color: '#374151', cursor: 'pointer', transition: 'background 0.15s' }}>
                {a.label}
              </button>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent lists */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>

        <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 10, overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <div style={{ padding: '14px 18px', borderBottom: '1px solid #f3f4f6', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: '#111827' }}>Alunos recentes</span>
            <Link href="/alunos" style={{ fontSize: 12, color: '#3b82f6' }}>Ver todos →</Link>
          </div>
          {alunosRecentes.length === 0 ? (
            <div style={{ padding: '32px 18px', textAlign: 'center', fontSize: 13, color: '#9ca3af' }}>Nenhum aluno cadastrado</div>
          ) : alunosRecentes.map((a, i) => (
            <Link key={a.id} href={`/alunos/${a.id}`}>
              <div className="list-item" style={{ padding: '11px 18px', display: 'flex', alignItems: 'center', gap: 10, borderBottom: i < alunosRecentes.length - 1 ? '1px solid #f9fafb' : 'none', cursor: 'pointer' }}>
                <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#eff6ff', color: '#3b82f6', fontSize: 12, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  {a.nome.charAt(0).toUpperCase()}
                </div>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 500, color: '#111827', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{a.nome}</div>
                  <div style={{ fontSize: 12, color: '#9ca3af' }}>{a.escola || 'Sem escola'}</div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 10, overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <div style={{ padding: '14px 18px', borderBottom: '1px solid #f3f4f6', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: '#111827' }}>Pacientes recentes</span>
            <Link href="/pacientes" style={{ fontSize: 12, color: '#3b82f6' }}>Ver todos →</Link>
          </div>
          {pacientesRecentes.length === 0 ? (
            <div style={{ padding: '32px 18px', textAlign: 'center', fontSize: 13, color: '#9ca3af' }}>Nenhum paciente cadastrado</div>
          ) : pacientesRecentes.map((p, i) => (
            <Link key={p.id} href={`/pacientes/${p.id}`}>
              <div className="list-item" style={{ padding: '11px 18px', display: 'flex', alignItems: 'center', gap: 10, borderBottom: i < pacientesRecentes.length - 1 ? '1px solid #f9fafb' : 'none', cursor: 'pointer' }}>
                <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#f0fdf4', color: '#10b981', fontSize: 12, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  {p.nome.charAt(0).toUpperCase()}
                </div>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 500, color: '#111827', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.nome}</div>
                  <div style={{ fontSize: 12, color: '#9ca3af' }}>{p.queixaPrincipal ? p.queixaPrincipal.slice(0, 35) + '…' : 'Sem queixa registrada'}</div>
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </div>
  )
}
