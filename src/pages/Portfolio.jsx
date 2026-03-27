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

const gradients = [
  'linear-gradient(135deg, #1a1a1a 0%, #404040 100%)',
  'linear-gradient(135deg, #2c2c2c 0%, #555 100%)',
  'linear-gradient(135deg, #111 0%, #444 100%)',
  'linear-gradient(135deg, #222 0%, #4a4a4a 100%)',
]

const projects = [
  {
    tag: 'Sistema de diseño',
    title: 'Design System — Fintech',
    desc: 'Tokens, componentes y documentación para un equipo de 12 diseñadores.',
    year: '2024',
    featured: true,
  },
  {
    tag: 'UX Research',
    title: 'Rediseño de onboarding',
    desc: 'Reducción del 40% en drop-off durante el flujo de activación.',
    year: '2024',
  },
  {
    tag: 'Producto',
    title: 'App de gestión de turnos',
    desc: 'Diseño end-to-end de una app móvil para el sector salud.',
    year: '2023',
  },
  {
    tag: 'Web',
    title: 'Sitio institucional — EdTech',
    desc: 'Rediseño completo con foco en conversión y accesibilidad.',
    year: '2023',
  },
]

export default function Portfolio() {
  const { textPrimary, textSecondary, textMuted } = useTokens()
  const [featured, ...rest] = projects

  return (
    <div className="grid-bento" style={{ gap: 12, maxWidth: 760, margin: '0 auto' }}>

      {/* Featured */}
      <Card index={0} className="bento-featured" style={{ padding: 28 }}>
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Tag label={featured.tag} />
            <ArrowUpRight size={16} style={{ color: textMuted }} />
          </div>
          <div style={{ flex: 1, borderRadius: 10, background: gradients[0], display: 'flex', alignItems: 'flex-end', padding: 20 }}>
            <span style={{ fontFamily: ff, fontSize: 11, fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.65)' }}>Vista previa</span>
          </div>
          <div>
            <p style={{ fontFamily: ff, fontSize: 20, fontWeight: 700, letterSpacing: '-0.4px', color: textPrimary, marginBottom: 4, transition: 'color 0.3s' }}>{featured.title}</p>
            <p style={{ fontFamily: ff, fontSize: 13, color: textSecondary, lineHeight: 1.5, transition: 'color 0.3s' }}>{featured.desc}</p>
          </div>
        </div>
      </Card>

      {rest.map((p, i) => (
        <Card key={p.title} index={i + 1} style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{ height: '55%', background: gradients[i + 1] }} />
          <div style={{ padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: 4 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <p style={{ fontFamily: ff, fontSize: 13, fontWeight: 600, letterSpacing: '-0.2px', color: textPrimary, transition: 'color 0.3s' }}>{p.title}</p>
              <ArrowUpRight size={14} style={{ color: textMuted, flexShrink: 0 }} />
            </div>
            <p style={{ fontFamily: ff, fontSize: 11, color: textMuted, transition: 'color 0.3s' }}>{p.tag} · {p.year}</p>
          </div>
        </Card>
      ))}
    </div>
  )
}
