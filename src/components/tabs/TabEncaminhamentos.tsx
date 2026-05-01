'use client'
import { useState } from 'react'

const iStyle = { width: '100%', padding: '9px 12px', borderRadius: 7, fontSize: 13, border: '1px solid #d1d5db', outline: 'none', background: '#fff', color: '#111827' }

const ESPECIALIDADES = ['Fonoaudiologia', 'Neurologia', 'Neuropsicologia', 'Psicologia', 'Psiquiatria', 'Terapia Ocupacional', 'Fisioterapia', 'Oftalmologia', 'Otorrinolaringologia', 'Outro']

export default function TabEncaminhamentos({ encaminhamentos: initial, entityId, idField, cor }: { encaminhamentos: any[]; entityId: string; idField: string; cor: string }) {
  const [encaminhamentos, setEncaminhamentos] = useState(initial)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ profissional: '', especialidade: '', motivo: '', observacoes: '', data: new Date().toISOString().slice(0, 10) })
  const [loading, setLoading] = useState(false)

  async function handleAdd() {
    if (!form.profissional || !form.data) return
    setLoading(true)
    const res = await fetch('/api/encaminhamentos', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, [idField]: entityId }),
    })
    if (res.ok) {
      const novo = await res.json()
      setEncaminhamentos([novo, ...encaminhamentos])
      setShowForm(false)
      setForm({ profissional: '', especialidade: '', motivo: '', observacoes: '', data: new Date().toISOString().slice(0, 10) })
    }
    setLoading(false)
  }

  async function handleDelete(id: string) {
    if (!confirm('Excluir este encaminhamento?')) return
    await fetch(`/api/encaminhamentos/${id}`, { method: 'DELETE' })
    setEncaminhamentos(encaminhamentos.filter((e: any) => e.id !== id))
  }

  function handlePrint(enc: any) {
    const w = window.open('', '_blank')
    if (!w) return
    w.document.write(`<html><head><title>Encaminhamento</title><style>body{font-family:serif;max-width:700px;margin:60px auto;line-height:2;font-size:15px;color:#222}</style></head><body>
      <h2 style="text-align:center;margin-bottom:40px">ENCAMINHAMENTO</h2>
      <p><strong>Data:</strong> ${enc.data}</p>
      <p><strong>Encaminhamento para:</strong> ${enc.profissional}</p>
      ${enc.especialidade ? `<p><strong>Especialidade:</strong> ${enc.especialidade}</p>` : ''}
      ${enc.motivo ? `<p><strong>Motivo:</strong> ${enc.motivo}</p>` : ''}
      ${enc.observacoes ? `<p><strong>Observações:</strong> ${enc.observacoes}</p>` : ''}
      <br><br><br>
      <p style="margin-top:60px">_______________________<br>Psicopedagoga</p>
    </body></html>`)
    w.document.close(); w.print()
  }

  return (
    <div>
      {/* Cabeçalho */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
        <span style={{ fontSize: 13, fontWeight: 600, color: '#374151' }}>{encaminhamentos.length} encaminhamento(s)</span>
        <button onClick={() => setShowForm(!showForm)} style={{ padding: '7px 16px', borderRadius: 7, fontSize: 12, fontWeight: 600, border: 'none', background: cor, color: '#fff', cursor: 'pointer' }}>
          + Novo encaminhamento
        </button>
      </div>

      {/* Formulário */}
      {showForm && (
        <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 10, padding: 20, marginBottom: 14 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 14 }}>Novo encaminhamento</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
            <div>
              <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: '#6b7280', marginBottom: 5, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Profissional *</label>
              <input value={form.profissional} onChange={e => setForm({ ...form, profissional: e.target.value })} placeholder="Nome do profissional" style={iStyle} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: '#6b7280', marginBottom: 5, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Especialidade</label>
              <select value={form.especialidade} onChange={e => setForm({ ...form, especialidade: e.target.value })} style={iStyle}>
                <option value="">Selecione...</option>
                {ESPECIALIDADES.map(e => <option key={e}>{e}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: '#6b7280', marginBottom: 5, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Data *</label>
              <input type="date" value={form.data} onChange={e => setForm({ ...form, data: e.target.value })} style={iStyle} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: '#6b7280', marginBottom: 5, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Motivo</label>
              <input value={form.motivo} onChange={e => setForm({ ...form, motivo: e.target.value })} placeholder="Motivo do encaminhamento" style={iStyle} />
            </div>
            <div style={{ gridColumn: 'span 2' }}>
              <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: '#6b7280', marginBottom: 5, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Observações clínicas</label>
              <textarea rows={3} value={form.observacoes} onChange={e => setForm({ ...form, observacoes: e.target.value })} placeholder="Informações relevantes para o profissional..." style={{ ...iStyle, resize: 'vertical' }} />
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={() => setShowForm(false)} style={{ padding: '7px 14px', borderRadius: 7, fontSize: 12, border: '1px solid #d1d5db', background: '#fff', color: '#374151', cursor: 'pointer' }}>Cancelar</button>
            <button onClick={handleAdd} disabled={!form.profissional || !form.data || loading} style={{ padding: '7px 16px', borderRadius: 7, fontSize: 12, fontWeight: 600, border: 'none', background: cor, color: '#fff', cursor: 'pointer' }}>
              {loading ? 'Salvando...' : 'Salvar encaminhamento'}
            </button>
          </div>
        </div>
      )}

      {/* Lista */}
      {encaminhamentos.length === 0 ? (
        <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 10, padding: '40px 20px', textAlign: 'center' }}>
          <div style={{ fontSize: 13, color: '#9ca3af' }}>Nenhum encaminhamento registrado.</div>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {encaminhamentos.map((enc: any) => (
            <div key={enc.id} style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 10, padding: '14px 18px', display: 'flex', alignItems: 'flex-start', gap: 14 }}>
              <div style={{ width: 38, height: 38, borderRadius: 8, background: '#f0f9ff', color: '#0284c7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, flexShrink: 0 }}>
                →
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#111827', marginBottom: 2 }}>{enc.profissional}</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, fontSize: 12, color: '#6b7280', marginBottom: enc.motivo ? 6 : 0 }}>
                  {enc.especialidade && <span style={{ background: '#f0f9ff', color: '#0284c7', padding: '1px 8px', borderRadius: 10, fontWeight: 500 }}>{enc.especialidade}</span>}
                  <span>{enc.data}</span>
                </div>
                {enc.motivo && <div style={{ fontSize: 12, color: '#374151' }}>{enc.motivo}</div>}
                {enc.observacoes && <div style={{ fontSize: 12, color: '#6b7280', marginTop: 4, fontStyle: 'italic' }}>{enc.observacoes}</div>}
              </div>
              <div style={{ display: 'flex', gap: 10, flexShrink: 0 }}>
                <button onClick={() => handlePrint(enc)} style={{ fontSize: 12, color: '#6b7280', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 500 }}>Imprimir</button>
                <button onClick={() => handleDelete(enc.id)} style={{ fontSize: 12, color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 500 }}>Excluir</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
