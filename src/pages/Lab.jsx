import { ArrowUpRight } from 'lucide-react'
import { useState } from 'react'
import { useTheme } from '../context/ThemeContext'

const ff = 'Figtree, sans-serif'
const mono = "'Space Mono', monospace"

function useTokens() {
  const { dark } = useTheme()
  return {
    cardBg: dark ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.45)',
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
      <div style={{ position: 'relative', width: '100%', aspectRatio: '4/3', overflow: 'hidden' }}>
        <div style={{ width: '100%', height: '100%', background: thumb }} />
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

const experiments = [
  {
    tag: 'Interacción',
    title: 'Cursor magnético',
    desc: 'Exploración de microinteracciones con campos de fuerza en elementos UI.',
    thumb: 'linear-gradient(135deg, #1a0533 0%, #6b21a8 60%, #a855f7 100%)',
    featured: true,
  },
  {
    tag: 'Generativo',
    title: 'Paletas desde imágenes',
    desc: 'Extracción automática de tokens de color a partir de fotografías.',
    thumb: 'linear-gradient(135deg, #0c1a0c 0%, #166534 60%, #4ade80 100%)',
  },
  {
    tag: 'Tipografía',
    title: 'Variable font playground',
    desc: 'Exploración de ejes tipográficos variables en tiempo real.',
    thumb: 'linear-gradient(135deg, #1c1000 0%, #92400e 60%, #fbbf24 100%)',
  },
  {
    tag: 'IA',
    title: 'Prompt to component',
    desc: 'Generación de componentes Figma desde lenguaje natural.',
    thumb: 'linear-gradient(135deg, #001a33 0%, #1e40af 60%, #60a5fa 100%)',
  },
  {
    tag: 'Motion',
    title: 'Transiciones de layout',
    desc: 'Patrones de animación para cambios de estado en grids.',
    thumb: 'linear-gradient(135deg, #1a0a0a 0%, #991b1b 60%, #f87171 100%)',
  },
]

export default function Lab() {
  const { textPrimary } = useTokens()

  return (
    <div className="grid-bento" style={{ gap: 12, maxWidth: 760, margin: '0 auto' }}>

      {experiments.map((e, i) => (
        <Card key={e.title} index={i} thumb={e.thumb}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <Tag label="EXP 00" />
            <p style={{ fontFamily: mono, fontSize: 16, fontWeight: 400, color: textPrimary, lineHeight: 1.3, transition: 'color 0.3s', margin: 0, textTransform: 'uppercase' }}>{e.title}</p>
          </div>
        </Card>
      ))}
    </div>
  )
}
