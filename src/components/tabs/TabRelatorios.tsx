'use client'
import { useState } from 'react'

const iStyle = { width: '100%', padding: '9px 12px', borderRadius: 7, fontSize: 13, border: '1px solid #d1d5db', outline: 'none', background: '#fff', color: '#111827' }

const TIPOS = [
  { value: 'psicopedagogico',       label: 'Relatório Psicopedagógico',   color: '#6d28d9', bg: '#f5f3ff' },
  { value: 'parecer_psicopedagogico', label: 'Parecer Psicopedagógico',   color: '#0284c7', bg: '#f0f9ff' },
  { value: 'parecer_psicologico',   label: 'Parecer Psicológico',         color: '#16a34a', bg: '#f0fdf4' },
]

const TEMPLATES: Record<string, string> = {
  psicopedagogico: `RELATÓRIO PSICOPEDAGÓGICO

Aluno(a): ___________________________
Data de nascimento: ___________________
Escola: _______________________________
Série: ________________________________
Período de avaliação: __________________

I. DADOS RELEVANTES DO HISTÓRICO

[Descreva aqui o histórico escolar, queixas e encaminhamentos anteriores]

II. INSTRUMENTOS UTILIZADOS NA AVALIAÇÃO

[Liste os testes e instrumentos utilizados]

III. DESENVOLVIMENTO DA AVALIAÇÃO

[Descreva as sessões, comportamento e desempenho observados]

IV. ANÁLISE DOS RESULTADOS

[Análise interpretativa dos resultados obtidos]

V. CONCLUSÃO E ORIENTAÇÕES

[Conclusão e recomendações para escola, família e demais profissionais]

Local e data: ___________________________

_______________________
Psicopedagoga`,

  parecer_psicopedagogico: `PARECER PSICOPEDAGÓGICO

Aluno(a): ___________________________
Data: ________________________________

Venho por meio deste parecer informar que o(a) aluno(a) acima identificado(a) encontra-se em acompanhamento psicopedagógico.

[Descreva a situação atual do aluno, evolução observada e orientações]

Coloco-me à disposição para quaisquer esclarecimentos.

_______________________
Psicopedagoga`,

  parecer_psicologico: `PARECER PSICOLÓGICO

Paciente: ____________________________
Data: ________________________________

[Descreva a situação clínica, observações e orientações]

_______________________
Profissional`,
}

export default function TabRelatorios({ relatorios: initial, entityId, idField, cor }: { relatorios: any[]; entityId: string; idField: string; cor: string }) {
  const [relatorios, setRelatorios] = useState(initial)
  const [showForm, setShowForm] = useState(false)
  const [selected, setSelected] = useState<any>(null)
  const [tipo, setTipo] = useState('psicopedagogico')
  const [form, setForm] = useState({ titulo: 'Relatório Psicopedagógico', conteudo: TEMPLATES.psicopedagogico })
  const [loading, setLoading] = useState(false)

  function handleTipoChange(t: string) {
    setTipo(t)
    const label = TIPOS.find(x => x.value === t)?.label || ''
    setForm({ titulo: label, conteudo: TEMPLATES[t] || '' })
  }

  async function handleAdd() {
    setLoading(true)
    const res = await fetch('/api/relatorios', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, tipo, [idField]: entityId }),
    })
    if (res.ok) {
      const novo = await res.json()
      setRelatorios([novo, ...relatorios])
      setShowForm(false)
      setTipo('psicopedagogico')
      setForm({ titulo: 'Relatório Psicopedagógico', conteudo: TEMPLATES.psicopedagogico })
    }
    setLoading(false)
  }

  async function handleDelete(id: string) {
    if (!confirm('Excluir este relatório permanentemente?')) return
    await fetch(`/api/relatorios/${id}`, { method: 'DELETE' })
    setRelatorios(relatorios.filter((r: any) => r.id !== id))
    if (selected?.id === id) setSelected(null)
  }

  function handlePrint(r: any) {
    const w = window.open('', '_blank')
    if (!w) return
    w.document.write(`<html><head><title>${r.titulo}</title><style>body{font-family:serif;max-width:800px;margin:60px auto;line-height:2;font-size:15px;white-space:pre-wrap;color:#222}</style></head><body>${r.conteudo}</body></html>`)
    w.document.close(); w.print()
  }

  // Visualização do relatório selecionado
  if (selected) {
    const tipoInfo = TIPOS.find(t => t.value === selected.tipo)
    return (
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
          <button onClick={() => setSelected(null)} style={{ fontSize: 13, color: cor, background: 'none', border: 'none', cursor: 'pointer', fontWeight: 500 }}>← Voltar</button>
          <span style={{ fontSize: 14, fontWeight: 600, color: '#111827', flex: 1 }}>{selected.titulo}</span>
          {tipoInfo && (
            <span style={{ fontSize: 11, padding: '3px 10px', borderRadius: 20, background: tipoInfo.bg, color: tipoInfo.color, fontWeight: 600 }}>{tipoInfo.label}</span>
          )}
          <button onClick={() => handlePrint(selected)} style={{ padding: '7px 16px', borderRadius: 7, fontSize: 12, fontWeight: 600, border: 'none', background: cor, color: '#fff', cursor: 'pointer' }}>
            Imprimir
          </button>
        </div>
        <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 10, padding: '32px 36px' }}>
          <pre style={{ fontSize: 14, color: '#374151', whiteSpace: 'pre-wrap', lineHeight: 2, fontFamily: 'Georgia, serif', margin: 0 }}>
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
        <span style={{ fontSize: 13, fontWeight: 600, color: '#374151' }}>{relatorios.length} relatório(s)</span>
        <button onClick={() => setShowForm(!showForm)} style={{ padding: '7px 16px', borderRadius: 7, fontSize: 12, fontWeight: 600, border: 'none', background: cor, color: '#fff', cursor: 'pointer' }}>
          + Novo relatório
        </button>
      </div>

      {/* Formulário */}
      {showForm && (
        <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 10, padding: 20, marginBottom: 14 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 14 }}>Novo relatório / parecer</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
            <div>
              <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: '#6b7280', marginBottom: 5, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Tipo de documento</label>
              <select value={tipo} onChange={e => handleTipoChange(e.target.value)} style={iStyle}>
                {TIPOS.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: '#6b7280', marginBottom: 5, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Título</label>
              <input value={form.titulo} onChange={e => setForm({ ...form, titulo: e.target.value })} style={iStyle} />
            </div>
            <div style={{ gridColumn: 'span 2' }}>
              <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: '#6b7280', marginBottom: 5, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Conteúdo</label>
              <textarea rows={18} value={form.conteudo} onChange={e => setForm({ ...form, conteudo: e.target.value })} style={{ ...iStyle, resize: 'vertical', fontFamily: 'Georgia, serif', lineHeight: 1.8 }} />
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={() => setShowForm(false)} style={{ padding: '7px 14px', borderRadius: 7, fontSize: 12, border: '1px solid #d1d5db', background: '#fff', color: '#374151', cursor: 'pointer' }}>Cancelar</button>
            <button onClick={handleAdd} disabled={loading} style={{ padding: '7px 16px', borderRadius: 7, fontSize: 12, fontWeight: 600, border: 'none', background: cor, color: '#fff', cursor: 'pointer' }}>
              {loading ? 'Salvando...' : 'Salvar documento'}
            </button>
          </div>
        </div>
      )}

      {/* Lista */}
      {relatorios.length === 0 ? (
        <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 10, padding: '40px 20px', textAlign: 'center' }}>
          <div style={{ fontSize: 13, color: '#9ca3af' }}>Nenhum relatório cadastrado.</div>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {relatorios.map((r: any) => {
            const tipoInfo = TIPOS.find(t => t.value === r.tipo)
            return (
              <div key={r.id} style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 10, padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#111827', marginBottom: 4 }}>{r.titulo}</div>
                  <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                    {tipoInfo && (
                      <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 10, background: tipoInfo.bg, color: tipoInfo.color, fontWeight: 500 }}>{tipoInfo.label}</span>
                    )}
                    <span style={{ fontSize: 12, color: '#9ca3af' }}>{new Date(r.createdAt).toLocaleDateString('pt-BR')}</span>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 10, flexShrink: 0 }}>
                  <button onClick={() => setSelected(r)} style={{ fontSize: 12, color: cor, background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }}>Ver</button>
                  <button onClick={() => handlePrint(r)} style={{ fontSize: 12, color: '#6b7280', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 500 }}>Imprimir</button>
                  <button onClick={() => handleDelete(r.id)} style={{ fontSize: 12, color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 500 }}>Excluir</button>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
