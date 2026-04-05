import { useState, useEffect } from 'react'
import { useTheme } from '../context/ThemeContext'
import { fetchCollection } from '../lib/cms'
import SectionHeader from '../components/SectionHeader'

const ff = 'Figtree, sans-serif'
const mono = "'Space Mono', monospace"

function useTokens() {
  const { dark } = useTheme()
  return {
    cardBg: dark ? '#1E1724' : '#F8F9FF',
    textPrimary: dark ? '#e8e8e8' : '#111111',
    textSecondary: dark ? '#a8a8a8' : '#555555',
    textMuted: dark ? '#9a9a9a' : '#5a5a5a',
    tagBg: dark ? 'rgba(255,255,255,0.1)' : '#e8e8e8',
    tagColor: dark ? '#a8a8a8' : '#555555',
  }
}

function Card({ children, thumb, className = '', index = 0 }) {
  const { cardBg } = useTokens()
  const [hovered, setHovered] = useState(false)
  return (
    <div
      className={`reveal ${className}`}
      style={{
        animationDelay: `${index * 0.12}s`,
        background: cardBg,
        borderRadius: 16,
        overflow: 'hidden',
        transition: 'box-shadow 0.2s ease, background 0.3s ease',
        boxShadow: hovered ? '0 0 0 2px #7002FF' : 'none',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      role="button"
      tabIndex={0}
    >
      <div style={{ position: 'relative', width: '100%', aspectRatio: '4/3', overflow: 'hidden', borderRadius: '16px 16px 0 0', background: thumb?.startsWith('http') ? `url(${thumb}) center/cover no-repeat` : thumb }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(135deg, rgba(255,255,255,0.18) 0%, transparent 55%)',
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.35s ease',
          pointerEvents: 'none',
        }} />
      </div>
      <div style={{ padding: '12px 16px 16px' }}>
        {children}
      </div>
    </div>
  )
}

function Tag({ label }) {
  const { tagBg, tagColor } = useTokens()
  return (
    <span style={{ fontFamily: mono, fontSize: 11, fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', color: tagColor, transition: 'color 0.3s', alignSelf: 'flex-start', display: 'inline-block' }}>
      [{label}]
    </span>
  )
}

export default function Lab() {
  const { textPrimary, textMuted } = useTokens()
  const [experiments, setExperiments] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCollection('lab')
      .then(setExperiments)
      .finally(() => setLoading(false))
  }, [])

  if (loading) return (
    <div style={{ textAlign: 'center', padding: 48, fontFamily: mono, fontSize: 12, color: textMuted }}>
      Cargando...
    </div>
  )

  return (
    <div style={{ maxWidth: 760, margin: '0 auto' }}>
      <SectionHeader title="Lab" desc="Experimentos, prototipos y curiosidades." />
    <div className="grid-bento" style={{ gap: 12 }}>
      {experiments.map((e, i) => (
        <Card key={e.slug ?? e.title} index={i} thumb={e.thumb}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <Tag label={e.label ?? 'EXP 00'} />
            <p style={{ fontFamily: mono, fontSize: 16, fontWeight: 400, color: textPrimary, lineHeight: 1.3, transition: 'color 0.3s', margin: 0, textTransform: 'uppercase' }}>{e.title}</p>
          </div>
        </Card>
      ))}
    </div>
    </div>
  )
}
