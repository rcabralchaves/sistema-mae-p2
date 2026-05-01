import { prisma } from '@/lib/db'
import Link from 'next/link'
import DeleteButton from '@/components/DeleteButton'

const TIPO_META: Record<string, { label: string; color: string; bg: string }> = {
  tdah:            { label: 'TDAH',                  color: '#d97706', bg: '#fffbeb' },
  autismo:         { label: 'TEA / Autismo',          color: '#7c3aed', bg: '#f5f3ff' },
  dislexia:        { label: 'Dislexia',               color: '#0284c7', bg: '#f0f9ff' },
  cars:            { label: 'CARS',                   color: '#be185d', bg: '#fdf2f8' },
  snap4:           { label: 'SNAP-IV',                color: '#d97706', bg: '#fffbeb' },
  eoca:            { label: 'EOCA',                   color: '#0369a1', bg: '#e0f2fe' },
  motora_fina:     { label: 'Coord. Motora Fina',     color: '#047857', bg: '#ecfdf5' },
  disgrafia:       { label: 'Disgrafia',              color: '#7c3aed', bg: '#f5f3ff' },
  disortografia:   { label: 'Disortografia',          color: '#6d28d9', bg: '#ede9fe' },
  lateralidade:    { label: 'Lateralidade',           color: '#0891b2', bg: '#ecfeff' },
  psicopedagogica: { label: 'Aval. Psicopedagógica',  color: '#374151', bg: '#f3f4f6' },
  tpac:            { label: 'TPAC',                   color: '#0f766e', bg: '#f0fdfa' },
  discalculia:     { label: 'Discalculia',            color: '#b45309', bg: '#fef3c7' },
  altas_habilidades:{ label: 'Altas Habilidades',    color: '#dc2626', bg: '#fef2f2' },
}

const APLICAR = [
  { tipo: 'tdah',            label: 'TDAH',                  desc: '15 questões' },
  { tipo: 'autismo',         label: 'TEA / Autismo',          desc: '15 questões' },
  { tipo: 'dislexia',        label: 'Dislexia',               desc: '15 questões' },
  { tipo: 'cars',            label: 'CARS',                   desc: '15 itens' },
  { tipo: 'snap4',           label: 'SNAP-IV',                desc: '18 itens' },
  { tipo: 'eoca',            label: 'EOCA',                   desc: '15 itens' },
  { tipo: 'motora_fina',     label: 'Coord. Motora Fina',     desc: '15 itens' },
  { tipo: 'disgrafia',       label: 'Disgrafia',              desc: '15 itens' },
  { tipo: 'disortografia',   label: 'Disortografia',          desc: '15 itens' },
  { tipo: 'lateralidade',    label: 'Lateralidade',           desc: '15 itens' },
  { tipo: 'psicopedagogica', label: 'Aval. Psicopedagógica',  desc: '15 itens' },
  { tipo: 'tpac',            label: 'TPAC',                   desc: '15 itens' },
  { tipo: 'discalculia',     label: 'Discalculia',            desc: '15 itens' },
  { tipo: 'altas_habilidades', label: 'Altas Habilidades',   desc: '15 itens' },
]

const BIBLIOTECA = [
  { nome: 'Linguagem e Comunicação', contexto: ['clínico', 'escolar'], faixas: ['4–6', '7–10', '11–14'], testes: ['TDE - Teste de Desempenho Escolar', 'PROLEC-SE - Processos Leitores', 'Prova de Consciência Fonológica', 'CONFIAS'] },
  { nome: 'Avaliação Cognitiva', contexto: ['clínico', 'escolar'], faixas: ['5–8', '9–12', '13–17'], testes: ['WISC-IV - Escala de Inteligência', 'Raven - Matrizes Progressivas', 'Bender - Gestáltico Visomotor', 'BNVI'] },
  { nome: 'Atenção e Concentração', contexto: ['clínico', 'escolar'], faixas: ['6–10', '11–16'], testes: ['Teste de Atenção por Cancelamento', 'TAVIS-3', 'CPT - Continuous Performance Test', 'Teste dos 5 Dígitos'] },
  { nome: 'Memória', contexto: ['clínico'], faixas: ['5–7', '8–12', '13–17'], testes: ['Escala de Memória para Crianças (CMS)', 'Rey - Figura Complexa', 'Dígitos (WISC)', 'WRAML-2'] },
  { nome: 'Leitura e Escrita', contexto: ['escolar'], faixas: ['6–8', '9–12'], testes: ['Avaliação da Escrita Espontânea', 'Ditado Balanceado', 'Leitura em Voz Alta', 'Compreensão Leitora'] },
  { nome: 'Raciocínio Matemático', contexto: ['escolar'], faixas: ['6–9', '10–14'], testes: ['ZAREKI-R', 'Resolução de Problemas', 'Prova de Aritmética (TDE)', 'Avaliação de Conceitos Matemáticos'] },
  { nome: 'Aspectos Emocionais', contexto: ['clínico'], faixas: ['4–7', '8–12', '13–17'], testes: ['HTP - Casa/Árvore/Pessoa', 'Teste das Fábulas', 'CAT-A', 'Escala de Ansiedade para Crianças'] },
  { nome: 'Desenvolvimento Psicomotor', contexto: ['clínico', 'escolar'], faixas: ['3–6', '7–10'], testes: ['DAP - Escala de Maturidade Mental', 'Teste de Lateralidade', 'Esquema Corporal', 'EDM'] },
]

const TAG: Record<string, { bg: string; color: string }> = {
  clínico: { bg: '#eff6ff', color: '#1d4ed8' },
  escolar: { bg: '#f0fdf4', color: '#15803d' },
}

const NIVEL_STYLE: Record<string, { color: string; bg: string }> = {
  Alto:     { color: '#dc2626', bg: '#fef2f2' },
  Moderado: { color: '#d97706', bg: '#fffbeb' },
  Leve:     { color: '#2563eb', bg: '#eff6ff' },
  Mínimo:   { color: '#16a34a', bg: '#f0fdf4' },
}

export default async function TestesPage() {
  const testes = await prisma.testeAvaliativo.findMany({
    orderBy: { createdAt: 'desc' },
    include: { aluno: true, paciente: true },
  })

  return (
    <div style={{ maxWidth: 1000 }}>

      {/* Aplicar novo teste */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 12 }}>
          Aplicar teste avaliativo ({APLICAR.length} instrumentos disponíveis)
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
          {APLICAR.map(a => {
            const meta = TIPO_META[a.tipo]
            return (
              <Link key={a.tipo} href={`/testes/aplicar/${a.tipo}`}>
                <div style={{
                  background: '#fff', border: '1px solid #e5e7eb', borderRadius: 10,
                  padding: '14px 16px', cursor: 'pointer',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
                  borderTop: `3px solid ${meta.color}`,
                  transition: 'box-shadow 0.15s',
                }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: meta.color, marginBottom: 3 }}>{a.label}</div>
                  <div style={{ fontSize: 11, color: '#9ca3af' }}>{a.desc} · escala 1–5</div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>

      {/* Testes aplicados */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 12 }}>
          Histórico de testes aplicados ({testes.length})
        </div>
        {testes.length === 0 ? (
          <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 10, padding: '36px 20px', textAlign: 'center', fontSize: 13, color: '#9ca3af' }}>
            Nenhum teste aplicado ainda. Use os cards acima para iniciar uma avaliação.
          </div>
        ) : (
          <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 10, overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
                  {['Título', 'Tipo', 'Pessoa', 'Pontuação', 'Nível', 'Data', ''].map(h => (
                    <th key={h} style={{ textAlign: 'left', padding: '11px 16px', fontSize: 11, fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {testes.map((t: any, i: number) => {
                  const meta = TIPO_META[t.tipo] || { label: t.tipo, color: '#6b7280', bg: '#f3f4f6' }
                  const nivelStyle = t.nivel ? (NIVEL_STYLE[t.nivel] || NIVEL_STYLE['Mínimo']) : null
                  const pessoa = t.aluno || t.paciente
                  return (
                    <tr key={t.id} className="table-row" style={{ borderBottom: i < testes.length - 1 ? '1px solid #f3f4f6' : 'none' }}>
                      <td style={{ padding: '12px 16px', fontSize: 13, fontWeight: 500, color: '#111827', maxWidth: 180 }}>
                        <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{t.titulo}</div>
                      </td>
                      <td style={{ padding: '12px 16px' }}>
                        <span style={{ fontSize: 11, padding: '3px 8px', borderRadius: 20, background: meta.bg, color: meta.color, fontWeight: 600 }}>{meta.label}</span>
                      </td>
                      <td style={{ padding: '12px 16px', fontSize: 13 }}>
                        {pessoa ? (
                          <Link href={t.aluno ? `/alunos/${t.aluno.id}` : `/pacientes/${t.paciente.id}`} style={{ color: '#3b82f6', fontWeight: 500 }}>{pessoa.nome}</Link>
                        ) : <span style={{ color: '#9ca3af' }}>—</span>}
                      </td>
                      <td style={{ padding: '12px 16px', fontSize: 14, fontWeight: 700, color: '#374151' }}>{t.pontuacao ?? '—'}</td>
                      <td style={{ padding: '12px 16px' }}>
                        {nivelStyle ? (
                          <span style={{ fontSize: 11, padding: '3px 8px', borderRadius: 20, background: nivelStyle.bg, color: nivelStyle.color, fontWeight: 600 }}>{t.nivel}</span>
                        ) : <span style={{ color: '#9ca3af' }}>—</span>}
                      </td>
                      <td style={{ padding: '12px 16px', fontSize: 12, color: '#9ca3af' }}>
                        {new Date(t.createdAt).toLocaleDateString('pt-BR')}
                      </td>
                      <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                        <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', alignItems: 'center' }}>
                          <Link href={`/testes/${t.id}`} style={{ fontSize: 12, color: '#3b82f6', fontWeight: 600 }}>Ver resultado</Link>
                          <DeleteButton id={t.id} endpoint="testes" redirectTo="/testes" label="Excluir" />
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Biblioteca */}
      <div>
        <div style={{ fontSize: 12, fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 12 }}>
          Biblioteca de instrumentos de referência ({BIBLIOTECA.length} categorias)
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          {BIBLIOTECA.map(cat => (
            <div key={cat.nome} style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 10, overflow: 'hidden' }}>
              <div style={{ padding: '12px 16px', borderBottom: '1px solid #f3f4f6', background: '#f9fafb' }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#111827', marginBottom: 6 }}>{cat.nome}</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                  {cat.contexto.map(c => <span key={c} style={{ fontSize: 11, padding: '2px 8px', borderRadius: 20, fontWeight: 500, ...TAG[c] }}>{c}</span>)}
                  {cat.faixas.map(f => <span key={f} style={{ fontSize: 11, padding: '2px 8px', borderRadius: 20, background: '#f3f4f6', color: '#6b7280' }}>{f} anos</span>)}
                </div>
              </div>
              <ul style={{ padding: '10px 16px', listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 6 }}>
                {cat.testes.map(t => (
                  <li key={t} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#374151' }}>
                    <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#3b82f6', flexShrink: 0 }} />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}
