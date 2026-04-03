import { ArrowUpRight } from 'lucide-react'
import { useState } from 'react'
import { useTheme } from '../context/ThemeContext'

const ff = 'Figtree, sans-serif'

function useTokens() {
  const { dark } = useTheme()
  return {
    dark,
    cardBg: dark ? '#1E1724' : '#F8F9FF',
    textPrimary: dark ? '#e8e8e8' : '#0a0010',
    textSecondary: dark ? '#666' : '#888',
    textMuted: dark ? '#444' : '#bbb',
    tagBg: dark ? 'rgba(255,255,255,0.08)' : '#f2f2f2',
    tagColor: dark ? '#888' : '#888',
  }
}

function Card({ children, style, className, onClick }) {
  const { cardBg } = useTokens()
  const [hovered, setHovered] = useState(false)
  return (
    <div
      className={className}
      style={{
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
    >
      {children}
    </div>
  )
}

function Tag({ label }) {
  const { tagBg, tagColor } = useTokens()
  return (
    <span
      style={{
        fontFamily: ff,
        fontSize: 11,
        fontWeight: 500,
        letterSpacing: '0.06em',
        textTransform: 'uppercase',
        color: tagColor,
        background: tagBg,
        borderRadius: 6,
        padding: '3px 8px',
        transition: 'background 0.3s, color 0.3s',
      }}
    >
      {label}
    </span>
  )
}

function Arrow() {
  const { textMuted } = useTokens()
  return (
    <ArrowUpRight size={16} style={{ color: textMuted, flexShrink: 0, marginTop: 2 }} />
  )
}

// ── Cards ─────────────────────────────────────────────────────────────────────

function FeaturedProject() {
  const { textPrimary, textSecondary } = useTokens()
  return (
    <Card className="md:col-span-2 md:row-span-2" style={{ padding: 28 }}>
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Tag label="Proyecto destacado" />
          <Arrow />
        </div>

        <div
          style={{
            flex: 1,
            borderRadius: 10,
            background: 'linear-gradient(135deg, #110022 0%, #3a1060 100%)',
            minHeight: 160,
            display: 'flex',
            alignItems: 'flex-end',
            padding: 20,
          }}
        >
          <span style={{ fontFamily: ff, fontSize: 11, fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)' }}>
            Vista previa
          </span>
        </div>

        <div>
          <p style={{ fontFamily: ff, fontSize: 20, fontWeight: 700, letterSpacing: '-0.4px', color: textPrimary, marginBottom: 6, transition: 'color 0.3s' }}>
            Sistema de diseño para fintech
          </p>
          <p style={{ fontFamily: ff, fontSize: 14, color: textSecondary, lineHeight: 1.5, transition: 'color 0.3s' }}>
            Construido desde cero: tokens, componentes y documentación para un equipo de 12 diseñadores.
          </p>
        </div>
      </div>
    </Card>
  )
}

function BlogPost({ title, date, tag }) {
  const { textPrimary, textMuted } = useTokens()
  return (
    <Card style={{ padding: 22 }}>
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: 12 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Tag label={tag} />
          <Arrow />
        </div>
        <p style={{ fontFamily: ff, fontSize: 16, fontWeight: 600, letterSpacing: '-0.3px', color: textPrimary, lineHeight: 1.35, flex: 1, transition: 'color 0.3s' }}>
          {title}
        </p>
        <p style={{ fontFamily: ff, fontSize: 12, color: textMuted, letterSpacing: '0.02em', transition: 'color 0.3s' }}>
          {date}
        </p>
      </div>
    </Card>
  )
}

function CollectionCard() {
  const { textPrimary } = useTokens()
  const items = [0, 1, 2, 3]
  return (
    <Card style={{ padding: 22 }}>
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: 14 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Tag label="Colección" />
          <Arrow />
        </div>
        <p style={{ fontFamily: ff, fontSize: 15, fontWeight: 600, letterSpacing: '-0.3px', color: textPrimary, transition: 'color 0.3s' }}>
          Recursos de tipografía
        </p>
        <div style={{ display: 'flex', gap: 6, marginTop: 'auto' }}>
          {items.map((_, i) => (
            <div key={i} style={{ flex: 1, height: 48, borderRadius: 8, background: `hsl(${260 + i * 15}, ${30 + i * 8}%, ${88 - i * 4}%)` }} />
          ))}
        </div>
      </div>
    </Card>
  )
}

function NowCard() {
  return (
    <Card style={{ padding: 22, background: '#111' }}>
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: 10 }}>
        <Tag label="Ahora" />
        <p style={{ fontFamily: ff, fontSize: 14, color: 'rgba(255,255,255,0.55)', lineHeight: 1.6, flex: 1 }}>
          Explorando la intersección entre diseño de sistemas y agentes de IA. Escribiendo sobre el proceso.
        </p>
        <p style={{ fontFamily: ff, fontSize: 11, color: 'rgba(255,255,255,0.25)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
          Marzo 2025
        </p>
      </div>
    </Card>
  )
}

function WideProject({ title, desc, tag }) {
  const { textPrimary, textSecondary } = useTokens()
  return (
    <Card className="md:col-span-2" style={{ padding: 22 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 20, height: '100%' }}>
        <div style={{ width: 64, height: 64, borderRadius: 12, background: 'linear-gradient(135deg, #d4b8f0 0%, #e8d5ff 100%)', flexShrink: 0 }} />
        <div style={{ flex: 1 }}>
          <p style={{ fontFamily: ff, fontSize: 15, fontWeight: 600, letterSpacing: '-0.3px', color: textPrimary, marginBottom: 4, transition: 'color 0.3s' }}>
            {title}
          </p>
          <p style={{ fontFamily: ff, fontSize: 13, color: textSecondary, lineHeight: 1.4, transition: 'color 0.3s' }}>
            {desc}
          </p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8, flexShrink: 0 }}>
          <Tag label={tag} />
          <Arrow />
        </div>
      </div>
    </Card>
  )
}

// ── Grid ──────────────────────────────────────────────────────────────────────

export default function BentoGrid() {
  return (
    <div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
      style={{ gridAutoRows: '180px', gap: 12 }}
    >
      <FeaturedProject />
      <BlogPost tag="Blog" title="Diseñar con IA no es lo mismo que diseñar para IA" date="12 mar 2025" />
      <NowCard />
      <BlogPost tag="Blog" title="Cómo documentar decisiones de diseño sin morir en el intento" date="28 feb 2025" />
      <CollectionCard />
      <WideProject tag="Proyecto" title="Rediseño de onboarding — App de pagos" desc="Reducción del 40% en drop-off durante el flujo de activación." />
      <BlogPost tag="Blog" title="El problema con los design tokens genéricos" date="10 feb 2025" />
    </div>
  )
}
