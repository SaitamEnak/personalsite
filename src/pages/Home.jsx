import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import Tabs from '../components/Tabs'
import Articles from './Articles'
import Lab from './Lab'
import Timeline from './Timeline'
import { useTheme } from '../context/ThemeContext'
import { articles as staticArticles } from '../data/articles'
import { projects } from '../data/portfolio'
import { fetchCollection } from '../lib/cms'

const ff = 'Figtree, sans-serif'
const mono = "'Space Mono', monospace"

function useTokens() {
  const { dark } = useTheme()
  return {
    cardBg: dark ? '#1E1724' : '#F0F0F8',
    textPrimary: dark ? '#e8e8e8' : '#111111',
    textMuted: dark ? '#9a9a9a' : '#5a5a5a',
    tagColor: dark ? '#a8a8a8' : '#555555',
    divider: dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)',
  }
}

// ─── Section wrapper ──────────────────────────────────────────────────────────

function Section({ title, subtitle, tabIndex, onNavigate, children }) {
  const { textPrimary, textMuted } = useTokens()
  return (
    <div style={{ marginBottom: 56 }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 20, gap: 16 }}>
        <div>
          <h2 style={{
            fontFamily: ff, fontSize: 13, fontWeight: 700,
            letterSpacing: '0.06em', textTransform: 'uppercase',
            color: textMuted, margin: '0 0 6px',
          }}>
            {title}
          </h2>
          {subtitle && (
            <p style={{
              fontFamily: ff, fontSize: 15, fontWeight: 500,
              letterSpacing: '-0.2px', color: textPrimary,
              margin: 0, lineHeight: 1.3,
            }}>
              {subtitle}
            </p>
          )}
        </div>
        {onNavigate && (
          <button
            onClick={() => onNavigate(tabIndex)}
            style={{
              fontFamily: ff, fontSize: 13, fontWeight: 500,
              color: textMuted, background: 'none', border: 'none',
              cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4, padding: 0,
              transition: 'color 0.15s', flexShrink: 0, marginTop: 1,
            }}
            onMouseEnter={e => { e.currentTarget.style.color = '#7002FF' }}
            onMouseLeave={e => { e.currentTarget.style.color = textMuted }}
          >
            Ver todo <ArrowRight size={13} />
          </button>
        )}
      </div>
      {children}
    </div>
  )
}

// ─── Articles preview ─────────────────────────────────────────────────────────

function ArticleGridCard({ article, index }) {
  const [hovered, setHovered] = useState(false)
  const navigate = useNavigate()

  const isImage = article.cover && !article.cover.startsWith('linear-gradient') && !article.cover.startsWith('radial-gradient')

  return (
    <div
      className="reveal"
      onClick={() => navigate(`/articles/${article.slug}`)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onKeyDown={e => e.key === 'Enter' && navigate(`/articles/${article.slug}`)}
      role="button"
      tabIndex={0}
      style={{
        animationDelay: `${index * 0.07}s`,
        position: 'relative',
        borderRadius: 14,
        overflow: 'hidden',
        aspectRatio: '3/4',
        cursor: 'pointer',
        boxShadow: hovered ? '0 0 0 2px #7002FF' : '0 0 0 0px transparent',
        transition: 'box-shadow 0.2s',
        background: isImage
          ? `url(${article.cover}) center/cover no-repeat`
          : (article.cover || 'linear-gradient(135deg, #1a1a1a, #3a3a3a)'),
      }}
    >
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.3) 50%, transparent 100%)',
        transition: 'opacity 0.2s',
        opacity: hovered ? 0.9 : 1,
      }} />
      {hovered && (
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(135deg, rgba(255,255,255,0.07) 0%, transparent 60%)',
        }} />
      )}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        padding: '16px 14px',
        display: 'flex', flexDirection: 'column', gap: 6,
      }}>
        <span style={{
          fontFamily: ff, fontSize: 9, fontWeight: 700,
          textTransform: 'uppercase', letterSpacing: '0.08em',
          color: 'rgba(255,255,255,0.55)',
        }}>
          {article.tag}
        </span>
        <span style={{
          fontFamily: ff, fontSize: 16, fontWeight: 600,
          color: '#fff', lineHeight: 1.3, letterSpacing: '-0.2px',
          display: '-webkit-box', WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical', overflow: 'hidden',
        }}>
          {article.title}
        </span>
        <span style={{
          fontFamily: ff, fontSize: 10,
          color: 'rgba(255,255,255,0.45)',
        }}>
          {article.date} · {article.readingTime}
        </span>
      </div>
    </div>
  )
}

// ─── Portfolio preview — horizontal cards ────────────────────────────────────

function PortfolioCard({ project }) {
  const { cardBg, textPrimary, textMuted } = useTokens()
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className="flex flex-col sm:flex-row sm:items-center"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        gap: 14,
        borderRadius: 14,
        boxShadow: hovered ? '0 0 0 2px #7002FF' : '0 0 0 0px transparent',
        background: hovered ? cardBg : 'transparent',
        transition: 'box-shadow 0.2s, background 0.2s',
        cursor: 'pointer',
        padding: 8,
      }}
    >
      {/* gradient thumb — all corners rounded */}
      <div
        className="w-full sm:w-[58%]"
        style={{
          aspectRatio: '4/3', flexShrink: 0,
          borderRadius: 10,
          background: project.gradient,
          position: 'relative', overflow: 'hidden',
        }}
      >
        {hovered && (
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(255,255,255,0.07)' }} />
        )}
      </div>

      {/* text */}
      <div style={{
        flex: 1, minWidth: 0,
        display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 4,
        padding: '0 6px',
      }}>
        <span style={{
          fontFamily: ff, fontSize: 11, fontWeight: 700,
          textTransform: 'uppercase', letterSpacing: '0.08em',
          color: project.accent,
        }}>
          {project.tag}
        </span>
        <span style={{
          fontFamily: ff, fontSize: 20, fontWeight: 600,
          color: textPrimary, letterSpacing: '-0.3px', lineHeight: 1.25,
        }}>
          {project.title}
        </span>
        {project.desc && (
          <span style={{
            fontFamily: ff, fontSize: 14, color: textMuted, lineHeight: 1.5,
          }}>
            {project.desc}
          </span>
        )}
      </div>
    </div>
  )
}

// ─── Lab preview — list with 4:3 thumbnail ───────────────────────────────────

function LabListItem({ item, onNavigate }) {
  const { cardBg, textPrimary, textMuted } = useTokens()
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className="flex flex-col sm:flex-row sm:items-center"
      onClick={() => onNavigate(2)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      role="button"
      tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && onNavigate(2)}
      style={{
        gap: 14,
        borderRadius: 14,
        boxShadow: hovered ? '0 0 0 2px #7002FF' : '0 0 0 0px transparent',
        background: hovered ? cardBg : 'transparent',
        transition: 'box-shadow 0.2s, background 0.2s',
        cursor: 'pointer',
        padding: 8,
      }}
    >
      {/* thumbnail 4:3 */}
      <div
        className="w-full sm:w-[22%]"
        style={{
          aspectRatio: '4/3', flexShrink: 0,
          borderRadius: 10, overflow: 'hidden',
          position: 'relative',
          background: item.thumb?.startsWith('http')
            ? `url(${item.thumb}) center/cover no-repeat`
            : (item.thumb || 'linear-gradient(140deg, #1a0533 0%, #7002FF 100%)'),
        }}
      >
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.45) 0%, transparent 55%)',
        }} />
        {hovered && (
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(255,255,255,0.07)' }} />
        )}
      </div>

      {/* text */}
      <div style={{
        flex: 1, minWidth: 0,
        display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 4,
        padding: '0 6px',
      }}>
        {item.tag && (
          <span style={{
            fontFamily: mono, fontSize: 9, fontWeight: 700,
            textTransform: 'uppercase', letterSpacing: '0.08em',
            color: '#7002FF',
          }}>
            {item.tag}
          </span>
        )}
        <span style={{
          fontFamily: ff, fontSize: 18, fontWeight: 600,
          color: textPrimary, letterSpacing: '-0.3px', lineHeight: 1.25,
        }}>
          {item.label ?? item.title}
        </span>
        {item.desc && (
          <span style={{
            fontFamily: ff, fontSize: 13, color: textMuted, lineHeight: 1.5,
          }}>
            {item.desc}
          </span>
        )}
      </div>
    </div>
  )
}

// ─── Home content (stacked sections) ─────────────────────────────────────────

function HomeContent({ onNavigate }) {
  const tokens = useTokens()
  const [labItems, setLabItems] = useState([])

  useEffect(() => {
    fetchCollection('lab').then(setLabItems)
  }, [])

  const previewArticles = staticArticles.slice(0, 3)
  const previewProjects = projects.slice(0, 3)
  const previewLab = labItems.slice(0, 3)

  return (
    <div style={{ maxWidth: 760, margin: '0 auto', paddingTop: 36 }}>

      {/* Welcome */}
      <p style={{
        fontFamily: ff, fontSize: 36, fontWeight: 700,
        color: tokens.textPrimary, letterSpacing: '-0.8px',
        margin: '0 0 48px', lineHeight: 1.2,
      }}>
        bienvenido a mi pequeño espacio en la nube ☁️
      </p>

      {/* Articles */}
      <Section
        title="Artículos"
        subtitle="Guías, recursos y reflexiones sobre diseño, producto e IA"
        tabIndex={1}
        onNavigate={onNavigate}
      >
        <div className="grid grid-cols-1 sm:grid-cols-3" style={{ gap: 12 }}>
          {previewArticles.map((a, i) => (
            <ArticleGridCard key={a.slug} article={a} index={i} />
          ))}
        </div>
      </Section>

      {/* Portfolio — 3 cards, no tab destination */}
      <Section
        title="Portfolio"
        subtitle="Proyectos de diseño de producto y sistemas"
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {previewProjects.map(p => (
            <PortfolioCard key={p.title} project={p} />
          ))}
        </div>
      </Section>

      {/* Lab — list with 4:3 thumbnails */}
      <Section
        title="Lab"
        subtitle="Experimentos, prototipos y cosas raras"
        tabIndex={2}
        onNavigate={onNavigate}
      >
        {previewLab.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {previewLab.map(item => (
              <LabListItem
                key={item.slug ?? item.title}
                item={item}
                onNavigate={onNavigate}
              />
            ))}
          </div>
        ) : (
          <div style={{ fontFamily: mono, fontSize: 11, color: 'rgba(255,255,255,0.3)', textAlign: 'center', padding: '24px 0' }}>
            Cargando...
          </div>
        )}
      </Section>

    </div>
  )
}

// ─── Home ─────────────────────────────────────────────────────────────────────

export default function Home() {
  const [active, setActive] = useState(0)

  return (
    <div style={{ padding: '0 0 16px 0' }}>
      <Tabs active={active} onTabChange={setActive}>
        <HomeContent onNavigate={setActive} />
        <Articles />
        <Lab />
        <Timeline />
      </Tabs>
    </div>
  )
}
