'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const iStyle = { width: '100%', padding: '8px 12px', borderRadius: 7, fontSize: 13, border: '1px solid #d1d5db', outline: 'none', background: '#fff', color: '#111827' }

export default function NovoPacientePage() {
  const router = useRouter()
  const [form, setForm] = useState({ nome: '', dataNascimento: '', escola: '', serie: '', responsavel: '', telefone: '', email: '', convenio: '', queixaPrincipal: '', observacoes: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const set = (f: string, v: string) => setForm(p => ({ ...p, [f]: v }))

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault(); setLoading(true)
    const res = await fetch('/api/pacientes', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
    if (res.ok) { const p = await res.json(); router.push(`/pacientes/${p.id}`) }
    else { setError('Erro ao salvar'); setLoading(false) }
  }

  return (
    <div style={{ maxWidth: 680 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20, fontSize: 13, color: '#6b7280' }}>
        <Link href="/pacientes" style={{ color: '#6b7280' }}>Pacientes</Link>
        <span>/</span>
        <span style={{ color: '#111827', fontWeight: 500 }}>Novo paciente</span>
      </div>

      {error && <div style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626', padding: '10px 14px', borderRadius: 7, fontSize: 13, marginBottom: 16 }}>{error}</div>}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <Section title="Dados pessoais">
          <Grid cols={2}>
            <Field label="Nome completo *" span={2}><input required value={form.nome} onChange={e => set('nome', e.target.value)} style={iStyle} /></Field>
            <Field label="Data de nascimento"><input type="date" value={form.dataNascimento} onChange={e => set('dataNascimento', e.target.value)} style={iStyle} /></Field>
            <Field label="Convênio"><input value={form.convenio} onChange={e => set('convenio', e.target.value)} style={iStyle} /></Field>
          </Grid>
        </Section>

        <Section title="Escola (opcional)">
          <Grid cols={2}>
            <Field label="Escola"><input value={form.escola} onChange={e => set('escola', e.target.value)} style={iStyle} /></Field>
            <Field label="Série / Ano"><input value={form.serie} onChange={e => set('serie', e.target.value)} style={iStyle} /></Field>
          </Grid>
        </Section>

        <Section title="Contato">
          <Grid cols={2}>
            <Field label="Responsável"><input value={form.responsavel} onChange={e => set('responsavel', e.target.value)} style={iStyle} /></Field>
            <Field label="Telefone"><input value={form.telefone} onChange={e => set('telefone', e.target.value)} style={iStyle} /></Field>
            <Field label="E-mail" span={2}><input type="email" value={form.email} onChange={e => set('email', e.target.value)} style={iStyle} /></Field>
          </Grid>
        </Section>

        <Section title="Clínico">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <Field label="Queixa principal"><textarea rows={2} value={form.queixaPrincipal} onChange={e => set('queixaPrincipal', e.target.value)} style={{ ...iStyle, resize: 'vertical' }} /></Field>
            <Field label="Observações"><textarea rows={3} value={form.observacoes} onChange={e => set('observacoes', e.target.value)} style={{ ...iStyle, resize: 'vertical' }} /></Field>
          </div>
        </Section>

        <div style={{ display: 'flex', gap: 10 }}>
          <button type="button" onClick={() => router.back()} style={{ padding: '8px 16px', borderRadius: 7, fontSize: 13, border: '1px solid #d1d5db', background: '#fff', color: '#374151', cursor: 'pointer' }}>Cancelar</button>
          <button type="submit" disabled={loading} style={{ padding: '8px 20px', borderRadius: 7, fontSize: 13, fontWeight: 500, border: 'none', background: '#3b82f6', color: '#fff', cursor: 'pointer', opacity: loading ? 0.7 : 1 }}>
            {loading ? 'Salvando...' : 'Salvar paciente'}
          </button>
        </div>
      </form>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 10, overflow: 'hidden' }}>
      <div style={{ padding: '12px 16px', borderBottom: '1px solid #f3f4f6', background: '#f9fafb' }}>
        <span style={{ fontSize: 13, fontWeight: 600, color: '#374151' }}>{title}</span>
      </div>
      <div style={{ padding: 16 }}>{children}</div>
    </div>
  )
}
function Grid({ cols, children }: { cols: number; children: React.ReactNode }) {
  return <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: 12 }}>{children}</div>
}
function Field({ label, children, span = 1 }: { label: string; children: React.ReactNode; span?: number }) {
  return (
    <div style={{ gridColumn: span === 2 ? 'span 2' : 'span 1' }}>
      <label style={{ display: 'block', fontSize: 12, fontWeight: 500, color: '#6b7280', marginBottom: 5 }}>{label}</label>
      {children}
    </div>
  )
}
