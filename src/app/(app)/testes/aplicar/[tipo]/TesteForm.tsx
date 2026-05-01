'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const ESCALA = [
  { v: 1, label: '1\nNunca' },
  { v: 2, label: '2\nRaramente' },
  { v: 3, label: '3\nÀs vezes' },
  { v: 4, label: '4\nFreq.' },
  { v: 5, label: '5\nSempre' },
]

function calcularNivel(pontuacao: number, total: number): string {
  const pct = pontuacao / total
  if (pct >= 0.8) return 'Alto'
  if (pct >= 0.6) return 'Moderado'
  if (pct >= 0.4) return 'Leve'
  return 'Mínimo'
}

const NIVEL_COLOR: Record<string, string> = { Alto: '#dc2626', Moderado: '#d97706', Leve: '#2563eb', Mínimo: '#16a34a' }

interface Props {
  tipo: string
  config: { label: string; color: string; instrucoes: string; perguntas: string[] }
  alunos: { id: string; nome: string }[]
  pacientes: { id: string; nome: string }[]
  preAlunoId?: string
  prePacienteId?: string
}

export default function TesteForm({ tipo, config, alunos, pacientes, preAlunoId = '', prePacienteId = '' }: Props) {
  const router = useRouter()
  const n = config.perguntas.length

  const initVinculo = preAlunoId ? 'aluno' : prePacienteId ? 'paciente' : ''
  const initPessoaId = preAlunoId || prePacienteId || ''

  const [respostas, setRespostas] = useState<number[]>(Array(n).fill(0))
  const [vinculo, setVinculo] = useState<'aluno' | 'paciente' | ''>(initVinculo as any)
  const [pessoaId, setPessoaId] = useState(initPessoaId)
  const [observacoes, setObs] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const setResp = (i: number, v: number) => setRespostas(prev => { const a = [...prev]; a[i] = v; return a })
  const respondidas = respostas.filter(r => r > 0).length
  const pontuacao = respostas.reduce((s, v) => s + v, 0)
  const maxPontos = n * 5
  const nivel = respondidas === n ? calcularNivel(pontuacao, maxPontos) : null
  const pct = respondidas > 0 ? Math.round((pontuacao / (respondidas * 5)) * 100) : 0

  const iStyle = { width: '100%', padding: '9px 12px', borderRadius: 7, fontSize: 13, border: '1px solid #d1d5db', outline: 'none', background: '#fff', color: '#111827' }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (respondidas < n) { setError('Responda todas as questões antes de salvar.'); return }
    setLoading(true); setError('')
    const titulo = `${config.label} — ${new Date().toLocaleDateString('pt-BR')}`
    const body: any = {
      tipo, titulo,
      respostas: JSON.stringify(respostas),
      pontuacao, nivel,
      observacoes: observacoes || null,
    }
    if (vinculo === 'aluno' && pessoaId) body.alunoId = pessoaId
    if (vinculo === 'paciente' && pessoaId) body.pacienteId = pessoaId
    const res = await fetch('/api/testes', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
    if (res.ok) {
      const t = await res.json()
      // Redireciona de volta para a ficha se veio de lá
      if (vinculo === 'aluno' && pessoaId) router.push(`/alunos/${pessoaId}`)
      else if (vinculo === 'paciente' && pessoaId) router.push(`/pacientes/${pessoaId}`)
      else router.push(`/testes/${t.id}`)
    } else {
      setError('Erro ao salvar o teste.')
      setLoading(false)
    }
  }

  return (
    <>
      {/* Breadcrumb */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20, fontSize: 13, color: '#6b7280' }}>
        <Link href="/testes" style={{ color: '#6b7280' }}>Testes</Link>
        <span>/</span>
        <span style={{ color: '#111827', fontWeight: 500 }}>{config.label}</span>
      </div>

      {error && <div style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626', padding: '10px 14px', borderRadius: 7, fontSize: 13, marginBottom: 16 }}>{error}</div>}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

        {/* Vincular */}
        <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 10, overflow: 'hidden' }}>
          <div style={{ padding: '12px 16px', borderBottom: '1px solid #f3f4f6', background: '#f9fafb' }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: '#374151', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Vincular a (opcional)</span>
          </div>
          <div style={{ padding: 16, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div>
              <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: '#6b7280', marginBottom: 5, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Tipo</label>
              <select value={vinculo} onChange={e => { setVinculo(e.target.value as any); if (!preAlunoId && !prePacienteId) setPessoaId('') }} style={iStyle} disabled={!!(preAlunoId || prePacienteId)}>
                <option value="">Sem vínculo</option>
                <option value="aluno">Aluno</option>
                <option value="paciente">Paciente</option>
              </select>
            </div>
            {vinculo && (
              <div>
                <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: '#6b7280', marginBottom: 5, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {vinculo === 'aluno' ? 'Aluno' : 'Paciente'}
                </label>
                <select value={pessoaId} onChange={e => setPessoaId(e.target.value)} style={iStyle} disabled={!!(preAlunoId || prePacienteId)}>
                  <option value="">Selecione...</option>
                  {(vinculo === 'aluno' ? alunos : pacientes).map(p => (
                    <option key={p.id} value={p.id}>{p.nome}</option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </div>

        {/* Instruções */}
        <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 8, padding: '12px 16px', fontSize: 13, color: '#475569', whiteSpace: 'pre-line' }}>
          {config.instrucoes}
        </div>

        {/* Questões */}
        <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 10, overflow: 'hidden' }}>
          <div style={{ padding: '12px 16px', borderBottom: '1px solid #f3f4f6', background: '#f9fafb', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: '#374151', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Questões</span>
            <span style={{ fontSize: 12, color: '#9ca3af' }}>{respondidas}/{n} respondidas</span>
          </div>
          {/* Barra de progresso */}
          <div style={{ height: 3, background: '#f3f4f6' }}>
            <div style={{ height: 3, background: config.color, width: `${(respondidas / n) * 100}%`, transition: 'width 0.2s' }} />
          </div>
          <div>
            {config.perguntas.map((q, i) => (
              <div key={i} style={{ padding: '14px 16px', borderBottom: i < n - 1 ? '1px solid #f3f4f6' : 'none', background: respostas[i] === 0 ? '#fff' : '#fafafa' }}>
                <div style={{ fontSize: 13, color: '#111827', marginBottom: 10, lineHeight: 1.5 }}>
                  <span style={{ fontWeight: 700, color: config.color, marginRight: 8 }}>{i + 1}.</span>{q}
                </div>
                <div style={{ display: 'flex', gap: 6 }}>
                  {ESCALA.map(({ v, label }) => (
                    <button
                      key={v} type="button" onClick={() => setResp(i, v)}
                      style={{
                        flex: 1, padding: '8px 4px', borderRadius: 7,
                        border: '1px solid',
                        borderColor: respostas[i] === v ? config.color : '#e5e7eb',
                        background: respostas[i] === v ? config.color : '#fff',
                        color: respostas[i] === v ? '#fff' : '#6b7280',
                        fontSize: 11, fontWeight: 600, cursor: 'pointer',
                        whiteSpace: 'pre-line', lineHeight: 1.3, textAlign: 'center',
                        transition: 'all 0.1s',
                      }}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pontuação em tempo real */}
        {respondidas > 0 && (
          <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 10, padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 24 }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>Pontuação parcial</div>
              <div style={{ fontSize: 30, fontWeight: 700, color: config.color, lineHeight: 1 }}>
                {pontuacao}<span style={{ fontSize: 14, color: '#9ca3af', fontWeight: 400 }}>/{respondidas * 5}</span>
              </div>
            </div>
            <div>
              <div style={{ fontSize: 11, fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>Percentual</div>
              <div style={{ fontSize: 22, fontWeight: 700, color: '#374151' }}>{pct}%</div>
            </div>
            {nivel && (
              <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 6 }}>Indicativo</div>
                <div style={{ fontSize: 20, fontWeight: 700, color: NIVEL_COLOR[nivel] }}>{nivel}</div>
              </div>
            )}
          </div>
        )}

        {/* Observações */}
        <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 10, overflow: 'hidden' }}>
          <div style={{ padding: '12px 16px', borderBottom: '1px solid #f3f4f6', background: '#f9fafb' }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: '#374151', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Observações clínicas (opcional)</span>
          </div>
          <div style={{ padding: 16 }}>
            <textarea rows={4} value={observacoes} onChange={e => setObs(e.target.value)}
              placeholder="Registre observações comportamentais, contexto da avaliação, informações do responsável..."
              style={{ ...iStyle, resize: 'vertical' }} />
          </div>
        </div>

        {/* Botões */}
        <div style={{ display: 'flex', gap: 10 }}>
          <button type="button" onClick={() => router.back()} style={{ padding: '8px 16px', borderRadius: 7, fontSize: 13, border: '1px solid #d1d5db', background: '#fff', color: '#374151', cursor: 'pointer' }}>
            Cancelar
          </button>
          <button type="submit" disabled={loading || respondidas < n}
            style={{ padding: '8px 20px', borderRadius: 7, fontSize: 13, fontWeight: 600, border: 'none', background: config.color, color: '#fff', cursor: respondidas < n ? 'not-allowed' : 'pointer', opacity: (loading || respondidas < n) ? 0.6 : 1 }}
          >
            {loading ? 'Salvando...' : `Salvar resultado (${respondidas}/${n})`}
          </button>
        </div>
      </form>
    </>
  )
}
