'use client'
import { useState } from 'react'

const iStyle = { width: '100%', padding: '9px 12px', borderRadius: 7, fontSize: 13, border: '1px solid #d1d5db', outline: 'none', background: '#fff', color: '#111827' }

export default function TabSessoes({ sessoes: initial, entityId, idField, cor }: { sessoes: any[]; entityId: string; idField: string; cor: string }) {
  const [sessoes, setSessoes] = useState(initial)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ data: '', presente: true, justificada: false, observacoes: '' })
  const [loading, setLoading] = useState(false)

  async function handleAdd() {
    if (!form.data) return
    setLoading(true)
    const res = await fetch('/api/sessoes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, [idField]: entityId }),
    })
    if (res.ok) {
      const nova = await res.json()
      setSessoes([nova, ...sessoes])
      setForm({ data: '', presente: true, justificada: false, observacoes: '' })
      setShowForm(false)
    }
    setLoading(false)
  }

  async function handleDelete(id: string) {
    if (!confirm('Excluir esta sessão?')) return
    await fetch(`/api/sessoes/${id}`, { method: 'DELETE' })
    setSessoes(sessoes.filter(s => s.id !== id))
  }

  function gerarAtestado() {
    const presencas = sessoes.filter(s => s.presente)
    const faltas = sessoes.filter(s => !s.presente)
    const linhas = sessoes.map(s =>
      `${s.data}   ${s.presente ? 'PRESENTE' : s.justificada ? 'FALTA JUSTIFICADA' : 'FALTA'}${s.observacoes ? '   ' + s.observacoes : ''}`
    ).join('\n')
    const texto = `ATESTADO DE FREQUÊNCIA\n${'─'.repeat(50)}\n\nTotal de sessões: ${sessoes.length}\nPresenças: ${presencas.length}\nFaltas: ${faltas.length}\nFrequência: ${sessoes.length > 0 ? Math.round((presencas.length / sessoes.length) * 100) : 0}%\n\n${'─'.repeat(50)}\nREGISTRO DAS SESSÕES\n${'─'.repeat(50)}\n\n${linhas}\n\n${'─'.repeat(50)}\nEmitido em: ${new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}`
    const blob = new Blob([texto], { type: 'text/plain' })
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'atestado-frequencia.txt'; a.click()
  }

  const presencas = sessoes.filter(s => s.presente).length
  const faltas = sessoes.filter(s => !s.presente).length
  const freq = sessoes.length > 0 ? Math.round((presencas / sessoes.length) * 100) : 0

  return (
    <div>
      {/* Cards de resumo */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 16 }}>
        {[
          { label: 'Total de sessões', value: sessoes.length, color: '#374151' },
          { label: 'Presenças', value: presencas, color: '#16a34a' },
          { label: 'Faltas', value: faltas, color: '#dc2626' },
          { label: 'Frequência', value: `${freq}%`, color: freq >= 75 ? '#16a34a' : '#d97706' },
        ].map(c => (
          <div key={c.label} style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 10, padding: '14px 16px' }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 6 }}>{c.label}</div>
            <div style={{ fontSize: 26, fontWeight: 700, color: c.color }}>{c.value}</div>
          </div>
        ))}
      </div>

      {/* Barra de ações */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <span style={{ fontSize: 13, fontWeight: 600, color: '#374151' }}>Registro de sessões</span>
        <div style={{ display: 'flex', gap: 8 }}>
          {sessoes.length > 0 && (
            <button onClick={gerarAtestado} style={{ padding: '7px 14px', borderRadius: 7, fontSize: 12, fontWeight: 500, border: '1px solid #d1d5db', background: '#fff', color: '#374151', cursor: 'pointer' }}>
              Gerar atestado
            </button>
          )}
          <button onClick={() => setShowForm(!showForm)} style={{ padding: '7px 16px', borderRadius: 7, fontSize: 12, fontWeight: 600, border: 'none', background: cor, color: '#fff', cursor: 'pointer' }}>
            + Registrar sessão
          </button>
        </div>
      </div>

      {/* Formulário */}
      {showForm && (
        <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 10, padding: 20, marginBottom: 14 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 14 }}>Nova sessão</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
            <div>
              <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: '#6b7280', marginBottom: 5, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Data *</label>
              <input type="date" value={form.data} onChange={e => setForm({ ...form, data: e.target.value })} style={iStyle} />
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 20, paddingBottom: 2 }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, cursor: 'pointer', color: '#374151' }}>
                <input type="checkbox" checked={form.presente} onChange={e => setForm({ ...form, presente: e.target.checked, justificada: false })} style={{ width: 15, height: 15 }} />
                Presente
              </label>
              {!form.presente && (
                <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, cursor: 'pointer', color: '#374151' }}>
                  <input type="checkbox" checked={form.justificada} onChange={e => setForm({ ...form, justificada: e.target.checked })} style={{ width: 15, height: 15 }} />
                  Falta justificada
                </label>
              )}
            </div>
            <div style={{ gridColumn: 'span 2' }}>
              <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: '#6b7280', marginBottom: 5, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Observações</label>
              <input value={form.observacoes} onChange={e => setForm({ ...form, observacoes: e.target.value })} placeholder="Anotações sobre a sessão..." style={iStyle} />
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={() => setShowForm(false)} style={{ padding: '7px 14px', borderRadius: 7, fontSize: 12, border: '1px solid #d1d5db', background: '#fff', color: '#374151', cursor: 'pointer' }}>Cancelar</button>
            <button onClick={handleAdd} disabled={!form.data || loading} style={{ padding: '7px 16px', borderRadius: 7, fontSize: 12, fontWeight: 600, border: 'none', background: cor, color: '#fff', cursor: !form.data ? 'not-allowed' : 'pointer', opacity: !form.data ? 0.6 : 1 }}>
              {loading ? 'Salvando...' : 'Salvar sessão'}
            </button>
          </div>
        </div>
      )}

      {/* Lista */}
      {sessoes.length === 0 ? (
        <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 10, padding: '40px 20px', textAlign: 'center' }}>
          <div style={{ fontSize: 11, fontWeight: 500, color: '#9ca3af', marginBottom: 8 }}>Nenhuma sessão registrada</div>
          <div style={{ fontSize: 13, color: '#6b7280' }}>Use o botão "Registrar sessão" para começar.</div>
        </div>
      ) : (
        <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 10, overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
                {['Data', 'Status', 'Observações', ''].map(h => (
                  <th key={h} style={{ textAlign: 'left', padding: '11px 16px', fontSize: 11, fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sessoes.map((s, i) => (
                <tr key={s.id} className="table-row" style={{ borderBottom: i < sessoes.length - 1 ? '1px solid #f3f4f6' : 'none' }}>
                  <td style={{ padding: '12px 16px', fontSize: 13, fontWeight: 500, color: '#111827' }}>{s.data}</td>
                  <td style={{ padding: '12px 16px' }}>
                    <span style={{
                      display: 'inline-flex', alignItems: 'center', gap: 5,
                      padding: '3px 10px', borderRadius: 20, fontSize: 12, fontWeight: 500,
                      background: s.presente ? '#dcfce7' : s.justificada ? '#fef9c3' : '#fee2e2',
                      color: s.presente ? '#15803d' : s.justificada ? '#92400e' : '#b91c1c',
                    }}>
                      <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'currentColor', flexShrink: 0 }} />
                      {s.presente ? 'Presente' : s.justificada ? 'Justificada' : 'Falta'}
                    </span>
                  </td>
                  <td style={{ padding: '12px 16px', fontSize: 13, color: '#6b7280' }}>{s.observacoes || '—'}</td>
                  <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                    <button onClick={() => handleDelete(s.id)} style={{ fontSize: 12, color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 500 }}>Excluir</button>
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
