'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const iStyle = {
  width: '100%', padding: '9px 12px', borderRadius: 7, fontSize: 13,
  border: '1px solid #d1d5db', outline: 'none', background: '#fff', color: '#111827',
}

export default function TabInfoAluno({ aluno, endpoint, cor }: { aluno: any; endpoint: string; cor: string }) {
  const router = useRouter()
  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState({ ...aluno })
  const [loading, setLoading] = useState(false)
  const set = (f: string, v: string) => setForm((p: any) => ({ ...p, [f]: v }))
  const isAluno = endpoint === 'alunos'

  async function handleSave() {
    setLoading(true)
    const res = await fetch(`/api/${endpoint}/${aluno.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    if (res.ok) { setEditing(false); router.refresh() }
    setLoading(false)
  }

  async function handleDelete() {
    if (!confirm('Excluir este cadastro permanentemente? Esta ação não pode ser desfeita.')) return
    await fetch(`/api/${endpoint}/${aluno.id}`, { method: 'DELETE' })
    router.push(`/${endpoint}`)
  }

  const Field = ({ label, field, type = 'text', span = 1 }: { label: string; field: string; type?: string; span?: number }) => (
    <div style={{ gridColumn: span === 2 ? 'span 2' : 'span 1' }}>
      <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: '#6b7280', marginBottom: 5, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
        {label}
      </label>
      {editing ? (
        type === 'textarea' ? (
          <textarea rows={3} value={form[field] || ''} onChange={e => set(field, e.target.value)} style={{ ...iStyle, resize: 'vertical' }} />
        ) : type === 'select-turno' ? (
          <select value={form[field] || ''} onChange={e => set(field, e.target.value)} style={iStyle}>
            <option value="">—</option>
            {['Manhã', 'Tarde', 'Noite', 'Integral'].map(o => <option key={o}>{o}</option>)}
          </select>
        ) : (
          <input type={type} value={form[field] || ''} onChange={e => set(field, e.target.value)} style={iStyle} />
        )
      ) : (
        <p style={{ fontSize: 13, color: form[field] ? '#111827' : '#9ca3af', minHeight: 22, paddingTop: 1 }}>
          {form[field] || '—'}
        </p>
      )}
    </div>
  )

  return (
    <div>
      {/* Seção: Dados pessoais */}
      <Section title="Dados pessoais" action={
        !editing ? (
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={() => setEditing(true)} style={{ padding: '6px 14px', borderRadius: 6, fontSize: 12, border: '1px solid #d1d5db', background: '#fff', color: '#374151', cursor: 'pointer', fontWeight: 500 }}>
              Editar
            </button>
            <button onClick={handleDelete} style={{ padding: '6px 14px', borderRadius: 6, fontSize: 12, border: '1px solid #fecaca', background: '#fef2f2', color: '#dc2626', cursor: 'pointer', fontWeight: 500 }}>
              Excluir cadastro
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={() => setEditing(false)} style={{ padding: '6px 14px', borderRadius: 6, fontSize: 12, border: '1px solid #d1d5db', background: '#fff', color: '#374151', cursor: 'pointer' }}>
              Cancelar
            </button>
            <button onClick={handleSave} disabled={loading} style={{ padding: '6px 16px', borderRadius: 6, fontSize: 12, fontWeight: 600, border: 'none', background: cor, color: '#fff', cursor: 'pointer' }}>
              {loading ? 'Salvando…' : 'Salvar alterações'}
            </button>
          </div>
        )
      }>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px 28px', padding: '16px 20px' }}>
          <Field label="Nome completo" field="nome" span={2} />
          <Field label="Data de nascimento" field="dataNascimento" type="date" />
          <Field label="Convênio / Plano" field="convenio" />
          <Field label="Responsável" field="responsavel" />
          <Field label="Telefone" field="telefone" />
          <Field label="E-mail" field="email" type="email" span={2} />
        </div>
      </Section>

      {/* Seção: Dados escolares */}
      {isAluno && (
        <Section title="Dados escolares" style={{ marginTop: 12 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px 28px', padding: '16px 20px' }}>
            <Field label="Escola" field="escola" />
            <Field label="Série / Ano" field="serie" />
            <Field label="Turma" field="turma" />
            <Field label="Turno" field="turno" type="select-turno" />
          </div>
        </Section>
      )}

      {/* Seção: Dados clínicos (paciente) */}
      {!isAluno && (
        <Section title="Informações clínicas" style={{ marginTop: 12 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px 28px', padding: '16px 20px' }}>
            <Field label="Escola" field="escola" />
            <Field label="Série / Ano" field="serie" />
            <Field label="Queixa principal" field="queixaPrincipal" type="textarea" span={2} />
          </div>
        </Section>
      )}

      {/* Seção: Observações */}
      <Section title="Observações gerais" style={{ marginTop: 12 }}>
        <div style={{ padding: '16px 20px' }}>
          <Field label="" field="observacoes" type="textarea" span={2} />
        </div>
      </Section>
    </div>
  )
}

function Section({ title, children, action, style: s }: { title: string; children: React.ReactNode; action?: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 10, overflow: 'hidden', ...s }}>
      <div style={{ padding: '12px 20px', borderBottom: '1px solid #f3f4f6', background: '#fafafa', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: 12, fontWeight: 600, color: '#374151', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{title}</span>
        {action}
      </div>
      {children}
    </div>
  )
}
