'use client'
import { usePathname } from 'next/navigation'

const TITLES: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/alunos': 'Alunos',
  '/pacientes': 'Pacientes',
  '/sessoes': 'Sessões / Frequência',
  '/contratos': 'Contratos',
  '/encaminhamentos': 'Encaminhamentos',
  '/relatorios': 'Relatórios e Pareceres',
  '/testes': 'Testes Avaliativos',
  '/intervencoes': 'Intervenções',
}

function getTitle(pathname: string) {
  for (const [key, val] of Object.entries(TITLES)) {
    if (pathname === key || pathname.startsWith(key + '/')) return val
  }
  return 'Sistema'
}

export default function Topbar() {
  const pathname = usePathname()
  const title = getTitle(pathname)
  const today = new Date().toLocaleDateString('pt-BR', { weekday: 'short', day: 'numeric', month: 'short' })

  return (
    <header style={{
      height: 56,
      background: '#ffffff',
      borderBottom: '1px solid #e5e7eb',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingLeft: 28,
      paddingRight: 24,
      position: 'sticky',
      top: 0,
      zIndex: 30,
    }}>
      <h1 style={{ fontSize: 16, fontWeight: 600, color: '#111827' }}>{title}</h1>

      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <span style={{ fontSize: 12, color: '#9ca3af' }}>{today}</span>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8,
          padding: '5px 10px', borderRadius: 20,
          background: '#f1f5f9', border: '1px solid #e2e8f0',
        }}>
          <div style={{
            width: 24, height: 24, borderRadius: '50%',
            background: '#3b82f6', color: '#fff',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 11, fontWeight: 700,
          }}>A</div>
          <span style={{ fontSize: 13, fontWeight: 500, color: '#374151' }}>Admin</span>
        </div>
      </div>
    </header>
  )
}
