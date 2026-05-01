'use client'
import { useRouter } from 'next/navigation'

export default function DeleteButton({ id, endpoint, redirectTo, label = 'Excluir' }: { id: string; endpoint: string; redirectTo: string; label?: string }) {
  const router = useRouter()
  async function handleDelete() {
    if (!confirm('Excluir permanentemente? Esta ação não pode ser desfeita.')) return
    const res = await fetch(`/api/${endpoint}/${id}`, { method: 'DELETE' })
    if (res.ok) { router.push(redirectTo); router.refresh() }
  }
  return (
    <button onClick={handleDelete} style={{ fontSize: 12, color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
      onMouseEnter={(e: any) => e.currentTarget.style.textDecoration = 'underline'}
      onMouseLeave={(e: any) => e.currentTarget.style.textDecoration = 'none'}
    >{label}</button>
  )
}
