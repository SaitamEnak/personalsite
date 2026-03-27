import { ArrowUpRight } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import { articles } from '../data/articles'

const ff = 'Figtree, sans-serif'

function useTokens() {
  const { dark } = useTheme()
  return {
    cardBg: dark ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.45)',
    textPrimary: dark ? '#e8e8e8' : '#111111',   /* dark 13.5:1 | light 16:1 */
    textSecondary: dark ? '#a8a8a8' : '#555555', /* dark 6.5:1  | light 7.4:1 on white, 5.3:1 on card */
    textMuted: dark ? '#9a9a9a' : '#5a5a5a',     /* dark 5.7:1  | light 4.9:1 on card */
    tagBg: dark ? 'rgba(255,255,255,0.1)' : '#e8e8e8',
    tagColor: dark ? '#a8a8a8' : '#555555',
  }
}

function Card({ children, style, index = 0, onClick }) {
  const { cardBg } = useTokens()
  const [hovered, setHovered] = useState(false)
  return (
    <div
      className="reveal"
      style={{
        animationDelay: `${index * 0.12}s`,
        background: cardBg,
        borderRadius: 16,
        overflow: 'hidden',
        transition: 'transform 0.2s ease, background 0.3s ease',
        ...style,
        transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {children}
    </div>
  )
}

function Tag({ label }) {
  const { tagBg, tagColor } = useTokens()
  return (
    <span style={{ fontFamily: ff, fontSize: 11, fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', color: tagColor, background: tagBg, borderRadius: 6, padding: '3px 8px', transition: 'background 0.3s, color 0.3s', alignSelf: 'flex-start', display: 'inline-block' }}>
      {label}
    </span>
  )
}


export default function Articles() {
  const { textPrimary, textSecondary, textMuted } = useTokens()
  const navigate = useNavigate()
  const [featured, ...rest] = articles

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 760, margin: '0 auto' }}>

      {/* Featured */}
      <Card index={0} style={{ padding: 28 }} onClick={() => navigate(`/articles/${featured.slug}`)}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <Tag label={featured.tag} />
            <ArrowUpRight size={16} style={{ color: textMuted, flexShrink: 0 }} />
          </div>
          <div style={{ borderRadius: 10, background: 'linear-gradient(135deg, #1a1a1a 0%, #3a3a3a 100%)', height: 160, display: 'flex', alignItems: 'flex-end', padding: 20 }}>
            <span style={{ fontFamily: ff, fontSize: 11, fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.65)' }}>Artículo destacado</span>
          </div>
          <div>
            <p style={{ fontFamily: ff, fontSize: 20, fontWeight: 700, letterSpacing: '-0.4px', color: textPrimary, marginBottom: 4, transition: 'color 0.3s' }}>{featured.title}</p>
            <p style={{ fontFamily: ff, fontSize: 13, color: textMuted, transition: 'color 0.3s' }}>{featured.date}</p>
          </div>
        </div>
      </Card>

      {/* Rest */}
      {rest.map((a, i) => (
        <Card key={a.title} index={i + 1} style={{ padding: 22 }} onClick={() => navigate(`/articles/${a.slug}`)}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Tag label={a.tag} />
              <ArrowUpRight size={16} style={{ color: textMuted, flexShrink: 0 }} />
            </div>
            <p style={{ fontFamily: ff, fontSize: 15, fontWeight: 600, letterSpacing: '-0.3px', color: textPrimary, lineHeight: 1.35, transition: 'color 0.3s' }}>{a.title}</p>
            <p style={{ fontFamily: ff, fontSize: 12, color: textMuted, letterSpacing: '0.02em', transition: 'color 0.3s' }}>{a.date}</p>
          </div>
        </Card>
      ))}
    </div>
  )
}
