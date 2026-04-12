import { useState } from 'react'
import { useTheme } from '../context/ThemeContext'
import SectionHeader from '../components/SectionHeader'
import { stack } from '../data/stack'

const ff = 'Figtree, sans-serif'
const mono = "'Space Mono', monospace"

// ─── Data ─────────────────────────────────────────────────────────────────────

const experience = [
  {
    role: 'Product Designer',
    company: 'DinoCloud',
    period: 'Feb 2024 — presente',
    desc: 'Research con usuarios y stakeholders, prototipado en Figma y gestión de Design Systems. Coordinación con equipos de desarrollo y participación en actividades de Design Thinking.',
  },
  {
    role: 'Sr. UX/UI Designer',
    company: 'Aluxion',
    period: 'Ene 2023 — Oct 2023',
    desc: 'Research, arquitectura de información y sistemas de diseño robustos. Facilitación de workshops y usability testing en equipos ágiles multidisciplinarios.',
  },
  {
    role: 'Ssr. UX/UI Designer',
    company: 'Hyprr Studio',
    period: 'Dic 2021 — Dic 2022',
    desc: 'Diseño de wireframes, prototipos y user flows con validación mediante testing. Prototipado avanzado con HTML y CSS para ajustes de implementación.',
  },
]

const curiosidades = [
  { label: 'Based in', value: 'Buenos Aires, Argentina (UTC-3)', tooltip: 'GMT-3, aunque suelo estar despierto en horarios de GMT-6' },
  { label: 'Currently Watching', value: 'One Piece', tooltip: 'Episodio 900 y algo. No spoilers.' },
  { label: 'First Design Tool', value: 'Photoshop CS3', tooltip: 'Flash siempre fue mi favorito' },

  { label: 'Signo', value: 'Capricornio', tooltip: 'No se que significa eso' },

]

// ─── Subcomponents ─────────────────────────────────────────────────────────────

function BlockTitle({ children, textMuted }) {
  return (
    <h3 style={{
      fontFamily: ff, fontSize: 13, fontWeight: 700,
      letterSpacing: '0.06em', textTransform: 'uppercase',
      color: textMuted, margin: '0 0 20px',
    }}>
      {children}
    </h3>
  )
}

function Bio({ textPrimary, textSecondary }) {
  return (
    <div style={{ marginBottom: 56 }}>
      <BlockTitle textMuted={textSecondary}>Bio</BlockTitle>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <p style={{ fontFamily: ff, fontSize: 20, fontWeight: 500, letterSpacing: '-0.2px', lineHeight: 1.65, color: textPrimary, margin: 0 }}>
          Construí mi primera web en Adobe Flash hace más de 15 años y desde entonces no dejé de preguntarme cómo las personas interactúan con lo digital.
          <br /><br />
          Hoy creo productos y... cosas? utilizando IA.
        </p>
      </div>
    </div>
  )
}

const icons = import.meta.glob('../assets/stackicons/*.png', { eager: true })

function StackIcon({ item, textSecondary }) {
  const src = icons[`../assets/stackicons/${item.img}`]?.default

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, width: 64 }}>
      <div style={{
        width: 56, height: 56, borderRadius: 14,
        flexShrink: 0,
        background: src
          ? `url(${src}) center/cover no-repeat, ${item.bg}`
          : item.bg,
      }} />
      <span style={{
        fontFamily: ff, fontSize: 11, fontWeight: 500,
        color: textSecondary, textAlign: 'center',
        whiteSpace: 'nowrap',
      }}>
        {item.label}
      </span>
    </div>
  )
}

function Stack({ textPrimary, textSecondary }) {
  return (
    <div style={{ marginBottom: 56 }}>
      <BlockTitle textMuted={textSecondary}>Stack</BlockTitle>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20 }}>
        {stack.map(item => (
          <StackIcon key={item.label} item={item} textSecondary={textSecondary} />
        ))}
      </div>
    </div>
  )
}

function Experience({ textPrimary, textSecondary, border }) {
  return (
    <div style={{ marginBottom: 56 }}>
      <BlockTitle textMuted={textSecondary}>Experiencia</BlockTitle>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {experience.map((exp, i) => (
          <div key={i}>
            {i > 0 && <div style={{ height: 1, background: border, margin: '0' }} />}
            <div style={{ padding: '20px 0', display: 'grid', gridTemplateColumns: '1fr auto', gap: '4px 16px', alignItems: 'start' }}>
              <div>
                <span style={{ fontFamily: ff, fontSize: 20, fontWeight: 700, letterSpacing: '-0.2px', color: textPrimary, display: 'block', marginBottom: 2 }}>
                  {exp.role}
                  <span style={{ fontWeight: 400, color: textSecondary }}>{' · '}{exp.company}</span>
                </span>
                <p style={{ fontFamily: ff, fontSize: 16, color: textSecondary, lineHeight: 1.6, margin: 0 }}>
                  {exp.desc}
                </p>
              </div>
              <span style={{ fontFamily: mono, fontSize: 10, color: textSecondary, whiteSpace: 'nowrap', paddingTop: 3 }}>
                {exp.period}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function CuriosidadCard({ item, textPrimary, textSecondary, cardBg }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => item.tooltip && setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: cardBg,
        borderRadius: 12,
        padding: '16px 18px',
        display: 'flex', flexDirection: 'column', gap: 6,
        position: 'relative',
        zIndex: hovered ? 200 : 1,
      }}
    >
      <span style={{ fontFamily: mono, fontSize: 12, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: textSecondary }}>
        {item.label}
      </span>
      <span style={{ fontFamily: ff, fontSize: 16, fontWeight: 600, color: textPrimary, letterSpacing: '-0.2px' }}>
        {item.value}
      </span>

      {item.tooltip && (
        <div style={{
          position: 'absolute', bottom: 'calc(100% + 8px)', left: 0, right: 0,
          background: '#1a0533',
          border: '1px solid rgba(112,2,255,0.3)',
          borderRadius: 10,
          padding: '10px 14px',
          zIndex: 1000,
          pointerEvents: 'none',
          opacity: hovered ? 1 : 0,
          transform: hovered ? 'translateY(0)' : 'translateY(6px)',
          transition: 'opacity 0.2s ease, transform 0.2s ease',
        }}>
          <div style={{
            position: 'absolute', bottom: -5, left: 20,
            width: 10, height: 10,
            background: '#1a0533',
            border: '1px solid rgba(112,2,255,0.3)',
            borderTop: 'none', borderLeft: 'none',
            transform: 'rotate(45deg)',
          }} />
          <span style={{
            fontFamily: ff, fontSize: 13, fontWeight: 400,
            color: 'rgba(255,255,255,0.85)', lineHeight: 1.5,
          }}>
            {item.tooltip}
          </span>
        </div>
      )}
    </div>
  )
}

function Curiosidades({ textPrimary, textSecondary, cardBg }) {
  return (
    <div style={{ marginBottom: 40 }}>
      <BlockTitle textMuted={textSecondary}>Curiosidades</BlockTitle>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
        {curiosidades.map((item, i) => (
          <CuriosidadCard key={i} item={item} textPrimary={textPrimary} textSecondary={textSecondary} cardBg={cardBg} />
        ))}
      </div>
    </div>
  )
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function Timeline() {
  const { dark } = useTheme()

  const textPrimary = dark ? '#f0f0f0' : '#111'
  const textSecondary = dark ? '#a8a8a8' : '#606060'
  const cardBg = dark ? '#1E1724' : '#F0F0F8'
  const border = dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'

  return (
    <div className="reveal" style={{ width: '100%', maxWidth: 760, margin: '0 auto', padding: '8px 0 40px' }}>
      <SectionHeader title="About" desc="Quién soy, con qué trabajo y lo que me importa." />

      <Bio textPrimary={textPrimary} textSecondary={textSecondary} />
      <Stack textPrimary={textPrimary} textSecondary={textSecondary} />
      <Experience textPrimary={textPrimary} textSecondary={textSecondary} border={border} />
      <Curiosidades textPrimary={textPrimary} textSecondary={textSecondary} cardBg={cardBg} border={border} />
    </div>
  )
}
