'use client'
import { useState } from 'react'
import TabInfoAluno from './tabs/TabInfoAluno'
import TabSessoes from './tabs/TabSessoes'
import TabContratos from './tabs/TabContratos'
import TabEncaminhamentos from './tabs/TabEncaminhamentos'
import TabRelatorios from './tabs/TabRelatorios'
import TabTestes from './tabs/TabTestes'

const TABS = [
  { id: 'info',            label: 'Informações',      count: null },
  { id: 'sessoes',         label: 'Sessões',           count: 'sessoes' },
  { id: 'testes',          label: 'Testes',            count: 'testes' },
  { id: 'contratos',       label: 'Contratos',         count: 'contratos' },
  { id: 'encaminhamentos', label: 'Encaminhamentos',   count: 'encaminhamentos' },
  { id: 'relatorios',      label: 'Relatórios',        count: 'relatorios' },
]

export default function FichaAluno({ aluno, tipo }: { aluno: any; tipo: 'aluno' | 'paciente' }) {
  const [tab, setTab] = useState('info')
  const idField  = tipo === 'aluno' ? 'alunoId'  : 'pacienteId'
  const endpoint = tipo === 'aluno' ? 'alunos'   : 'pacientes'
  const cor      = tipo === 'aluno' ? '#3b82f6'  : '#10b981'
  const bg       = tipo === 'aluno' ? '#eff6ff'  : '#f0fdf4'

  return (
    <div style={{ maxWidth: 960 }}>

      {/* Cabeçalho do perfil */}
      <div style={{
        background: '#fff',
        border: '1px solid #e5e7eb',
        borderRadius: 12,
        padding: '20px 24px',
        marginBottom: 20,
        boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
        display: 'flex',
        alignItems: 'center',
        gap: 16,
      }}>
        <div style={{
          width: 52, height: 52, borderRadius: 12, flexShrink: 0,
          background: bg, color: cor,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 22, fontWeight: 700,
        }}>
          {aluno.nome.charAt(0).toUpperCase()}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: '#111827', marginBottom: 3 }}>{aluno.nome}</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, fontSize: 13, color: '#6b7280' }}>
            {aluno.escola && <span>{aluno.escola}{aluno.serie ? ` · ${aluno.serie}` : ''}</span>}
            {aluno.responsavel && <span>Resp: {aluno.responsavel}</span>}
            {aluno.telefone && <span>{aluno.telefone}</span>}
            {!aluno.escola && !aluno.responsavel && (
              <span style={{ color: '#9ca3af' }}>{tipo === 'aluno' ? 'Aluno' : 'Paciente clínico'}</span>
            )}
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
          {aluno.sessoes && (
            <div style={{ textAlign: 'center', padding: '6px 14px', borderRadius: 8, background: '#f9fafb', border: '1px solid #f3f4f6' }}>
              <div style={{ fontSize: 18, fontWeight: 700, color: '#374151' }}>{aluno.sessoes.length}</div>
              <div style={{ fontSize: 11, color: '#9ca3af' }}>sessões</div>
            </div>
          )}
          {aluno.relatorios && (
            <div style={{ textAlign: 'center', padding: '6px 14px', borderRadius: 8, background: '#f9fafb', border: '1px solid #f3f4f6' }}>
              <div style={{ fontSize: 18, fontWeight: 700, color: '#374151' }}>{aluno.relatorios.length}</div>
              <div style={{ fontSize: 11, color: '#9ca3af' }}>relatórios</div>
            </div>
          )}
          {aluno.testes && (
            <div style={{ textAlign: 'center', padding: '6px 14px', borderRadius: 8, background: '#f9fafb', border: '1px solid #f3f4f6' }}>
              <div style={{ fontSize: 18, fontWeight: 700, color: '#374151' }}>{aluno.testes.length}</div>
              <div style={{ fontSize: 11, color: '#9ca3af' }}>testes</div>
            </div>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: '10px 10px 0 0', borderBottom: 'none', padding: '0 20px', display: 'flex', gap: 2, overflow: 'auto' }}>
        {TABS.map(t => {
          const cnt = t.count ? aluno[t.count]?.length : null
          return (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              style={{
                padding: '13px 16px',
                fontSize: 13,
                fontWeight: tab === t.id ? 600 : 400,
                color: tab === t.id ? cor : '#6b7280',
                background: 'none',
                border: 'none',
                borderBottom: `2px solid ${tab === t.id ? cor : 'transparent'}`,
                cursor: 'pointer',
                marginBottom: -1,
                whiteSpace: 'nowrap',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
              }}
            >
              {t.label}
              {cnt !== null && cnt > 0 && (
                <span style={{
                  fontSize: 11, fontWeight: 600,
                  padding: '1px 6px', borderRadius: 10,
                  background: tab === t.id ? cor : '#f3f4f6',
                  color: tab === t.id ? '#fff' : '#6b7280',
                }}>
                  {cnt}
                </span>
              )}
            </button>
          )
        })}
      </div>

      {/* Conteúdo da aba */}
      <div style={{
        background: '#f9fafb',
        border: '1px solid #e5e7eb',
        borderTop: 'none',
        borderRadius: '0 0 10px 10px',
        padding: 20,
      }}>
        {tab === 'info'            && <TabInfoAluno aluno={aluno} endpoint={endpoint} cor={cor} />}
        {tab === 'sessoes'         && <TabSessoes sessoes={aluno.sessoes} entityId={aluno.id} idField={idField} cor={cor} />}
        {tab === 'testes'          && <TabTestes testes={aluno.testes || []} entityId={aluno.id} idField={idField} cor={cor} />}
        {tab === 'contratos'       && <TabContratos contratos={aluno.contratos} entityId={aluno.id} idField={idField} cor={cor} />}
        {tab === 'encaminhamentos' && <TabEncaminhamentos encaminhamentos={aluno.encaminhamentos} entityId={aluno.id} idField={idField} cor={cor} />}
        {tab === 'relatorios'      && <TabRelatorios relatorios={aluno.relatorios} entityId={aluno.id} idField={idField} cor={cor} />}
      </div>
    </div>
  )
}
