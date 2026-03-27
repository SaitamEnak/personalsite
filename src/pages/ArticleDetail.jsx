import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import { getArticle } from '../data/articles'

const ff = 'Figtree, sans-serif'

function parseBody(text) {
  const lines = text.split('\n')
  const elements = []
  let i = 0

  while (i < lines.length) {
    const line = lines[i]

    if (line.startsWith('## ')) {
      elements.push({ type: 'h2', text: line.slice(3) })
    } else if (line.trim() === '') {
      // skip
    } else {
      // Collect paragraph lines
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

export default function ArticleDetail() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const { dark } = useTheme()

  const article = getArticle(slug)

  const bg = dark ? '#0d0d0d' : '#B8B8B8'
  const cardBg = dark ? '#1a1a1a' : '#fff'
  const textPrimary = dark ? '#f0f0f0' : '#111111'
  const textSecondary = dark ? '#a8a8a8' : '#555555'
  const tagBg = dark ? 'rgba(255,255,255,0.1)' : '#e8e8e8'
  const tagColor = dark ? '#a8a8a8' : '#555555'
  const backColor = dark ? '#a8a8a8' : '#555555'
  const backHoverColor = dark ? '#f0f0f0' : '#111'

  if (!article) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: bg }}>
        <p style={{ fontFamily: ff, color: textSecondary }}>Artículo no encontrado.</p>
      </div>
    )
  }

  const body = parseBody(article.body)

  return (
    <div style={{ minHeight: '100vh', background: bg, padding: 16, transition: 'background 0.3s' }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>

        {/* Back button */}
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
            padding: '0 0 32px 0',
            fontFamily: ff,
            fontSize: 14,
            color: backColor,
            transition: 'color 0.2s',
          }}
          onMouseEnter={e => e.currentTarget.style.color = backHoverColor}
          onMouseLeave={e => e.currentTarget.style.color = backColor}
        >
          <ArrowLeft size={16} />
          Volver
        </button>

        {/* Header */}
        <div className="reveal" style={{ animationDelay: '0.08s', marginBottom: 40 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
            <span style={{ fontFamily: ff, fontSize: 11, fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', color: tagColor, background: tagBg, borderRadius: 6, padding: '3px 8px' }}>
              {article.tag}
            </span>
            <span style={{ fontFamily: ff, fontSize: 12, color: textSecondary }}>
              {article.date}
            </span>
            <span style={{ fontFamily: ff, fontSize: 12, color: textSecondary }}>
              · {article.readingTime} lectura
            </span>
          </div>

          <h1 style={{ fontFamily: ff, fontSize: 36, fontWeight: 700, letterSpacing: '-0.72px', lineHeight: 1.15, color: textPrimary, margin: 0, transition: 'color 0.3s' }}>
            {article.title}
          </h1>
        </div>

        {/* Cover image placeholder */}
        <div
          className="reveal"
          style={{
            animationDelay: '0.16s',
            height: 280,
            borderRadius: 16,
            background: dark
              ? 'linear-gradient(135deg, #1a1a1a 0%, #333 100%)'
              : 'linear-gradient(135deg, #d0d0d0 0%, #e8e8e8 100%)',
            marginBottom: 48,
            display: 'flex',
            alignItems: 'flex-end',
            padding: 24,
            transition: 'background 0.3s',
          }}
        >
          <span style={{ fontFamily: ff, fontSize: 11, fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: dark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.25)' }}>
            Cover image
          </span>
        </div>

        {/* Body */}
        <div className="reveal" style={{ animationDelay: '0.24s' }}>
          {body.map((el, i) => {
            if (el.type === 'h2') {
              return (
                <h2
                  key={i}
                  style={{
                    fontFamily: ff,
                    fontSize: 22,
                    fontWeight: 700,
                    letterSpacing: '-0.44px',
                    color: textPrimary,
                    margin: '40px 0 16px',
                    lineHeight: 1.25,
                    transition: 'color 0.3s',
                  }}
                >
                  {el.text}
                </h2>
              )
            }
            return (
              <p
                key={i}
                style={{
                  fontFamily: ff,
                  fontSize: 17,
                  lineHeight: 1.75,
                  color: textSecondary,
                  marginBottom: 24,
                  letterSpacing: '-0.17px',
                  transition: 'color 0.3s',
                }}
              >
                {el.text}
              </p>
            )
          })}
        </div>

      </div>
    </div>
  )
}
