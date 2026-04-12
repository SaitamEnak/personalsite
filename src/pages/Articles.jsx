import { useState, useMemo, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import { articles as fallbackArticles } from '../data/articles'
import { fetchCollection } from '../lib/cms'
import SectionHeader from '../components/SectionHeader'

const ff = 'Figtree, sans-serif'

function useTokens() {
  const { dark } = useTheme()
  return {
    cardBg: dark ? '#1E1724' : '#F0F0F8',
    textPrimary: dark ? '#e8e8e8' : '#111111',
    textMuted: dark ? '#9a9a9a' : '#5a5a5a',
    tagBg: dark ? 'rgba(255,255,255,0.1)' : '#e8e8e8',
    tagColor: dark ? '#a8a8a8' : '#555555',
    divider: dark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.07)',
  }
}

function GridCard({ article, index }) {
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
      {/* overlay gradient bottom */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.3) 50%, transparent 100%)',
        transition: 'opacity 0.2s',
        opacity: hovered ? 0.9 : 1,
      }} />

      {/* shine on hover */}
      {hovered && (
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(135deg, rgba(255,255,255,0.07) 0%, transparent 60%)',
        }} />
      )}

      {/* Text */}
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

function FilterBar({ tags, active, onChange }) {
  const { dark } = useTheme()
  const { tagBg, tagColor } = useTokens()
  const [hovered, setHovered] = useState(null)

  return (
    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 16 }}>
      {['Todos', ...tags].map(tag => {
        const isActive = tag === active
        const isHovered = hovered === tag && !isActive
        return (
          <button
            key={tag}
            onClick={() => onChange(tag)}
            onMouseEnter={() => setHovered(tag)}
            onMouseLeave={() => setHovered(null)}
            style={{
              fontFamily: ff,
              fontSize: 11,
              fontWeight: isActive ? 600 : 500,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              color: isActive ? (dark ? '#e8e8e8' : '#111111') : tagColor,
              background: isActive
                ? (dark ? 'rgba(255,255,255,0.18)' : 'rgba(0,0,0,0.14)')
                : isHovered
                  ? (dark ? 'rgba(255,255,255,0.14)' : 'rgba(0,0,0,0.10)')
                  : tagBg,
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

function SearchBar({ value, onChange }) {
  const { dark } = useTheme()
  const { textPrimary, textMuted } = useTokens()
  const [focused, setFocused] = useState(false)

  return (
    <div style={{
      position: 'relative',
      marginBottom: 12,
    }}>
      <input
        type="text"
        placeholder="Buscar artículos..."
        value={value}
        onChange={e => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          width: '100%',
          fontFamily: ff,
          fontSize: 14,
          color: textPrimary,
          background: dark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)',
          border: 'none',
          outline: focused ? '2px solid #7002FF' : '2px solid transparent',
          borderRadius: 10,
          padding: '10px 14px 10px 38px',
          boxSizing: 'border-box',
          transition: 'outline 0.2s, background 0.2s',
        }}
      />
      <svg
        width="14" height="14" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
        style={{
          position: 'absolute', left: 13, top: '50%', transform: 'translateY(-50%)',
          color: textMuted, pointerEvents: 'none',
        }}
      >
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
      {value && (
        <button
          onClick={() => onChange('')}
          style={{
            position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)',
            background: 'none', border: 'none', cursor: 'pointer',
            color: textMuted, padding: 2, lineHeight: 1,
            fontSize: 16,
          }}
        >
          ×
        </button>
      )}
    </div>
  )
}

export default function Articles() {
  const [activeTag, setActiveTag] = useState('Todos')
  const [query, setQuery] = useState('')
  const [articles, setArticles] = useState(fallbackArticles)

  useEffect(() => {
    fetchCollection('articles').then(data => {
      if (data.length > 0) setArticles(data)
    })
  }, [])

  const tags = useMemo(() => [...new Set(articles.map(a => a.tag))], [articles])

  const filtered = useMemo(() => {
    let result = activeTag === 'Todos' ? articles : articles.filter(a => a.tag === activeTag)
    if (query.trim()) {
      const q = query.toLowerCase()
      result = result.filter(a => a.title.toLowerCase().includes(q))
    }
    return result
  }, [activeTag, query, articles])

  return (
    <div style={{ maxWidth: 760, margin: '0 auto' }}>
      <SectionHeader title="Articles" desc="Notas sobre diseño, proceso y criterio." />
      <SearchBar value={query} onChange={setQuery} />
      <FilterBar tags={tags} active={activeTag} onChange={setActiveTag} />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
        {filtered.length > 0 ? filtered.map((a, i) => (
          <GridCard key={a.slug} article={a} index={i} />
        )) : (
          <p style={{ fontFamily: ff, fontSize: 13, color: 'rgba(128,128,128,0.6)', textAlign: 'center', padding: '32px 0', margin: 0 }}>
            No hay artículos que coincidan.
          </p>
        )}
      </div>
    </div>
  )
}
