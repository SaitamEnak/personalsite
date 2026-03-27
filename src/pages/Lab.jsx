import { ArrowUpRight } from 'lucide-react'
import { useState } from 'react'
import { useTheme } from '../context/ThemeContext'

const ff = 'Figtree, sans-serif'

function useTokens() {
  const { dark } = useTheme()
  return {
    cardBg: dark ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.45)',
    textPrimary: dark ? '#e8e8e8' : '#111111',
    textSecondary: dark ? '#a8a8a8' : '#555555',
    textMuted: dark ? '#9a9a9a' : '#5a5a5a',
    tagBg: dark ? 'rgba(255,255,255,0.1)' : '#e8e8e8',
    tagColor: dark ? '#a8a8a8' : '#555555',
  }
}

function Card({ children, style, className = '', index = 0 }) {
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
        transition: 'transform 0.2s ease, background 0.3s ease',
        ...style,
        transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      role="button"
      tabIndex={0}
    >
      {children}
    </div>
  )
}

function Tag({ label }) {
  const { tagBg, tagColor } = useTokens()
  return (
    <span style={{ fontFamily: ff, fontSize: 11, fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', color: tagColor, background: tagBg, borderRadius: 6, padding: '3px 8px', transition: 'background 0.3s, color 0.3s', alignSelf: 'flex-start', display: 'inline-block' }}>
      {label}
    </span>
  )
}

const experiments = [
  {
    tag: 'Interacción',
    title: 'Cursor magnético',
    desc: 'Exploración de microinteracciones con campos de fuerza en elementos UI.',
    featured: true,
  },
  {
    tag: 'Generativo',
    title: 'Paletas desde imágenes',
    desc: 'Extracción automática de tokens de color a partir de fotografías.',
  },
  {
    tag: 'Tipografía',
    title: 'Variable font playground',
    desc: 'Exploración de ejes tipográficos variables en tiempo real.',
  },
  {
    tag: 'IA',
    title: 'Prompt to component',
    desc: 'Generación de componentes Figma desde lenguaje natural.',
  },
  {
    tag: 'Motion',
    title: 'Transiciones de layout',
    desc: 'Patrones de animación para cambios de estado en grids.',
  },
]

export default function Lab() {
  const { textPrimary, textSecondary, textMuted } = useTokens()
  const [featured, ...rest] = experiments

  return (
    <div className="grid-bento" style={{ gap: 12, maxWidth: 760, margin: '0 auto' }}>

      {/* Featured */}
      <Card index={0} className="bento-wide" style={{ padding: 28 }}>
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: 12 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Tag label={featured.tag} />
            <ArrowUpRight size={16} style={{ color: textMuted }} />
          </div>
          <p style={{ fontFamily: ff, fontSize: 22, fontWeight: 700, letterSpacing: '-0.4px', color: textPrimary, flex: 1, transition: 'color 0.3s' }}>{featured.title}</p>
          <p style={{ fontFamily: ff, fontSize: 13, color: textSecondary, lineHeight: 1.5, transition: 'color 0.3s' }}>{featured.desc}</p>
        </div>
      </Card>

      {/* Now card */}
      <Card index={1} style={{ padding: 22, background: '#111' }}>
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: 10 }}>
          <Tag label="Lab" />
          <p style={{ fontFamily: ff, fontSize: 13, color: 'rgba(255,255,255,0.75)', lineHeight: 1.6, flex: 1 }}>
            Experimentos, prototipos y exploraciones en diseño e interacción. Sin filtro.
          </p>
          <ArrowUpRight size={16} style={{ color: 'rgba(255,255,255,0.55)' }} />
        </div>
      </Card>

      {rest.map((e, i) => (
        <Card key={e.title} index={i + 2} style={{ padding: 22 }}>
          <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: 10 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Tag label={e.tag} />
              <ArrowUpRight size={16} style={{ color: textMuted }} />
            </div>
            <p style={{ fontFamily: ff, fontSize: 14, fontWeight: 600, letterSpacing: '-0.2px', color: textPrimary, flex: 1, lineHeight: 1.35, transition: 'color 0.3s' }}>{e.title}</p>
            <p style={{ fontFamily: ff, fontSize: 12, color: textMuted, lineHeight: 1.4, transition: 'color 0.3s' }}>{e.desc}</p>
          </div>
        </Card>
      ))}
    </div>
  )
}
