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

function ArticleRow({ article }) {
  const { cardBg, textPrimary, textMuted, tagColor } = useTokens()
  const navigate = useNavigate()
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onClick={() => navigate(`/articles/${article.slug}`)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      role="button"
      tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && navigate(`/articles/${article.slug}`)}
      style={{
        display: 'flex', gap: 16, alignItems: 'center',
        padding: '12px 14px', borderRadius: 12,
        background: hovered ? cardBg : 'transparent',
        boxShadow: hovered ? '0 0 0 2px #7002FF' : '0 0 0 0px transparent',
        cursor: 'pointer', transition: 'background 0.2s, box-shadow 0.2s',
        marginLeft: -14, marginRight: -14,
      }}
    >
      <div style={{
        width: 80, aspectRatio: '4/3', borderRadius: 10, flexShrink: 0,
        background: article.cover && !article.cover.startsWith('linear-gradient') && !article.cover.startsWith('radial-gradient')
          ? `url(${article.cover}) center/cover no-repeat`
          : (article.cover || 'linear-gradient(135deg, #1a1a1a, #3a3a3a)'),
      }} />
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 3 }}>
        <span style={{
          fontFamily: ff, fontSize: 10, fontWeight: 600,
          textTransform: 'uppercase', letterSpacing: '0.07em', color: tagColor,
        }}>
          {article.tag}
        </span>
        <span style={{
          fontFamily: ff, fontSize: 15, fontWeight: 500,
          color: textPrimary, lineHeight: 1.35, letterSpacing: '-0.2px',
          whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
        }}>
          {article.title}
        </span>
        <span style={{ fontFamily: ff, fontSize: 11, color: textMuted }}>
          {article.date} · {article.readingTime}
        </span>
      </div>
    </div>
  )
}

// ─── Portfolio preview — 3-col gradient cards ─────────────────────────────────

function PortfolioCard({ project }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: 14, overflow: 'hidden',
        background: project.gradient,
        aspectRatio: '4/3', position: 'relative',
        boxShadow: hovered ? '0 0 0 2px #7002FF' : '0 0 0 0px transparent',
        transition: 'box-shadow 0.2s',
        cursor: 'pointer',
      }}
    >
      {/* bottom gradient */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 60%)',
      }} />
      {/* text */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '12px 14px' }}>
        <span style={{
          fontFamily: ff, fontSize: 9, fontWeight: 700,
          textTransform: 'uppercase', letterSpacing: '0.08em',
          color: project.accent, display: 'block', marginBottom: 4,
        }}>
          {project.tag}
        </span>
        <span style={{
          fontFamily: ff, fontSize: 13, fontWeight: 700,
          color: '#fff', letterSpacing: '-0.2px', lineHeight: 1.25, display: 'block',
        }}>
          {project.title}
        </span>
      </div>
    </div>
  )
}

// ─── Lab preview — asymmetric grid (1 featured + 2 stacked) ──────────────────

function LabThumb({ item, onNavigate, style = {} }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onClick={() => onNavigate(2)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      role="button"
      tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && onNavigate(2)}
      style={{
        borderRadius: 12, overflow: 'hidden', cursor: 'pointer',
        position: 'relative', flexShrink: 0,
        background: item.thumb?.startsWith('http')
          ? `url(${item.thumb}) center/cover no-repeat`
          : (item.thumb || 'linear-gradient(140deg, #1a0533 0%, #7002FF 100%)'),
        transition: 'box-shadow 0.2s',
        boxShadow: hovered ? '0 0 0 2px #7002FF' : 'none',
        ...style,
      }}
    >
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 55%)',
      }} />
      {hovered && (
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(255,255,255,0.07)' }} />
      )}
      <span style={{
        position: 'absolute', bottom: 8, left: 10,
        fontFamily: mono, fontSize: 8, fontWeight: 600,
        letterSpacing: '0.08em', textTransform: 'uppercase',
        color: 'rgba(255,255,255,0.75)',
      }}>
        [{item.label ?? item.title}]
      </span>
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
        subtitle="Reflexiones sobre diseño, producto e IA"
        tabIndex={1}
        onNavigate={onNavigate}
      >
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {previewArticles.map(a => (
            <ArticleRow key={a.slug} article={a} />
          ))}
        </div>
      </Section>

      {/* Portfolio — 3 cards, no tab destination */}
      <Section
        title="Portfolio"
        subtitle="Proyectos de diseño de producto y sistemas"
      >
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
          {previewProjects.map(p => (
            <PortfolioCard key={p.title} project={p} />
          ))}
        </div>
      </Section>

      {/* Lab — featured + 2 stacked */}
      <Section
        title="Lab"
        subtitle="Experimentos, prototipos y cosas raras"
        tabIndex={2}
        onNavigate={onNavigate}
      >
        {previewLab.length > 0 ? (
          <div style={{ display: 'flex', gap: 12, height: 240 }}>
            <LabThumb
              item={previewLab[0]}
              onNavigate={onNavigate}
              style={{ flex: 2, height: '100%' }}
            />
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 12 }}>
              {previewLab.slice(1, 3).map(e => (
                <LabThumb
                  key={e.slug ?? e.title}
                  item={e}
                  onNavigate={onNavigate}
                  style={{ flex: 1 }}
                />
              ))}
            </div>
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
