'use client'
import Link from 'next/link'
import { useState } from 'react'

const TIPO_META: Record<string, { label: string; color: string; bg: string }> = {
  tdah:           { label: 'TDAH',                  color: '#d97706', bg: '#fffbeb' },
  autismo:        { label: 'TEA / Autismo',          color: '#7c3aed', bg: '#f5f3ff' },
  dislexia:       { label: 'Dislexia',               color: '#0284c7', bg: '#f0f9ff' },
  cars:           { label: 'CARS',                   color: '#be185d', bg: '#fdf2f8' },
  snap4:          { label: 'SNAP-IV',                color: '#d97706', bg: '#fffbeb' },
  eoca:           { label: 'EOCA',                   color: '#0369a1', bg: '#e0f2fe' },
  motora_fina:    { label: 'Coord. Motora Fina',     color: '#047857', bg: '#ecfdf5' },
  disgrafia:      { label: 'Disgrafia',              color: '#7c3aed', bg: '#f5f3ff' },
  disortografia:  { label: 'Disortografia',          color: '#6d28d9', bg: '#ede9fe' },
  lateralidade:   { label: 'Lateralidade',           color: '#0891b2', bg: '#ecfeff' },
  psicopedagogica:{ label: 'Aval. Psicopedagógica',  color: '#374151', bg: '#f3f4f6' },
  tpac:           { label: 'TPAC',                   color: '#0f766e', bg: '#f0fdfa' },
  discalculia:    { label: 'Discalculia',             color: '#b45309', bg: '#fef3c7' },
  altas_habilidades:{ label: 'Altas Habilidades',   color: '#dc2626', bg: '#fef2f2' },
}

const NIVEL_STYLE: Record<string, { color: string; bg: string }> = {
  Alto:     { color: '#dc2626', bg: '#fef2f2' },
  Moderado: { color: '#d97706', bg: '#fffbeb' },
  Leve:     { color: '#2563eb', bg: '#eff6ff' },
  Mínimo:   { color: '#16a34a', bg: '#f0fdf4' },
}

const TIPOS_APLICAR = [
  { tipo: 'tdah',            label: 'TDAH' },
  { tipo: 'autismo',         label: 'TEA / Autismo' },
  { tipo: 'dislexia',        label: 'Dislexia' },
  { tipo: 'cars',            label: 'CARS' },
  { tipo: 'snap4',           label: 'SNAP-IV' },
  { tipo: 'eoca',            label: 'EOCA' },
  { tipo: 'motora_fina',     label: 'Coord. Motora' },
  { tipo: 'disgrafia',       label: 'Disgrafia' },
  { tipo: 'disortografia',   label: 'Disortografia' },
  { tipo: 'lateralidade',    label: 'Lateralidade' },
  { tipo: 'psicopedagogica', label: 'Psicopedagógica' },
  { tipo: 'tpac',            label: 'TPAC' },
  { tipo: 'discalculia',     label: 'Discalculia' },
  { tipo: 'altas_habilidades', label: 'Altas Hab.' },
]

export default function TabTestes({ testes: initial, entityId, idField, cor }: { testes: any[]; entityId: string; idField: string; cor: string }) {
  const [testes, setTestes] = useState(initial)

  async function handleDelete(id: string) {
    if (!confirm('Excluir este teste?')) return
    await fetch(`/api/testes/${id}`, { method: 'DELETE' })
    setTestes(testes.filter((t: any) => t.id !== id))
  }

  const tipoParam = idField === 'alunoId' ? `alunoId=${entityId}` : `pacienteId=${entityId}`

  return (
    <div>
      {/* Atalhos para aplicar novo teste */}
      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 11, fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 10 }}>Aplicar novo teste</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {TIPOS_APLICAR.map(t => {
            const meta = TIPO_META[t.tipo] || { color: '#374151', bg: '#f3f4f6' }
            return (
              <Link key={t.tipo} href={`/testes/aplicar/${t.tipo}?${tipoParam}`}>
                <button style={{
                  padding: '6px 12px', borderRadius: 20, fontSize: 12, fontWeight: 500,
                  border: `1px solid ${meta.color}20`,
                  background: meta.bg, color: meta.color, cursor: 'pointer',
                }}>
                  {t.label}
                </button>
              </Link>
            )
          })}
        </div>
      </div>

      {/* Lista de testes realizados */}
      <div style={{ fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 12 }}>
        Testes realizados ({testes.length})
      </div>

      {testes.length === 0 ? (
        <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 10, padding: '40px 20px', textAlign: 'center' }}>
          <div style={{ fontSize: 13, color: '#9ca3af', marginBottom: 6 }}>Nenhum teste aplicado ainda.</div>
          <div style={{ fontSize: 12, color: '#9ca3af' }}>Use os botões acima para iniciar uma avaliação.</div>
        </div>
      ) : (
        <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 10, overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
                {['Teste', 'Tipo', 'Pontuação', 'Nível', 'Data', ''].map(h => (
                  <th key={h} style={{ textAlign: 'left', padding: '11px 16px', fontSize: 11, fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {testes.map((t: any, i: number) => {
                const meta = TIPO_META[t.tipo] || { label: t.tipo, color: '#6b7280', bg: '#f3f4f6' }
                const nivelStyle = t.nivel ? (NIVEL_STYLE[t.nivel] || NIVEL_STYLE['Mínimo']) : null
                return (
                  <tr key={t.id} className="table-row" style={{ borderBottom: i < testes.length - 1 ? '1px solid #f3f4f6' : 'none' }}>
                    <td style={{ padding: '12px 16px', fontSize: 13, fontWeight: 500, color: '#111827', maxWidth: 200 }}>
                      <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{t.titulo}</div>
                    </td>
                    <td style={{ padding: '12px 16px' }}>
                      <span style={{ fontSize: 11, padding: '3px 8px', borderRadius: 20, background: meta.bg, color: meta.color, fontWeight: 600 }}>{meta.label}</span>
                    </td>
                    <td style={{ padding: '12px 16px', fontSize: 14, fontWeight: 700, color: '#374151' }}>
                      {t.pontuacao ?? '—'}
                    </td>
                    <td style={{ padding: '12px 16px' }}>
                      {nivelStyle ? (
                        <span style={{ fontSize: 12, padding: '3px 10px', borderRadius: 20, background: nivelStyle.bg, color: nivelStyle.color, fontWeight: 600 }}>{t.nivel}</span>
                      ) : '—'}
                    </td>
                    <td style={{ padding: '12px 16px', fontSize: 12, color: '#9ca3af' }}>
                      {new Date(t.createdAt).toLocaleDateString('pt-BR')}
                    </td>
                    <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                      <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
                        <Link href={`/testes/${t.id}`} style={{ fontSize: 12, color: cor, fontWeight: 600, textDecoration: 'none' }}>Ver resultado</Link>
                        <button onClick={() => handleDelete(t.id)} style={{ fontSize: 12, color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 500 }}>Excluir</button>
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
  )
}
