import { prisma } from '@/lib/db'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { TESTES } from '../aplicar/[tipo]/page'

const NIVEL_STYLE: Record<string, { color: string; bg: string; desc: string }> = {
  Alto:     { color: '#dc2626', bg: '#fef2f2', desc: 'Indicativo forte — encaminhamento especializado recomendado' },
  Moderado: { color: '#d97706', bg: '#fffbeb', desc: 'Indicativo moderado — acompanhamento especializado recomendado' },
  Leve:     { color: '#2563eb', bg: '#eff6ff', desc: 'Indicativo leve — monitoramento e intervenção preventiva recomendados' },
  Mínimo:   { color: '#16a34a', bg: '#f0fdf4', desc: 'Indicativo mínimo — acompanhamento de rotina' },
}

const ESCALA_LABEL: Record<number, string> = { 1: 'Nunca', 2: 'Raramente', 3: 'Às vezes', 4: 'Frequentemente', 5: 'Sempre' }

export default async function ResultadoTestePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const teste = await prisma.testeAvaliativo.findUnique({
    where: { id },
    include: { aluno: true, paciente: true },
  })
  if (!teste) notFound()

  const config = TESTES[teste.tipo]
  const respostas: number[] = JSON.parse(teste.respostas)
  const pessoa = (teste as any).aluno || (teste as any).paciente
  const nivelStyle = NIVEL_STYLE[teste.nivel || ''] || NIVEL_STYLE['Mínimo']
  const maxPontos = respostas.length * 5
  const pct = teste.pontuacao ? Math.round((teste.pontuacao / maxPontos) * 100) : 0
  const corTipo = config?.color || '#374151'

  return (
    <div style={{ maxWidth: 720 }}>
      {/* Breadcrumb */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20, fontSize: 13, color: '#6b7280' }}>
        <Link href="/testes" style={{ color: '#6b7280' }}>Testes</Link>
        <span>/</span>
        <span style={{ color: '#111827', fontWeight: 500 }}>Resultado</span>
      </div>

      {/* Card de resumo */}
      <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 12, padding: '22px 26px', marginBottom: 16, boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
        <div style={{ fontSize: 16, fontWeight: 700, color: corTipo, marginBottom: 6 }}>{teste.titulo}</div>
        {pessoa && (
          <div style={{ fontSize: 13, color: '#6b7280', marginBottom: 18 }}>
            Vinculado a:{' '}
            <Link href={(teste as any).aluno ? `/alunos/${(teste as any).aluno.id}` : `/pacientes/${(teste as any).paciente.id}`}
              style={{ color: '#3b82f6', fontWeight: 600 }}>
              {pessoa.nome}
            </Link>
          </div>
        )}

        {/* Métricas */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 16 }}>
          <div style={{ background: '#f9fafb', borderRadius: 8, padding: '12px 16px' }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>Pontuação</div>
            <div style={{ fontSize: 28, fontWeight: 700, color: corTipo, lineHeight: 1 }}>{teste.pontuacao}<span style={{ fontSize: 13, color: '#9ca3af', fontWeight: 400 }}>/{maxPontos}</span></div>
          </div>
          <div style={{ background: '#f9fafb', borderRadius: 8, padding: '12px 16px' }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>Percentual</div>
            <div style={{ fontSize: 28, fontWeight: 700, color: '#374151', lineHeight: 1 }}>{pct}%</div>
          </div>
          <div style={{ background: nivelStyle.bg, borderRadius: 8, padding: '12px 16px' }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>Nível indicativo</div>
            <div style={{ fontSize: 22, fontWeight: 700, color: nivelStyle.color, lineHeight: 1 }}>{teste.nivel}</div>
          </div>
        </div>

        {/* Barra de progresso */}
        <div style={{ height: 8, borderRadius: 4, background: '#f3f4f6', overflow: 'hidden', marginBottom: 12 }}>
          <div style={{ height: 8, borderRadius: 4, background: nivelStyle.color, width: `${pct}%` }} />
        </div>

        <div style={{ padding: '10px 14px', borderRadius: 8, background: nivelStyle.bg, fontSize: 13, color: nivelStyle.color, fontWeight: 500, marginBottom: 12 }}>
          {nivelStyle.desc}
        </div>

        <div style={{ fontSize: 12, color: '#9ca3af' }}>
          Aplicado em: {new Date(teste.createdAt).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}
        </div>
      </div>

      {/* Observações */}
      {teste.observacoes && (
        <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 10, overflow: 'hidden', marginBottom: 16 }}>
          <div style={{ padding: '11px 16px', borderBottom: '1px solid #f3f4f6', background: '#f9fafb' }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: '#374151', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Observações clínicas</span>
          </div>
          <div style={{ padding: '14px 18px', fontSize: 13, color: '#374151', lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>{teste.observacoes}</div>
        </div>
      )}

      {/* Respostas detalhadas */}
      {config && (
        <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 10, overflow: 'hidden', marginBottom: 16 }}>
          <div style={{ padding: '11px 16px', borderBottom: '1px solid #f3f4f6', background: '#f9fafb' }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: '#374151', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Respostas detalhadas</span>
          </div>
          {config.perguntas.map((q, i) => {
            const v = respostas[i] || 0
            const barColor = v >= 4 ? '#dc2626' : v === 3 ? '#d97706' : v > 0 ? '#16a34a' : '#e5e7eb'
            return (
              <div key={i} style={{ padding: '12px 16px', borderBottom: i < config.perguntas.length - 1 ? '1px solid #f9fafb' : 'none' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12, marginBottom: 6 }}>
                  <div style={{ fontSize: 13, color: '#374151', lineHeight: 1.5, flex: 1 }}>
                    <span style={{ fontWeight: 700, color: corTipo, marginRight: 6 }}>{i + 1}.</span>{q}
                  </div>
                  <div style={{ flexShrink: 0, fontSize: 12, fontWeight: 700, color: barColor, whiteSpace: 'nowrap' }}>
                    {v} — {ESCALA_LABEL[v] || '?'}
                  </div>
                </div>
                <div style={{ height: 4, borderRadius: 2, background: '#f3f4f6', overflow: 'hidden' }}>
                  <div style={{ height: 4, borderRadius: 2, background: barColor, width: `${(v / 5) * 100}%` }} />
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Botões de navegação */}
      <div style={{ display: 'flex', gap: 10 }}>
        <Link href="/testes">
          <button style={{ padding: '8px 16px', borderRadius: 7, fontSize: 13, border: '1px solid #d1d5db', background: '#fff', color: '#374151', cursor: 'pointer' }}>
            ← Voltar aos testes
          </button>
        </Link>
        {pessoa && (
          <Link href={(teste as any).aluno ? `/alunos/${(teste as any).aluno.id}` : `/pacientes/${(teste as any).paciente.id}`}>
            <button style={{ padding: '8px 16px', borderRadius: 7, fontSize: 13, border: '1px solid #d1d5db', background: '#fff', color: '#374151', cursor: 'pointer' }}>
              Ver ficha de {pessoa.nome}
            </button>
          </Link>
        )}
      </div>
    </div>
  )
}
