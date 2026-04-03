import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import { getArticle, articles as fallbackArticles } from '../data/articles'
import { fetchEntry, fetchCollection } from '../lib/cms'

const ff = 'Figtree, sans-serif'

function slugify(text) {
  return text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')
}

function parseBody(text) {
  const lines = text.split('\n')
  const elements = []
  let i = 0

  while (i < lines.length) {
    const line = lines[i]

    if (line.startsWith('## ')) {
      const heading = line.slice(3)
      elements.push({ type: 'h2', text: heading, id: slugify(heading) })
    } else if (line.trim() === '') {
      // skip
    } else {
      const paraLines = []
      while (i < lines.length && lines[i].trim() !== '' && !lines[i].startsWith('## ')) {
        paraLines.push(lines[i])
        i++
      }
      elements.push({ type: 'p', text: paraLines.join(' ') })
      continue
    }
    i++
  }

  return elements
}

function TableOfContents({ headings, activeId, textSecondary, textPrimary }) {
  const { dark } = useTheme()
  const borderColor = dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'

  return (
    <nav style={{ width: 180, flexShrink: 0 }}>
      <p style={{ fontFamily: ff, fontSize: 10, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: textSecondary, marginBottom: 12, transition: 'color 0.3s' }}>
        Contenido
      </p>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0, borderLeft: `1px solid ${borderColor}`, display: 'flex', flexDirection: 'column', gap: 2 }}>
        {headings.map(h => {
          const isActive = h.id === activeId
          return (
            <li key={h.id}>
              <a
                href={`#${h.id}`}
                onClick={e => {
                  e.preventDefault()
                  document.getElementById(h.id)?.scrollIntoView({ behavior: 'smooth' })
                }}
                style={{
                  fontFamily: ff,
                  fontSize: 12,
                  lineHeight: 1.5,
                  color: isActive ? (dark ? '#e8e8e8' : '#111') : textSecondary,
                  textDecoration: 'none',
                  display: 'block',
                  paddingLeft: 14,
                  paddingTop: 3,
                  paddingBottom: 3,
                  borderLeft: `2px solid ${isActive ? (dark ? '#9747FF' : '#7002FF') : 'transparent'}`,
                  marginLeft: -1,
                  transition: 'color 0.2s, border-color 0.2s',
                  fontWeight: isActive ? 500 : 400,
                }}
              >
                {h.text}
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default function ArticleDetail() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const { dark } = useTheme()
  const [activeId, setActiveId] = useState(null)
  const [article, setArticle] = useState(() => getArticle(slug))
  const [allArticles, setAllArticles] = useState(fallbackArticles)

  useEffect(() => {
    fetchEntry('articles', slug).then(data => { if (data) setArticle(data) })
    fetchCollection('articles').then(data => { if (data.length > 0) setAllArticles(data) })
  }, [slug])

  const bg = dark ? '#0d0d0d' : '#FAFAFA'
  const textPrimary = dark ? '#f0f0f0' : '#111111'
  const textSecondary = dark ? '#a8a8a8' : '#555555'
  const tagBg = dark ? 'rgba(255,255,255,0.1)' : '#e8e8e8'
  const tagColor = dark ? '#a8a8a8' : '#555555'
  const backColor = dark ? '#a8a8a8' : '#555555'
  const backHoverColor = dark ? '#f0f0f0' : '#111'


  const body = article ? parseBody(article.body) : []
  const headings = body.filter(el => el.type === 'h2')

  // Highlight active heading on scroll
  useEffect(() => {
    if (!headings.length) return
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActiveId(entry.target.id)
        })
      },
      { rootMargin: '-20% 0px -70% 0px' }
    )
    headings.forEach(h => {
      const el = document.getElementById(h.id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [slug])

  if (!article) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: bg, margin: -16 }}>
        <p style={{ fontFamily: ff, color: textSecondary }}>Artículo no encontrado.</p>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: bg, margin: -16, padding: '32px 24px', transition: 'background 0.3s ease' }}>

      {/* Back button */}
      <div style={{ maxWidth: 960, margin: '0 auto 24px' }}>
        <button
          className="reveal"
          onClick={() => navigate(-1)}
          style={{
            animationDelay: '0s',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            background: 'none',
            border: 'none',
            padding: 0,
            fontFamily: ff,
            fontSize: 14,
            color: backColor,
            transition: 'color 0.2s',
            cursor: 'pointer',
          }}
          onMouseEnter={e => e.currentTarget.style.color = backHoverColor}
          onMouseLeave={e => e.currentTarget.style.color = backColor}
        >
          <ArrowLeft size={16} />
          Volver
        </button>
      </div>

      {/* Main layout */}
      <div style={{ maxWidth: 960, margin: '0 auto', display: 'flex', gap: 60, alignItems: 'flex-start' }}>

        {/* TOC — hidden on narrow screens via class */}
        <div className="article-toc reveal" style={{ animationDelay: '0.12s', position: 'sticky', top: 32, alignSelf: 'flex-start' }}>
          <TableOfContents headings={headings} activeId={activeId} textSecondary={textSecondary} textPrimary={textPrimary} />
        </div>

        {/* Content */}
        <div style={{ flex: 1, minWidth: 0 }}>

          {/* Header */}
          <div className="reveal" style={{ animationDelay: '0.08s', marginBottom: 40 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
              <span style={{ fontFamily: ff, fontSize: 11, fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', color: tagColor, background: tagBg, borderRadius: 6, padding: '3px 8px' }}>
                {article.tag}
              </span>
              <span style={{ fontFamily: ff, fontSize: 12, color: textSecondary }}>{article.date}</span>
              <span style={{ fontFamily: ff, fontSize: 12, color: textSecondary }}>· {article.readingTime} lectura</span>
            </div>
            <h1 style={{ fontFamily: ff, fontSize: 36, fontWeight: 700, letterSpacing: '-0.72px', lineHeight: 1.15, color: textPrimary, margin: 0, transition: 'color 0.3s' }}>
              {article.title}
            </h1>
          </div>

          {/* Cover */}
          <div
            className="reveal"
            style={{
              animationDelay: '0.16s',
              aspectRatio: '4/3',
              borderRadius: 16,
              background: article.cover?.startsWith('http')
                ? `url(${article.cover}) center/cover no-repeat`
                : article.cover || (dark
                  ? 'linear-gradient(135deg, #1a1a1a 0%, #333 100%)'
                  : 'linear-gradient(135deg, #d0d0d0 0%, #e8e8e8 100%)'),
              marginBottom: 48,
              transition: 'background 0.3s',
            }}
          />

          {/* Body */}
          <div className="reveal" style={{ animationDelay: '0.24s' }}>
            {body.map((el, i) => {
              if (el.type === 'h2') {
                return (
                  <h2
                    key={i}
                    id={el.id}
                    style={{ fontFamily: ff, fontSize: 22, fontWeight: 700, letterSpacing: '-0.44px', color: textPrimary, margin: '40px 0 16px', lineHeight: 1.25, transition: 'color 0.3s', scrollMarginTop: 32 }}
                  >
                    {el.text}
                  </h2>
                )
              }
              return (
                <p
                  key={i}
                  style={{ fontFamily: ff, fontSize: 17, lineHeight: 1.75, color: textSecondary, marginBottom: 24, letterSpacing: '-0.17px', transition: 'color 0.3s' }}
                >
                  {el.text}
                </p>
              )
            })}
          </div>

        </div>
      </div>

      {/* More articles */}
      <MoreArticles articles={allArticles} currentSlug={slug} textPrimary={textPrimary} textSecondary={textSecondary} tagBg={tagBg} tagColor={tagColor} />

    </div>
  )
}

function MoreArticles({ articles, currentSlug, textPrimary, textSecondary, tagBg, tagColor }) {
  const navigate = useNavigate()
  const { dark } = useTheme()
  const others = articles.filter(a => a.slug !== currentSlug).slice(0, 3)
  const borderColor = dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.07)'
  const cardBg = dark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)'

  return (
    <div style={{ maxWidth: 960, margin: '80px auto 0', paddingTop: 48, borderTop: `1px solid ${borderColor}` }}>
      <p style={{ fontFamily: ff, fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: textSecondary, marginBottom: 24, transition: 'color 0.3s' }}>
        Más artículos
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
        {others.map((a, i) => (
          <MoreCard key={a.slug} article={a} index={i} navigate={navigate} textPrimary={textPrimary} textSecondary={textSecondary} tagBg={tagBg} tagColor={tagColor} cardBg={cardBg} borderColor={borderColor} />
        ))}
      </div>
    </div>
  )
}

function MoreCard({ article, index, navigate, textPrimary, textSecondary, tagBg, tagColor, cardBg, borderColor }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      onClick={() => navigate(`/articles/${article.slug}`)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      role="button"
      tabIndex={0}
      style={{
        borderRadius: 12,
        overflow: 'hidden',
        cursor: 'pointer',
        background: cardBg,
        border: `1px solid ${borderColor}`,
        transition: 'transform 0.2s ease',
        transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div style={{ background: article.cover?.startsWith('http') ? `url(${article.cover}) center/cover no-repeat` : (article.cover || 'linear-gradient(135deg, #1a1a1a 0%, #3a3a3a 100%)'), aspectRatio: '4/3', width: '100%' }} />
      <div style={{ padding: '14px 16px 16px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        <span style={{ fontFamily: ff, fontSize: 10, fontWeight: 600, letterSpacing: '0.07em', textTransform: 'uppercase', color: tagColor, background: tagBg, borderRadius: 5, padding: '3px 7px', display: 'inline-block', alignSelf: 'flex-start', transition: 'background 0.3s, color 0.3s' }}>
          {article.tag}
        </span>
        <p style={{ fontFamily: ff, fontSize: 14, fontWeight: 500, letterSpacing: '-0.2px', lineHeight: 1.4, color: textPrimary, margin: 0, transition: 'color 0.3s' }}>
          {article.title}
        </p>
        <p style={{ fontFamily: ff, fontSize: 11, color: textSecondary, margin: 0, transition: 'color 0.3s' }}>
          {article.date} · {article.readingTime}
        </p>
      </div>
    </div>
  )
}
