import { useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import { articles } from '../data/articles.js'

const ff = 'Figtree, sans-serif'
const mono = "'Space Mono', monospace"

// ─── Previews ────────────────────────────────────────────────────────────────

function LabPreview({ featured }) {
  const items = ['Prototipo', 'Generativo', 'Interacción', 'Tool', 'Experimento', 'Visual']
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: featured ? 8 : 6, marginTop: featured ? 20 : 14 }}>
      {items.slice(0, featured ? 6 : 4).map(t => (
        <span key={t} style={{
          fontFamily: mono,
          fontSize: featured ? 10 : 9,
          fontWeight: 500,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.55)',
          border: '1px solid rgba(255,255,255,0.18)',
          borderRadius: 5,
          padding: featured ? '4px 10px' : '3px 7px',
        }}>
          [{t}]
        </span>
      ))}
    </div>
  )
}

function ArticlesPreview({ large }) {
  const recent = articles.slice(0, large ? 3 : 2)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: large ? 10 : 7, marginTop: large ? 18 : 12 }}>
      {recent.map(a => (
        <div key={a.slug} style={{
          display: 'flex', flexDirection: 'column', gap: 3,
          borderLeft: '2px solid rgba(192,132,252,0.35)',
          paddingLeft: large ? 10 : 8,
        }}>
          <span style={{
            fontFamily: mono, fontSize: 8, fontWeight: 600,
            color: 'rgba(255,255,255,0.35)', letterSpacing: '0.1em',
            textTransform: 'uppercase',
          }}>
            {a.tag} · {a.readingTime}
          </span>
          <span style={{
            fontFamily: ff, fontSize: large ? 12.5 : 11.5, fontWeight: 500,
            color: 'rgba(255,255,255,0.8)', lineHeight: 1.3,
          }}>
            {a.title}
          </span>
        </div>
      ))}
    </div>
  )
}

function PortfolioPreview() {
  const tags = ['Design System', 'UX Research', 'Producto', 'Web']
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginTop: 12 }}>
      {tags.map(t => (
        <span key={t} style={{
          fontFamily: mono, fontSize: 9, fontWeight: 500,
          letterSpacing: '0.06em', textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.45)',
          border: '1px solid rgba(255,255,255,0.12)',
          borderRadius: 4, padding: '3px 7px',
        }}>
          {t}
        </span>
      ))}
    </div>
  )
}

function TimelinePreview() {
  const milestones = [
    { year: '2010', label: 'Inicio' },
    { year: '2015', label: 'UX' },
    { year: '2019', label: 'Product' },
    { year: '2022', label: 'AI' },
    { year: '2026', label: 'Hoy' },
  ]
  return (
    <div style={{ display: 'flex', alignItems: 'center', marginTop: 14 }}>
      {milestones.map((m, i) => (
        <div key={m.year} style={{ display: 'flex', alignItems: 'center', flex: i < milestones.length - 1 ? 1 : 0 }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5 }}>
            <div style={{ width: 7, height: 7, borderRadius: '50%', background: 'rgba(167,139,250,0.6)', flexShrink: 0 }} />
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
              <span style={{ fontFamily: mono, fontSize: 9, color: 'rgba(255,255,255,0.55)', letterSpacing: '0.04em' }}>
                {m.year}
              </span>
              <span style={{ fontFamily: ff, fontSize: 9, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.02em' }}>
                {m.label}
              </span>
            </div>
          </div>
          {i < milestones.length - 1 && (
            <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.1)', margin: '0 6px', marginBottom: 28 }} />
          )}
        </div>
      ))}
    </div>
  )
}

// ─── Card ────────────────────────────────────────────────────────────────────

const CARD_CONFIG = {
  lab: {
    tabIndex: 3,
    label: 'Lab',
    title: 'Lab',
    desc: 'Experimentos, prototipos y curiosidades. Cosas que no encajan en ningún otro lugar.',
    gradient: 'linear-gradient(140deg, #0f2027 0%, #203a43 50%, #2c5364 100%)',
    accent: '#34d399',
    gridArea: 'lab',
    titleSize: 30,
    descSize: 14,
    padding: 28,
    arrowSize: 32,
  },
  articles: {
    tabIndex: 1,
    label: 'Articles',
    title: 'Artículos',
    desc: 'Reflexiones sobre diseño, sistemas y el impacto de la IA en la práctica del producto.',
    gradient: 'linear-gradient(140deg, #1a0533 0%, #7002FF 100%)',
    accent: '#c084fc',
    gridArea: 'articles',
    titleSize: 22,
    descSize: 13,
    padding: 22,
    arrowSize: 28,
  },
  portfolio: {
    tabIndex: 2,
    label: 'Portfolio',
    title: 'Portfolio',
    desc: 'Proyectos de producto. Design systems, apps móviles y rediseños.',
    gradient: 'linear-gradient(140deg, #0d1f2d 0%, #00416a 100%)',
    accent: '#38bdf8',
    gridArea: 'portfolio',
    titleSize: 19,
    descSize: 12,
    padding: 20,
    arrowSize: 26,
  },
  timeline: {
    tabIndex: 4,
    label: 'Timeline',
    title: 'Timeline',
    desc: 'Un recorrido por mi carrera desde 2010.',
    gradient: 'linear-gradient(140deg, #0f0c29 0%, #302b63 100%)',
    accent: '#a78bfa',
    gridArea: 'timeline',
    titleSize: 17,
    descSize: 12,
    padding: 20,
    arrowSize: 24,
  },
}

const PREVIEW_MAP = {
  lab: ({ cfg }) => <LabPreview featured />,
  articles: ({ cfg }) => <ArticlesPreview large />,
  portfolio: ({ cfg }) => <PortfolioPreview />,
  timeline: ({ cfg }) => <TimelinePreview />,
}

function SectionCard({ type, animIndex, onNavigate }) {
  const [hovered, setHovered] = useState(false)
  const cfg = CARD_CONFIG[type]
  const Preview = PREVIEW_MAP[type]

  return (
    <div
      className={`reveal overview-card overview-card--${type}`}
      style={{
        gridArea: cfg.gridArea,
        animationDelay: `${animIndex * 0.1}s`,
        borderRadius: 16,
        overflow: 'hidden',
        cursor: 'pointer',
        background: cfg.gradient,
        position: 'relative',
        padding: cfg.padding,
        display: 'flex',
        flexDirection: 'column',
        transition: 'box-shadow 0.2s ease',
        boxShadow: hovered ? '0 0 0 2px #7002FF' : 'none',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onNavigate(cfg.tabIndex)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onNavigate(cfg.tabIndex)}
    >
      {/* Light hover overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 55%)',
        opacity: hovered ? 1 : 0,
        transition: 'opacity 0.35s ease',
        pointerEvents: 'none',
      }} />

      {/* Title + desc */}
      <div style={{ flex: 1 }}>
        <h3 style={{
          fontFamily: ff, fontSize: cfg.titleSize, fontWeight: 800,
          letterSpacing: '-0.5px', color: '#fff',
          margin: '0 0 7px', lineHeight: 1.05,
        }}>
          {cfg.title}
        </h3>
        <p style={{
          fontFamily: ff, fontSize: cfg.descSize,
          color: 'rgba(255,255,255,0.6)',
          margin: 0, lineHeight: 1.5,
        }}>
          {cfg.desc}
        </p>
      </div>

      <Preview cfg={cfg} />

      {/* Arrow — bottom right */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 14 }}>
        <div style={{
          width: cfg.arrowSize, height: cfg.arrowSize, borderRadius: '50%',
          background: 'rgba(255,255,255,0.12)',
          backdropFilter: 'blur(4px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
          opacity: hovered ? 1 : 0.4,
          transition: 'opacity 0.2s',
        }}>
          <ArrowUpRight size={cfg.arrowSize * 0.45} color="#fff" />
        </div>
      </div>
    </div>
  )
}

// ─── Overview ─────────────────────────────────────────────────────────────────

export default function Overview({ onNavigate }) {
  const { dark } = useTheme()
  const textPrimary = dark ? '#f0f0f0' : '#111'
  const textSecondary = dark ? '#a8a8a8' : '#606060'

  return (
    <div style={{ maxWidth: 760, margin: '0 auto' }}>
      {/* Intro */}
      <div style={{ padding: '0 4px 24px' }}>
        <h2 style={{
          fontFamily: ff, fontSize: 26, fontWeight: 800,
          letterSpacing: '-0.6px', color: textPrimary,
          margin: 0, lineHeight: 1, transition: 'color 0.3s',
        }}>
          Explorá el sitio
        </h2>
        <p style={{
          fontFamily: ff, fontSize: 14,
          color: textSecondary, margin: '6px 0 0',
          lineHeight: 1.5, transition: 'color 0.3s',
        }}>
          Cuatro secciones para conocer mi trabajo, ideas y proceso.
        </p>
      </div>

      {/* Bento grid con jerarquía */}
      <div className="overview-grid">
        <SectionCard type="lab"       animIndex={0} onNavigate={onNavigate} />
        <SectionCard type="articles"  animIndex={1} onNavigate={onNavigate} />
        <SectionCard type="portfolio" animIndex={2} onNavigate={onNavigate} />
        <SectionCard type="timeline"  animIndex={3} onNavigate={onNavigate} />
      </div>
    </div>
  )
}
