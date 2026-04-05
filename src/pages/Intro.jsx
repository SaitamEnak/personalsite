import { useState } from 'react'
import { useTheme } from '../context/ThemeContext'
import { FaLinkedinIn, FaDribbble, FaBehance, FaEnvelope } from 'react-icons/fa'

const socialLinks = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/mcanepadcv', Icon: FaLinkedinIn },
  { label: 'Dribbble', href: 'https://dribbble.com/Kanematias', Icon: FaDribbble },
  { label: 'Behance', href: 'https://www.behance.net/MatiasCanepa', Icon: FaBehance },
  { label: 'Email', href: 'mailto:matiascanepadcv@gmail.com', Icon: FaEnvelope },
]

const ff = 'Figtree, sans-serif'

function useTokens() {
  const { dark } = useTheme()
  return {
    dark,
    textPrimary: dark ? '#e8e8e8' : '#111111',
    textMuted: dark ? '#9a9a9a' : '#5a5a5a',
    cardBg: dark ? '#1E1724' : '#F8F9FF',
    border: dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)',
  }
}

function BentoCard({ label, description, index, setActive }) {
  const { dark, textPrimary, textMuted, cardBg, border } = useTokens()
  const [hovered, setHovered] = useState(false)

  const gradients = [
    'linear-gradient(135deg, #0a1628 0%, #2563c4 100%)',
    'linear-gradient(135deg, #1a0a28 0%, #7002FF 100%)',
    'linear-gradient(135deg, #0a2818 0%, #1a7a40 100%)',
  ]

  return (
    <div
      onClick={() => setActive(index)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && setActive(index)}
      style={{
        borderRadius: 16,
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'box-shadow 0.2s ease',
        boxShadow: hovered ? '0 0 0 2px #7002FF' : 'none',
        background: gradients[index - 1],
        aspectRatio: '3/4',
        display: 'flex',
        alignItems: 'flex-end',
        padding: 16,
        position: 'relative',
      }}
    >
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(135deg, rgba(255,255,255,0.12) 0%, transparent 50%)',
        opacity: hovered ? 1 : 0,
        transition: 'opacity 0.2s',
      }} />
      <span style={{ fontFamily: ff, fontWeight: 700, fontSize: 16, letterSpacing: '-0.4px', color: '#fff', position: 'relative', zIndex: 1 }}>
        {label}
      </span>
    </div>
  )
}

const sections = [
  { index: 1, label: 'Articles', description: 'Reflexiones sobre diseño, sistemas y el impacto de la IA en la práctica del diseño.' },
  { index: 2, label: 'Portfolio', description: 'Proyectos de diseño de producto y experiencia de usuario.' },
  { index: 3, label: 'Lab', description: 'Experimentos, prototipos y exploraciones.' },
]

export default function Intro({ setActive }) {
  const { dark, textPrimary, textMuted, border } = useTokens()

  return (
    <div style={{ maxWidth: 860, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 40 }}>

      {/* Header: foto + bio */}
      <div className="reveal" style={{ animationDelay: '0.05s', display: 'flex', flexDirection: 'column', gap: 20 }}>
        {/* Foto + nombre/rol | iconos */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
          {/* Col 1: avatar + nombre + rol */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{
              width: 56,
              height: 56,
              borderRadius: '50%',
              background: dark ? '#333' : '#d9d9d9',
              overflow: 'hidden',
              flexShrink: 0,
            }}>
              <img
                src={`${import.meta.env.BASE_URL}avatar.png`}
                alt="Matias Cánepa"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                onError={(e) => { e.target.style.display = 'none' }}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <span style={{ fontFamily: ff, fontWeight: 700, fontSize: 22, letterSpacing: '-0.4px', lineHeight: 1.1, color: textPrimary, transition: 'color 0.3s' }}>
                Matias Cánepa
              </span>
              <span style={{ fontFamily: ff, fontSize: 14, lineHeight: 1.2, color: textMuted, transition: 'color 0.3s' }}>
                Product Designer
              </span>
            </div>
          </div>
          {/* Col 2: iconos sociales */}
          <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
            {socialLinks.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('mailto') ? undefined : '_blank'}
                rel="noopener noreferrer"
                aria-label={label}
                style={{ color: textMuted, display: 'flex', alignItems: 'center', transition: 'color 0.15s', textDecoration: 'none' }}
                onMouseEnter={(e) => { e.currentTarget.style.color = textPrimary }}
                onMouseLeave={(e) => { e.currentTarget.style.color = textMuted }}
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>
        <p style={{ fontFamily: ff, fontSize: 36, fontWeight: 500, lineHeight: 1.3, letterSpacing: '-0.8px', color: textPrimary, margin: 0, transition: 'color 0.3s' }}>
          Trabajando en la intersección entre sistemas, interfaces y comportamiento humano. Con interés creciente en cómo la IA transforma la práctica del diseño.
        </p>
      </div>

      {/* Bento grid */}
      <div className="reveal" style={{ animationDelay: '0.15s' }}>
        <p style={{ fontFamily: ff, fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: textMuted, margin: '0 0 12px', transition: 'color 0.3s' }}>
          Secciones
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
          <BentoCard {...sections[0]} setActive={setActive} />
          <BentoCard {...sections[1]} setActive={setActive} />
          <BentoCard {...sections[2]} setActive={setActive} />
        </div>
      </div>

    </div>
  )
}
