import { useState, useMemo, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import { articles } from '../data/articles'

const ff = 'Figtree, sans-serif'
const THUMB_RATIO = '4 / 3' // aspect ratio compartido entre cards normales y featured

function useTokens() {
  const { dark } = useTheme()
  return {
    cardBg: dark ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.45)',
    textPrimary: dark ? '#e8e8e8' : '#111111',
    textMuted: dark ? '#9a9a9a' : '#5a5a5a',
    tagBg: dark ? 'rgba(255,255,255,0.1)' : '#e8e8e8',
    tagColor: dark ? '#a8a8a8' : '#555555',
    border: dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)',
  }
}

function Tag({ label }) {
  const { tagBg, tagColor } = useTokens()
  return (
    <span style={{ fontFamily: ff, fontSize: 10, fontWeight: 600, letterSpacing: '0.07em', textTransform: 'uppercase', color: tagColor, background: tagBg, borderRadius: 5, padding: '3px 7px', display: 'inline-block', alignSelf: 'flex-start', transition: 'background 0.3s, color 0.3s' }}>
      {label}
    </span>
  )
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 480)
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 480px)')
    const handler = e => setIsMobile(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])
  return isMobile
}

function FeaturedCard({ article, index }) {
  const { cardBg, textPrimary, textMuted, border } = useTokens()
  const [hovered, setHovered] = useState(false)
  const navigate = useNavigate()
  const isMobile = useIsMobile()

  return (
    <div
      className="reveal articles-featured"
      style={{
        animationDelay: `${index * 0.12}s`,
        background: cardBg,
        borderRadius: 14,
        overflow: 'hidden',
        cursor: 'pointer',
        border: `1px solid ${border}`,
        transition: 'box-shadow 0.2s ease, background 0.3s ease',
        boxShadow: hovered ? '0 0 0 2px #7002FF' : 'none',
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => navigate(`/articles/${article.slug}`)}
      role="button"
      tabIndex={0}
    >
      {/* Thumbnail con mismo aspect ratio */}
      <div style={{ position: 'relative', background: article.cover || 'linear-gradient(135deg, #1a1a1a 0%, #3a3a3a 100%)', aspectRatio: THUMB_RATIO, flexShrink: 0, width: isMobile ? '100%' : '45%', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(255,255,255,0.18) 0%, transparent 55%)', opacity: hovered ? 1 : 0, transition: 'opacity 0.35s ease', pointerEvents: 'none' }} />
      </div>

      {/* Content */}
      <div style={{ padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: 12, justifyContent: 'center' }}>
        <Tag label={article.tag} />
        <p style={{ fontFamily: ff, fontSize: 22, fontWeight: 600, letterSpacing: '-0.5px', lineHeight: 1.3, color: textPrimary, transition: 'color 0.3s', margin: 0 }}>
          {article.title}
        </p>
        <p style={{ fontFamily: ff, fontSize: 11, color: textMuted, transition: 'color 0.3s', margin: 0 }}>
          {article.date} · {article.readingTime}
        </p>
      </div>
    </div>
  )
}

function ArticleCard({ article, index }) {
  const { cardBg, textPrimary, textMuted, border } = useTokens()
  const [hovered, setHovered] = useState(false)
  const navigate = useNavigate()

  return (
    <div
      className="reveal"
      style={{
        animationDelay: `${index * 0.12}s`,
        background: cardBg,
        borderRadius: 14,
        overflow: 'hidden',
        cursor: 'pointer',
        border: `1px solid ${border}`,
        transition: 'box-shadow 0.2s ease, background 0.3s ease',
        boxShadow: hovered ? '0 0 0 2px #7002FF' : 'none',
        display: 'flex',
        flexDirection: 'column',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => navigate(`/articles/${article.slug}`)}
      role="button"
      tabIndex={0}
    >
      {/* Thumbnail con mismo aspect ratio */}
      <div style={{ position: 'relative', background: article.cover || 'linear-gradient(135deg, #1a1a1a 0%, #3a3a3a 100%)', aspectRatio: THUMB_RATIO, width: '100%', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(255,255,255,0.18) 0%, transparent 55%)', opacity: hovered ? 1 : 0, transition: 'opacity 0.35s ease', pointerEvents: 'none' }} />
      </div>

      {/* Content */}
      <div style={{ padding: '16px 18px 18px', display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
        <Tag label={article.tag} />
        <p style={{ fontFamily: ff, fontSize: 16, fontWeight: 500, letterSpacing: '-0.25px', lineHeight: 1.4, color: textPrimary, transition: 'color 0.3s', margin: 0 }}>
          {article.title}
        </p>
        <p style={{ fontFamily: ff, fontSize: 11, color: textMuted, transition: 'color 0.3s', margin: 0, marginTop: 'auto' }}>
          {article.date} · {article.readingTime}
        </p>
      </div>
    </div>
  )
}

function FilterBar({ tags, active, onChange }) {
  const { dark } = useTheme()
  const { tagBg, tagColor } = useTokens()

  return (
    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 16 }}>
      {['Todos', ...tags].map(tag => {
        const isActive = tag === active
        return (
          <button
            key={tag}
            onClick={() => onChange(tag)}
            style={{
              fontFamily: ff,
              fontSize: 11,
              fontWeight: isActive ? 600 : 500,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              color: isActive ? (dark ? '#e8e8e8' : '#111111') : tagColor,
              background: isActive ? (dark ? 'rgba(255,255,255,0.18)' : 'rgba(0,0,0,0.14)') : tagBg,
              border: 'none',
              borderRadius: 6,
              padding: '5px 10px',
              lineHeight: 1,
              cursor: 'pointer',
              transition: 'background 0.2s, color 0.2s',
            }}
          >
            {tag}
          </button>
        )
      })}
    </div>
  )
}

export default function Articles() {
  const [activeTag, setActiveTag] = useState('Todos')

  const tags = useMemo(() => [...new Set(articles.map(a => a.tag))], [])

  const filtered = useMemo(() =>
    activeTag === 'Todos' ? articles : articles.filter(a => a.tag === activeTag),
    [activeTag]
  )

  const [featured, ...rest] = filtered

  return (
    <div style={{ maxWidth: 860, margin: '0 auto' }}>
      <FilterBar tags={tags} active={activeTag} onChange={setActiveTag} />
      <div className="articles-grid" style={{ display: 'grid', gap: 12 }}>
        {featured && <FeaturedCard article={featured} index={0} />}
        {rest.map((a, i) => (
          <ArticleCard key={a.slug} article={a} index={i + 1} />
        ))}
      </div>
    </div>
  )
}
