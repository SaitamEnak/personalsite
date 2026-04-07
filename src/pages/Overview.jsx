import { useState, useEffect } from 'react'
import { useTheme } from '../context/ThemeContext'
import { articles } from '../data/articles.js'
import { projects } from '../data/portfolio.js'
import { fetchCollection } from '../lib/cms.js'

const ff = 'Figtree, sans-serif'
const mono = "'Space Mono', monospace"

// ─── Previews ────────────────────────────────────────────────────────────────

function LabPreview({ items, onNavigate }) {
  const [hovered, setHovered] = useState(null)
  if (!items.length) return null
  return (
    <div
      style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 7, width: '100%' }}
      onClick={e => e.stopPropagation()}
    >
      {items.slice(0, 4).map((item, i) => (
        <div
          key={item.slug ?? item.title}
          onClick={() => onNavigate(3)}
          onMouseEnter={() => setHovered(i)}
          onMouseLeave={() => setHovered(null)}
          style={{
            borderRadius: 10,
            overflow: 'hidden',
            aspectRatio: '4/3',
            background: item.thumb?.startsWith('http')
              ? `url(${item.thumb}) center/cover no-repeat`
              : (item.thumb || 'linear-gradient(140deg, #0f2027 0%, #203a43 100%)'),
            position: 'relative',
            cursor: 'pointer',
            transform: hovered === i ? 'scale(1.03)' : 'scale(1)',
            transition: 'transform 0.2s ease',
          }}
        >
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)',
          }} />
          {hovered === i && (
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(255,255,255,0.06)' }} />
          )}
          <span style={{
            position: 'absolute', bottom: 6, left: 8,
            fontFamily: mono, fontSize: 8, fontWeight: 500,
            letterSpacing: '0.06em', textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.75)',
          }}>
            [{item.label ?? item.title}]
          </span>
        </div>
      ))}
    </div>
  )
}

function ArticlesPreview({ large, onNavigate }) {
  const [hovered, setHovered] = useState(null)
  const recent = articles.slice(0, large ? 3 : 2)
  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', gap: large ? 10 : 7, marginTop: large ? 18 : 12 }}
      onClick={e => e.stopPropagation()}
    >
      {recent.map((a, i) => (
        <div
          key={a.slug}
          onClick={() => onNavigate(1)}
          onMouseEnter={() => setHovered(i)}
          onMouseLeave={() => setHovered(null)}
          style={{
            display: 'flex', flexDirection: 'column', gap: 3,
            borderLeft: `2px solid ${hovered === i ? 'rgba(52,211,153,0.7)' : 'rgba(52,211,153,0.25)'}`,
            paddingLeft: large ? 10 : 8,
            cursor: 'pointer',
            transition: 'border-color 0.2s',
          }}
        >
          <span style={{
            fontFamily: mono, fontSize: 8, fontWeight: 600,
            color: 'rgba(255,255,255,0.35)', letterSpacing: '0.1em',
            textTransform: 'uppercase',
          }}>
            {a.tag} · {a.readingTime}
          </span>
          <span style={{
            fontFamily: ff, fontSize: large ? 12.5 : 11.5, fontWeight: 500,
            color: hovered === i ? '#fff' : 'rgba(255,255,255,0.8)',
            lineHeight: 1.3, transition: 'color 0.2s',
          }}>
            {a.title}
          </span>
        </div>
      ))}
    </div>
  )
}

function PortfolioPreview({ onNavigate }) {
  const [hovered, setHovered] = useState(null)
  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 14 }}
      onClick={e => e.stopPropagation()}
    >
      {projects.slice(0, 3).map((p, i) => (
        <div
          key={p.title}
          onClick={() => onNavigate(2)}
          onMouseEnter={() => setHovered(i)}
          onMouseLeave={() => setHovered(null)}
          style={{
            display: 'flex', alignItems: 'center', gap: 8,
            borderRadius: 8,
            background: hovered === i ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.05)',
            padding: '6px 10px',
            cursor: 'pointer',
            transition: 'background 0.2s',
          }}
        >
          <div style={{
            width: 24, height: 24, borderRadius: 6, flexShrink: 0,
            background: p.gradient,
          }} />
          <div style={{ minWidth: 0, flex: 1 }}>
            <div style={{
              fontFamily: ff, fontSize: 11, fontWeight: 600,
              color: 'rgba(255,255,255,0.85)',
              whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
            }}>
              {p.title}
            </div>
            <div style={{
              fontFamily: mono, fontSize: 8, fontWeight: 500,
              color: p.accent, letterSpacing: '0.06em', textTransform: 'uppercase',
            }}>
              {p.tag}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

function TimelinePreview({ onNavigate }) {
  const [hovered, setHovered] = useState(null)
  const milestones = [
    { year: '2010', gradient: 'linear-gradient(160deg, #1a0a0a 0%, #3d1212 100%)' },
    { year: '2015', gradient: 'linear-gradient(160deg, #0a121a 0%, #12263d 100%)' },
    { year: '2019', gradient: 'linear-gradient(160deg, #1a0a2e 0%, #2d1060 100%)' },
    { year: '2022', gradient: 'linear-gradient(160deg, #0f2027 0%, #2c5364 100%)' },
    { year: '2026', gradient: 'linear-gradient(160deg, #0a0f1a 0%, #0f2040 100%)', current: true },
  ]
  return (
    <div
      style={{ display: 'flex', alignItems: 'center', gap: 0, marginTop: 16 }}
      onClick={e => e.stopPropagation()}
    >
      {milestones.map((m, i) => (
        <div key={m.year} style={{ display: 'flex', alignItems: 'center', flex: i < milestones.length - 1 ? 1 : 0 }}>
          <div
            onClick={() => onNavigate(4)}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5, cursor: 'pointer' }}
          >
            <div style={{
              width: m.current ? 28 : 22,
              height: m.current ? 28 : 22,
              borderRadius: 6,
              background: m.gradient,
              border: hovered === i
                ? '1.5px solid rgba(167,139,250,0.8)'
                : m.current
                  ? '1.5px solid rgba(167,139,250,0.6)'
                  : '1px solid rgba(255,255,255,0.1)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transform: hovered === i ? 'scale(1.15)' : 'scale(1)',
              transition: 'transform 0.2s ease, border-color 0.2s',
            }}>
              {m.current && <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#a78bfa' }} />}
            </div>
            <span style={{
              fontFamily: mono, fontSize: 8, letterSpacing: '0.04em',
              color: hovered === i ? 'rgba(167,139,250,0.9)' : m.current ? 'rgba(167,139,250,0.8)' : 'rgba(255,255,255,0.4)',
              transition: 'color 0.2s',
            }}>
              {m.year}
            </span>
          </div>
          {i < milestones.length - 1 && (
            <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.08)', margin: '0 4px', marginBottom: 18 }} />
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
    gradient: 'linear-gradient(140deg, #1a0533 0%, #7002FF 100%)',
    accent: '#c084fc',
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
    gradient: 'linear-gradient(140deg, #0f2027 0%, #203a43 50%, #2c5364 100%)',
    accent: '#34d399',
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
  lab: ({ labItems, onNavigate }) => <LabPreview items={labItems} onNavigate={onNavigate} />,
  articles: ({ onNavigate }) => <ArticlesPreview large onNavigate={onNavigate} />,
  portfolio: ({ onNavigate }) => <PortfolioPreview onNavigate={onNavigate} />,
  timeline: ({ onNavigate }) => <TimelinePreview onNavigate={onNavigate} />,
}

function SectionCard({ type, animIndex, onNavigate, labItems = [] }) {
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
        padding: `32px ${cfg.padding}px`,
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

      {type === 'lab' ? (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, flex: 1 }}>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
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
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Preview cfg={cfg} labItems={labItems} onNavigate={onNavigate} />
          </div>
        </div>
      ) : (
        <>
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
          <Preview cfg={cfg} labItems={labItems} onNavigate={onNavigate} />
        </>
      )}

    </div>
  )
}

// ─── Overview ─────────────────────────────────────────────────────────────────

export default function Overview({ onNavigate }) {
  const { dark } = useTheme()
  const textPrimary = dark ? '#f0f0f0' : '#111'
  const textSecondary = dark ? '#a8a8a8' : '#606060'
  const [labItems, setLabItems] = useState([])

  useEffect(() => {
    fetchCollection('lab').then(setLabItems)
  }, [])

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
        <SectionCard type="lab"       animIndex={0} onNavigate={onNavigate} labItems={labItems} />
        <SectionCard type="articles"  animIndex={1} onNavigate={onNavigate} />
        <SectionCard type="portfolio" animIndex={2} onNavigate={onNavigate} />
        <SectionCard type="timeline"  animIndex={3} onNavigate={onNavigate} />
      </div>
    </div>
  )
}
