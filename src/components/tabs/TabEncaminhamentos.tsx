'use client'
import { useState } from 'react'

const iStyle = { width: '100%', padding: '9px 12px', borderRadius: 7, fontSize: 13, border: '1px solid #d1d5db', outline: 'none', background: '#fff', color: '#111827' }

const ESPECIALIDADES = ['Fonoaudiologia', 'Neurologia', 'Neuropsicologia', 'Psicologia', 'Psiquiatria', 'Terapia Ocupacional', 'Fisioterapia', 'Oftalmologia', 'Otorrinolaringologia', 'Outro']

interface Props {
  encaminhamentos: any[]
  entityId: string
  idField: string
  cor: string
  pessoa: any
  tipoPessoa: 'aluno' | 'paciente'
}

export default function TabEncaminhamentos({ encaminhamentos: initial, entityId, idField, cor, pessoa, tipoPessoa }: Props) {
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

    const dataBR = enc.data ? new Date(enc.data + 'T12:00:00').toLocaleDateString('pt-BR') : enc.data
    const hoje = new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })
    const nascimento = pessoa.dataNascimento
      ? new Date(pessoa.dataNascimento + 'T12:00:00').toLocaleDateString('pt-BR')
      : null

    w.document.write(`<!DOCTYPE html>
<html><head><title>Encaminhamento — ${pessoa.nome}</title>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Times New Roman', serif; max-width: 720px; margin: 50px auto; padding: 0 40px; color: #222; font-size: 14px; line-height: 1.8; }
  h1 { text-align: center; font-size: 18px; letter-spacing: 2px; margin-bottom: 6px; text-transform: uppercase; }
  .subtitle { text-align: center; font-size: 12px; color: #555; margin-bottom: 30px; }
  .divider { border: none; border-top: 2px solid #222; margin: 10px 0 24px; }
  .section { margin-bottom: 18px; }
  .section-title { font-size: 12px; font-weight: bold; letter-spacing: 1px; text-transform: uppercase; color: #555; margin-bottom: 4px; }
  .field { margin-bottom: 10px; }
  .field strong { font-size: 13px; }
  .box { border: 1px solid #ccc; border-radius: 4px; padding: 10px 14px; background: #fafafa; margin-top: 4px; font-size: 13px; }
  .assinatura { margin-top: 70px; text-align: center; }
  .linha { border-top: 1px solid #333; width: 260px; margin: 0 auto 6px; }
  .cidade-data { text-align: right; font-size: 13px; margin-bottom: 40px; color: #444; }
  @media print { body { margin: 0; padding: 20px 40px; } }
</style>
</head><body>

  <h1>Encaminhamento</h1>
  <div class="subtitle">Documento de Encaminhamento Profissional</div>
  <hr class="divider">

  <div class="section">
    <div class="section-title">Dados do Paciente / Aluno</div>
    <div class="field"><strong>Nome:</strong> ${pessoa.nome}</div>
    ${nascimento ? `<div class="field"><strong>Data de nascimento:</strong> ${nascimento}</div>` : ''}
    ${pessoa.escola ? `<div class="field"><strong>Escola:</strong> ${pessoa.escola}${pessoa.serie ? ` &nbsp;|&nbsp; Série: ${pessoa.serie}` : ''}</div>` : ''}
    ${pessoa.responsavel ? `<div class="field"><strong>Responsável:</strong> ${pessoa.responsavel}${pessoa.telefone ? ` &nbsp;|&nbsp; Tel: ${pessoa.telefone}` : ''}</div>` : ''}
    ${tipoPessoa === 'paciente' && pessoa.queixaPrincipal ? `<div class="field"><strong>Queixa principal:</strong> ${pessoa.queixaPrincipal}</div>` : ''}
  </div>

  <div class="section">
    <div class="section-title">Encaminhamento</div>
    <div class="field"><strong>Data:</strong> ${dataBR}</div>
    <div class="field"><strong>Encaminhado para:</strong> ${enc.profissional}</div>
    ${enc.especialidade ? `<div class="field"><strong>Especialidade:</strong> ${enc.especialidade}</div>` : ''}
  </div>

  ${enc.motivo ? `
  <div class="section">
    <div class="section-title">Motivo do Encaminhamento</div>
    <div class="box">${enc.motivo.replace(/\n/g, '<br>')}</div>
  </div>` : ''}

  ${enc.observacoes ? `
  <div class="section">
    <div class="section-title">Observações Clínicas</div>
    <div class="box">${enc.observacoes.replace(/\n/g, '<br>')}</div>
  </div>` : ''}

  ${pessoa.observacoes ? `
  <div class="section">
    <div class="section-title">Observações Gerais do Prontuário</div>
    <div class="box">${pessoa.observacoes.replace(/\n/g, '<br>')}</div>
  </div>` : ''}

  <div class="cidade-data">${hoje}</div>

  <div class="assinatura">
    <div class="linha"></div>
    <div>Psicopedagoga Responsável</div>
  </div>

</body></html>`)
    w.document.close()
    w.print()
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
              <textarea rows={5} value={form.observacoes} onChange={e => { setForm({ ...form, observacoes: e.target.value }); e.target.style.height = 'auto'; e.target.style.height = e.target.scrollHeight + 'px' }} placeholder="Informações relevantes para o profissional..." style={{ ...iStyle, resize: 'none', minHeight: 110, overflow: 'hidden' }} />
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
              <div style={{ width: 38, height: 38, borderRadius: 8, background: '#f0f9ff', color: '#0284c7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, flexShrink: 0 }}>→</div>
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
