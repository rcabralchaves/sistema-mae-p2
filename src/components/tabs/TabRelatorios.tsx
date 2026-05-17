'use client'
import { useState } from 'react'

const iStyle = { width: '100%', padding: '9px 12px', borderRadius: 7, fontSize: 13, border: '1px solid #d1d5db', outline: 'none', background: '#fff', color: '#111827' }

const TIPOS = [
  { value: 'psicopedagogico',         label: 'Relatório Psicopedagógico',  color: '#6d28d9', bg: '#f5f3ff' },
  { value: 'parecer_psicopedagogico', label: 'Parecer Psicopedagógico',    color: '#0284c7', bg: '#f0f9ff' },
  { value: 'parecer_psicologico',     label: 'Parecer Psicológico',        color: '#16a34a', bg: '#f0fdf4' },
]

const NIVEL_STYLE: Record<string, { color: string; bg: string }> = {
  Alto:     { color: '#dc2626', bg: '#fef2f2' },
  Moderado: { color: '#d97706', bg: '#fffbeb' },
  Leve:     { color: '#2563eb', bg: '#eff6ff' },
  Mínimo:   { color: '#16a34a', bg: '#f0fdf4' },
}

const TIPO_TESTE_LABEL: Record<string, string> = {
  tdah: 'TDAH', autismo: 'TEA / Autismo', dislexia: 'Dislexia', cars: 'CARS',
  snap4: 'SNAP-IV', eoca: 'EOCA', motora_fina: 'Coord. Motora Fina',
  disgrafia: 'Disgrafia', disortografia: 'Disortografia', lateralidade: 'Lateralidade',
  psicopedagogica: 'Aval. Psicopedagógica', tpac: 'TPAC',
  discalculia: 'Discalculia', altas_habilidades: 'Altas Habilidades',
}

function gerarTemplate(tipo: string, pessoa: any, tipoPessoa: string): string {
  const nome = pessoa.nome || '___________________________'
  const nasc = pessoa.dataNascimento
    ? new Date(pessoa.dataNascimento + 'T12:00:00').toLocaleDateString('pt-BR')
    : '___________________________'
  const escola = pessoa.escola || '___________________________'
  const serie = pessoa.serie || '___________________________'
  const responsavel = pessoa.responsavel || '___________________________'
  const hoje = new Date().toLocaleDateString('pt-BR')
  const queixa = tipoPessoa === 'paciente' ? (pessoa.queixaPrincipal || '') : ''
  const obs = pessoa.observacoes || ''

  if (tipo === 'psicopedagogico') {
    return `RELATÓRIO PSICOPEDAGÓGICO

${tipoPessoa === 'aluno' ? 'Aluno(a)' : 'Paciente'}: ${nome}
Data de nascimento: ${nasc}
${tipoPessoa === 'aluno' ? `Escola: ${escola}\nSérie: ${serie}\n` : ''}${pessoa.responsavel ? `Responsável: ${responsavel}\n` : ''}Período de avaliação: ___________________________

I. DADOS RELEVANTES DO HISTÓRICO

${queixa ? `Queixa principal: ${queixa}\n\n` : ''}${obs ? `Histórico e observações: ${obs}\n\n` : ''}[Descreva aqui o histórico escolar, queixas e encaminhamentos anteriores]

II. INSTRUMENTOS UTILIZADOS NA AVALIAÇÃO

[Liste os testes e instrumentos utilizados]

III. DESENVOLVIMENTO DA AVALIAÇÃO

[Descreva as sessões, comportamento e desempenho observados]

IV. ANÁLISE DOS RESULTADOS

[Análise interpretativa dos resultados obtidos]

V. CONCLUSÃO E ORIENTAÇÕES

[Conclusão e recomendações para escola, família e demais profissionais]

Local e data: ${hoje}

_______________________
Psicopedagoga`
  }

  if (tipo === 'parecer_psicopedagogico') {
    return `PARECER PSICOPEDAGÓGICO

${tipoPessoa === 'aluno' ? 'Aluno(a)' : 'Paciente'}: ${nome}
Data: ${hoje}

Venho por meio deste parecer informar que o(a) ${tipoPessoa === 'aluno' ? 'aluno(a)' : 'paciente'} acima identificado(a) encontra-se em acompanhamento psicopedagógico.

${obs ? `Observações do prontuário: ${obs}\n\n` : ''}[Descreva a situação atual, evolução observada e orientações]

Coloco-me à disposição para quaisquer esclarecimentos.

_______________________
Psicopedagoga`
  }

  return `PARECER PSICOLÓGICO

Paciente: ${nome}
Data: ${hoje}

${obs ? `Observações: ${obs}\n\n` : ''}[Descreva a situação clínica, observações e orientações]

_______________________
Profissional`
}

interface Props {
  relatorios: any[]
  entityId: string
  idField: string
  cor: string
  pessoa: any
  tipoPessoa: 'aluno' | 'paciente'
  testes: any[]
}

export default function TabRelatorios({ relatorios: initial, entityId, idField, cor, pessoa, tipoPessoa, testes }: Props) {
  const [relatorios, setRelatorios] = useState(initial)
  const [showForm, setShowForm] = useState(false)
  const [selected, setSelected] = useState<any>(null)
  const [tipo, setTipo] = useState('psicopedagogico')
  const [form, setForm] = useState({
    titulo: 'Relatório Psicopedagógico',
    conteudo: gerarTemplate('psicopedagogico', pessoa, tipoPessoa),
  })
  const [loading, setLoading] = useState(false)

  function handleTipoChange(t: string) {
    setTipo(t)
    const label = TIPOS.find(x => x.value === t)?.label || ''
    setForm({ titulo: label, conteudo: gerarTemplate(t, pessoa, tipoPessoa) })
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
      setForm({ titulo: 'Relatório Psicopedagógico', conteudo: gerarTemplate('psicopedagogico', pessoa, tipoPessoa) })
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

    const hoje = new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })
    const nascimento = pessoa.dataNascimento
      ? new Date(pessoa.dataNascimento + 'T12:00:00').toLocaleDateString('pt-BR')
      : null
    const tipoInfo = TIPOS.find(t => t.value === r.tipo)

    // Monta seção de testes se houver
    const testesHtml = testes.length > 0 ? `
      <div class="section">
        <div class="section-title">Resultados dos Testes Avaliativos</div>
        <table class="test-table">
          <thead>
            <tr><th>Instrumento</th><th>Pontuação</th><th>Nível Indicativo</th><th>Data</th></tr>
          </thead>
          <tbody>
            ${testes.map(t => `
              <tr>
                <td>${TIPO_TESTE_LABEL[t.tipo] || t.tipo}</td>
                <td style="text-align:center">${t.pontuacao ?? '—'}</td>
                <td style="text-align:center;font-weight:bold;color:${t.nivel ? (NIVEL_STYLE[t.nivel]?.color || '#374151') : '#374151'}">${t.nivel || '—'}</td>
                <td style="text-align:center">${new Date(t.createdAt).toLocaleDateString('pt-BR')}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>` : ''

    w.document.write(`<!DOCTYPE html>
<html><head><title>${r.titulo} — ${pessoa.nome}</title>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Times New Roman', serif; max-width: 750px; margin: 50px auto; padding: 0 40px; color: #222; font-size: 14px; line-height: 1.8; }
  h1 { text-align: center; font-size: 18px; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 4px; }
  .tipo-badge { text-align: center; font-size: 12px; color: #555; margin-bottom: 6px; }
  .divider { border: none; border-top: 2px solid #222; margin: 10px 0 24px; }
  .section { margin-bottom: 22px; }
  .section-title { font-size: 11px; font-weight: bold; letter-spacing: 1px; text-transform: uppercase; color: #666; border-bottom: 1px solid #ddd; padding-bottom: 3px; margin-bottom: 10px; }
  .dados-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 4px 20px; margin-bottom: 6px; }
  .field { font-size: 13px; }
  .field strong { font-size: 12px; color: #555; display: block; }
  .conteudo { white-space: pre-wrap; font-size: 14px; line-height: 2; }
  .test-table { width: 100%; border-collapse: collapse; font-size: 12px; }
  .test-table th { background: #f5f5f5; padding: 6px 10px; text-align: left; font-size: 11px; border: 1px solid #ddd; }
  .test-table td { padding: 6px 10px; border: 1px solid #eee; }
  .assinatura { margin-top: 60px; text-align: center; }
  .linha { border-top: 1px solid #333; width: 260px; margin: 0 auto 6px; }
  .cidade-data { text-align: right; font-size: 13px; margin-bottom: 40px; color: #444; }
  @media print { body { margin: 0; padding: 20px 40px; } }
</style>
</head><body>

  <h1>${r.titulo}</h1>
  ${tipoInfo ? `<div class="tipo-badge">${tipoInfo.label}</div>` : ''}
  <hr class="divider">

  <div class="section">
    <div class="section-title">Identificação</div>
    <div class="dados-grid">
      <div class="field"><strong>${tipoPessoa === 'aluno' ? 'Aluno(a)' : 'Paciente'}</strong>${pessoa.nome}</div>
      ${nascimento ? `<div class="field"><strong>Data de nascimento</strong>${nascimento}</div>` : ''}
      ${pessoa.escola ? `<div class="field"><strong>Escola</strong>${pessoa.escola}</div>` : ''}
      ${pessoa.serie ? `<div class="field"><strong>Série</strong>${pessoa.serie}</div>` : ''}
      ${pessoa.responsavel ? `<div class="field"><strong>Responsável</strong>${pessoa.responsavel}</div>` : ''}
      ${pessoa.telefone ? `<div class="field"><strong>Telefone</strong>${pessoa.telefone}</div>` : ''}
      ${pessoa.convenio ? `<div class="field"><strong>Convênio</strong>${pessoa.convenio}</div>` : ''}
      ${tipoPessoa === 'paciente' && pessoa.queixaPrincipal ? `<div class="field" style="grid-column:span 2"><strong>Queixa principal</strong>${pessoa.queixaPrincipal}</div>` : ''}
    </div>
  </div>

  ${testesHtml}

  <div class="section">
    <div class="section-title">Conteúdo do Relatório</div>
    <div class="conteudo">${r.conteudo}</div>
  </div>

  <div class="cidade-data">${hoje}</div>
  <div class="assinatura">
    <div class="linha"></div>
    <div>Psicopedagoga Responsável</div>
  </div>

</body></html>`)
    w.document.close()
    w.print()
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
            Imprimir / PDF
          </button>
        </div>

        {/* Dados da pessoa no preview */}
        <div style={{ background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: 10, padding: '14px 18px', marginBottom: 12, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
          <div><div style={{ fontSize: 10, fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase' }}>Nome</div><div style={{ fontSize: 13, fontWeight: 600, color: '#111827' }}>{pessoa.nome}</div></div>
          {pessoa.dataNascimento && <div><div style={{ fontSize: 10, fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase' }}>Nascimento</div><div style={{ fontSize: 13, color: '#374151' }}>{new Date(pessoa.dataNascimento + 'T12:00:00').toLocaleDateString('pt-BR')}</div></div>}
          {pessoa.escola && <div><div style={{ fontSize: 10, fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase' }}>Escola</div><div style={{ fontSize: 13, color: '#374151' }}>{pessoa.escola}{pessoa.serie ? ` — ${pessoa.serie}` : ''}</div></div>}
          {pessoa.responsavel && <div><div style={{ fontSize: 10, fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase' }}>Responsável</div><div style={{ fontSize: 13, color: '#374151' }}>{pessoa.responsavel}</div></div>}
        </div>

        {/* Testes no preview */}
        {testes.length > 0 && (
          <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 10, overflow: 'hidden', marginBottom: 12 }}>
            <div style={{ padding: '10px 16px', background: '#f9fafb', borderBottom: '1px solid #f3f4f6', fontSize: 11, fontWeight: 600, color: '#374151', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Testes avaliativos ({testes.length})
            </div>
            <div style={{ padding: '10px 16px', display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {testes.map((t: any) => {
                const ns = t.nivel ? (NIVEL_STYLE[t.nivel] || NIVEL_STYLE['Mínimo']) : null
                return (
                  <div key={t.id} style={{ border: '1px solid #e5e7eb', borderRadius: 8, padding: '6px 12px', fontSize: 12 }}>
                    <span style={{ fontWeight: 600, color: '#374151' }}>{TIPO_TESTE_LABEL[t.tipo] || t.tipo}</span>
                    {ns && <span style={{ marginLeft: 8, padding: '1px 6px', borderRadius: 10, background: ns.bg, color: ns.color, fontWeight: 600 }}>{t.nivel}</span>}
                    <span style={{ marginLeft: 8, color: '#9ca3af' }}>{t.pontuacao} pts</span>
                  </div>
                )
              })}
            </div>
          </div>
        )}

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
        <button onClick={() => { setShowForm(!showForm) }} style={{ padding: '7px 16px', borderRadius: 7, fontSize: 12, fontWeight: 600, border: 'none', background: cor, color: '#fff', cursor: 'pointer' }}>
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
