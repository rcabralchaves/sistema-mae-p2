'use client'
import { useState } from 'react'

const iStyle = { width: '100%', padding: '9px 12px', borderRadius: 7, fontSize: 13, border: '1px solid #d1d5db', outline: 'none', background: '#fff', color: '#111827' }

const TEMPLATE = `CONTRATO DE PRESTAÇÃO DE SERVIÇOS PSICOPEDAGÓGICOS

Pelo presente instrumento particular, de um lado [NOME DO RESPONSÁVEL], responsável pelo(a) menor [NOME DO ALUNO/PACIENTE], e de outro lado [SEU NOME], psicopedagoga, doravante denominada CONTRATADA, acordam o seguinte:

1. OBJETO
A CONTRATADA prestará serviços de atendimento psicopedagógico ao(à) menor acima identificado(a).

2. VALOR E FORMA DE PAGAMENTO
O valor da sessão será de R$ [VALOR], a ser pago [FORMA DE PAGAMENTO].

3. PERIODICIDADE
Os atendimentos ocorrerão [PERIODICIDADE], conforme agenda a ser definida entre as partes.

4. CANCELAMENTO
O cancelamento deverá ser comunicado com antecedência mínima de 24 horas.

5. VIGÊNCIA
O presente contrato vigorará de [DATA INÍCIO] a [DATA FIM], podendo ser renovado mediante acordo das partes.

Local e data: ___________________________

_______________________          _______________________
CONTRATANTE                      CONTRATADA`

export default function TabContratos({ contratos: initial, entityId, idField, cor }: { contratos: any[]; entityId: string; idField: string; cor: string }) {
  const [contratos, setContratos] = useState(initial)
  const [showForm, setShowForm] = useState(false)
  const [selected, setSelected] = useState<any>(null)
  const [form, setForm] = useState({ titulo: 'Contrato de Atendimento', conteudo: TEMPLATE, dataInicio: '', dataFim: '', valor: '' })
  const [loading, setLoading] = useState(false)

  async function handleAdd() {
    setLoading(true)
    const res = await fetch('/api/contratos', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, [idField]: entityId }),
    })
    if (res.ok) {
      const novo = await res.json()
      setContratos([novo, ...contratos])
      setShowForm(false)
      setForm({ titulo: 'Contrato de Atendimento', conteudo: TEMPLATE, dataInicio: '', dataFim: '', valor: '' })
    }
    setLoading(false)
  }

  async function handleDelete(id: string) {
    if (!confirm('Excluir este contrato permanentemente?')) return
    await fetch(`/api/contratos/${id}`, { method: 'DELETE' })
    setContratos(contratos.filter((c: any) => c.id !== id))
    if (selected?.id === id) setSelected(null)
  }

  function handlePrint(contrato: any) {
    const w = window.open('', '_blank')
    if (!w) return
    w.document.write(`<html><head><title>${contrato.titulo}</title><style>body{font-family:serif;max-width:800px;margin:60px auto;line-height:2;font-size:15px;white-space:pre-wrap;color:#222}</style></head><body>${contrato.conteudo}</body></html>`)
    w.document.close(); w.print()
  }

  // Visualização do contrato selecionado
  if (selected) {
    return (
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
          <button onClick={() => setSelected(null)} style={{ fontSize: 13, color: cor, background: 'none', border: 'none', cursor: 'pointer', fontWeight: 500 }}>← Voltar</button>
          <span style={{ fontSize: 14, fontWeight: 600, color: '#111827', flex: 1 }}>{selected.titulo}</span>
          <button onClick={() => handlePrint(selected)} style={{ padding: '7px 16px', borderRadius: 7, fontSize: 12, fontWeight: 600, border: 'none', background: cor, color: '#fff', cursor: 'pointer' }}>
            Imprimir
          </button>
        </div>
        <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 10, padding: '28px 32px' }}>
          {selected.dataInicio && (
            <div style={{ display: 'flex', gap: 24, marginBottom: 20, fontSize: 13, color: '#6b7280' }}>
              {selected.valor && <span>Valor: <strong style={{ color: '#111827' }}>R$ {selected.valor}</strong></span>}
              {selected.dataInicio && <span>Início: <strong style={{ color: '#111827' }}>{selected.dataInicio}</strong></span>}
              {selected.dataFim && <span>Término: <strong style={{ color: '#111827' }}>{selected.dataFim}</strong></span>}
            </div>
          )}
          <pre style={{ fontSize: 13, color: '#374151', whiteSpace: 'pre-wrap', lineHeight: 1.8, fontFamily: 'Georgia, serif', margin: 0 }}>
            {selected.conteudo}
          </pre>
        </div>
      </div>
    )
  }

  return (
    <div>
      {/* Cabeçalho */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
        <span style={{ fontSize: 13, fontWeight: 600, color: '#374151' }}>{contratos.length} contrato(s)</span>
        <button onClick={() => setShowForm(!showForm)} style={{ padding: '7px 16px', borderRadius: 7, fontSize: 12, fontWeight: 600, border: 'none', background: cor, color: '#fff', cursor: 'pointer' }}>
          + Novo contrato
        </button>
      </div>

      {/* Formulário */}
      {showForm && (
        <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 10, padding: 20, marginBottom: 14 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 14 }}>Novo contrato</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginBottom: 12 }}>
            <div style={{ gridColumn: 'span 3' }}>
              <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: '#6b7280', marginBottom: 5, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Título</label>
              <input value={form.titulo} onChange={e => setForm({ ...form, titulo: e.target.value })} style={iStyle} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: '#6b7280', marginBottom: 5, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Valor (R$)</label>
              <input value={form.valor} onChange={e => setForm({ ...form, valor: e.target.value })} placeholder="Ex: 150,00" style={iStyle} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: '#6b7280', marginBottom: 5, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Data de início</label>
              <input type="date" value={form.dataInicio} onChange={e => setForm({ ...form, dataInicio: e.target.value })} style={iStyle} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: '#6b7280', marginBottom: 5, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Data de término</label>
              <input type="date" value={form.dataFim} onChange={e => setForm({ ...form, dataFim: e.target.value })} style={iStyle} />
            </div>
            <div style={{ gridColumn: 'span 3' }}>
              <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: '#6b7280', marginBottom: 5, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Conteúdo do contrato</label>
              <textarea rows={12} value={form.conteudo} onChange={e => setForm({ ...form, conteudo: e.target.value })} style={{ ...iStyle, resize: 'vertical', fontFamily: 'monospace', fontSize: 12, lineHeight: 1.6 }} />
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={() => setShowForm(false)} style={{ padding: '7px 14px', borderRadius: 7, fontSize: 12, border: '1px solid #d1d5db', background: '#fff', color: '#374151', cursor: 'pointer' }}>Cancelar</button>
            <button onClick={handleAdd} disabled={loading} style={{ padding: '7px 16px', borderRadius: 7, fontSize: 12, fontWeight: 600, border: 'none', background: cor, color: '#fff', cursor: 'pointer' }}>
              {loading ? 'Salvando...' : 'Salvar contrato'}
            </button>
          </div>
        </div>
      )}

      {/* Lista */}
      {contratos.length === 0 ? (
        <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 10, padding: '40px 20px', textAlign: 'center' }}>
          <div style={{ fontSize: 13, color: '#9ca3af' }}>Nenhum contrato cadastrado.</div>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {contratos.map((c: any) => (
            <div key={c.id} style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 10, padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#111827', marginBottom: 3 }}>{c.titulo}</div>
                <div style={{ display: 'flex', gap: 16, fontSize: 12, color: '#6b7280' }}>
                  {c.valor && <span>R$ {c.valor}</span>}
                  {c.dataInicio && <span>Início: {c.dataInicio}</span>}
                  {c.dataFim && <span>Término: {c.dataFim}</span>}
                  <span>{new Date(c.createdAt).toLocaleDateString('pt-BR')}</span>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 10, flexShrink: 0 }}>
                <button onClick={() => setSelected(c)} style={{ fontSize: 12, color: cor, background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }}>Ver</button>
                <button onClick={() => handlePrint(c)} style={{ fontSize: 12, color: '#6b7280', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 500 }}>Imprimir</button>
                <button onClick={() => handleDelete(c.id)} style={{ fontSize: 12, color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 500 }}>Excluir</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
