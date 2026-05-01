import Sidebar from '@/components/Sidebar'
import Topbar from '@/components/Topbar'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f9fafb' }}>
      <Sidebar />
      <div style={{ marginLeft: 240, flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <Topbar />
        <main style={{ flex: 1, padding: 28 }}>
          {children}
        </main>
      </div>
    </div>
  )
}
