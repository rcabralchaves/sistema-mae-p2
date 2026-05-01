'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV = [
  {
    section: null,
    items: [{ href: '/dashboard', label: 'Dashboard', icon: <IconGrid /> }],
  },
  {
    section: 'Cadastros',
    items: [
      { href: '/alunos', label: 'Alunos', icon: <IconUsers /> },
      { href: '/pacientes', label: 'Pacientes', icon: <IconHeart /> },
    ],
  },
  {
    section: 'Documentos',
    items: [
      { href: '/sessoes', label: 'Sessões', icon: <IconCalendar /> },
      { href: '/contratos', label: 'Contratos', icon: <IconDoc /> },
      { href: '/encaminhamentos', label: 'Encaminhamentos', icon: <IconArrow /> },
      { href: '/relatorios', label: 'Relatórios e Pareceres', icon: <IconFile /> },
    ],
  },
  {
    section: 'Biblioteca',
    items: [
      { href: '/testes', label: 'Testes Avaliativos', icon: <IconClipboard /> },
      { href: '/intervencoes', label: 'Intervenções', icon: <IconPuzzle /> },
    ],
  },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside style={{
      position: 'fixed', top: 0, left: 0, height: '100vh', width: 240,
      background: '#0f172a', display: 'flex', flexDirection: 'column',
      borderRight: '1px solid #1e293b', zIndex: 50,
    }}>
      {/* Logo */}
      <div style={{ padding: '20px 20px 16px', borderBottom: '1px solid #1e293b' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 32, height: 32, borderRadius: 8, background: '#3b82f6',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 14, fontWeight: 700, color: '#fff', flexShrink: 0,
          }}>P</div>
          <div>
            <div style={{ color: '#f1f5f9', fontWeight: 600, fontSize: 14, lineHeight: 1.2 }}>Psicopedagogia</div>
            <div style={{ color: '#64748b', fontSize: 11, marginTop: 1 }}>Sistema de Gestão</div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, overflowY: 'auto', padding: '12px 10px' }}>
        {NAV.map((group, gi) => (
          <div key={gi} style={{ marginBottom: 8 }}>
            {group.section && (
              <div style={{ padding: '8px 10px 4px', fontSize: 10, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#475569' }}>
                {group.section}
              </div>
            )}
            {group.items.map(item => {
              const active = pathname === item.href || pathname.startsWith(item.href + '/')
              return (
                <Link key={item.href} href={item.href} style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  padding: '8px 10px', borderRadius: 7, marginBottom: 1,
                  background: active ? '#1e3a5f' : 'transparent',
                  color: active ? '#93c5fd' : '#94a3b8',
                  fontWeight: active ? 500 : 400,
                  fontSize: 13,
                  transition: 'background 0.15s, color 0.15s',
                }}
                  onMouseEnter={e => { if (!active) { (e.currentTarget as HTMLElement).style.background = '#1e293b'; (e.currentTarget as HTMLElement).style.color = '#cbd5e1' } }}
                  onMouseLeave={e => { if (!active) { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = '#94a3b8' } }}
                >
                  <span style={{ width: 18, height: 18, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: active ? '#60a5fa' : '#64748b' }}>
                    {item.icon}
                  </span>
                  {item.label}
                </Link>
              )
            })}
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div style={{ padding: '12px 16px', borderTop: '1px solid #1e293b' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 30, height: 30, borderRadius: '50%', background: '#1e3a5f',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#60a5fa', fontSize: 12, fontWeight: 600, flexShrink: 0,
          }}>A</div>
          <div style={{ minWidth: 0 }}>
            <div style={{ color: '#e2e8f0', fontSize: 13, fontWeight: 500 }}>Administrador</div>
            <div style={{ color: '#475569', fontSize: 11 }}>Sistema ativo</div>
          </div>
        </div>
      </div>
    </aside>
  )
}

function IconGrid() {
  return <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
}
function IconUsers() {
  return <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>
}
function IconHeart() {
  return <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
}
function IconCalendar() {
  return <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
}
function IconDoc() {
  return <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9" x2="8" y2="9"/></svg>
}
function IconArrow() {
  return <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
}
function IconFile() {
  return <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><polyline points="13 2 13 9 20 9"/></svg>
}
function IconClipboard() {
  return <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1"/></svg>
}
function IconPuzzle() {
  return <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>
}
