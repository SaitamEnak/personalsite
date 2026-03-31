import { useState } from 'react'
import { createPortal } from 'react-dom'
import { ArrowUpRight, Sun, Moon } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

const links = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/mcanepadcv' },
  { label: 'Dribbble', href: 'https://dribbble.com/Kanematias' },
  { label: 'Behance', href: 'https://www.behance.net/MatiasCanepa' },
  { label: 'Email', href: 'mailto:matiascanepadcv@gmail.com' },
]

const ff = 'Figtree, sans-serif'

function Polaroid({ visible }) {
  return createPortal(
    <>
      {/* Overlay — behind sidebar */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 100,
          opacity: visible ? 1 : 0,
          background: 'rgba(0,0,0,0.45)',
          transition: 'opacity 0.25s ease',
        }}
      />
      {/* Polaroid — above everything */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none',
          zIndex: 102,
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.25s ease',
        }}
      >
        <div
          style={{
            background: '#fff',
            padding: '12px 12px 40px',
            borderRadius: 4,
            boxShadow: '0 24px 64px rgba(0,0,0,0.28), 0 4px 16px rgba(0,0,0,0.12)',
            transform: 'rotate(-2deg)',
            width: 320,
          }}
        >
          {/* Image area */}
          <div
            style={{
              width: '100%',
              aspectRatio: '1/1',
              background: 'linear-gradient(135deg, #0a1628 0%, #1a4080 60%, #2563c4 100%)',
              borderRadius: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span style={{ fontFamily: ff, fontSize: 22, fontWeight: 700, color: '#fff', letterSpacing: '-0.5px' }}>
              Dinocloud
            </span>
          </div>
          {/* Caption */}
          <p style={{ fontFamily: ff, fontSize: 12, color: '#888', textAlign: 'center', margin: '12px 0 0', letterSpacing: '0.02em' }}>
            dinocloud.com
          </p>
        </div>
      </div>
    </>,
    document.body
  )
}

function ThemeSwitch() {
  const { dark, toggle } = useTheme()
  const Icon = dark ? Moon : Sun
  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      style={{
        width: 52,
        height: 28,
        borderRadius: 999,
        border: 'none',
        background: dark ? '#222' : '#777',
        position: 'relative',
        flexShrink: 0,
        transition: 'background 0.3s ease',
        padding: 0,
      }}
    >
      <span
        style={{
          position: 'absolute',
          top: 3,
          left: dark ? 25 : 3,
          width: 22,
          height: 22,
          borderRadius: '50%',
          background: '#fff',
          transition: 'left 0.25s ease',
        }}
      >
        <Icon
          size={13}
          style={{
            color: '#222',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />
      </span>
    </button>
  )
}

export default function Sidebar() {
  const { dark } = useTheme()
  const [polaroidVisible, setPolaroidVisible] = useState(false)

  const bg = dark ? '#2e2e2e' : '#fff'
  const textPrimary = dark ? '#f0f0f0' : '#000'
  const textSecondary = dark ? '#a8a8a8' : '#606060' /* dark: 4.7:1 on #2e2e2e ✓ | light: 5.7:1 on #fff ✓ */
  const divider = dark ? 'rgba(255,255,255,0.12)' : '#d9d9d9'
  const hoverBg = dark ? 'rgba(255,255,255,0.06)' : '#ebebeb'
  const hoverColor = dark ? '#fff' : '#000'

  return (
    <aside
      className="lg:sticky lg:top-[16px] lg:shrink-0 rounded-2xl overflow-hidden w-full lg:w-[400px] lg:h-[calc(100vh-32px)]"
      style={{
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        gap: '32px',
        background: bg,
        transition: 'background 0.3s ease',
        zIndex: 101,
      }}
    >
      {/* Top: Profile */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>

        {/* Avatar row + switch */}
        <div className="reveal" style={{ animationDelay: '0.05s', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div
            style={{
              width: 90,
              height: 90,
              borderRadius: '50%',
              background: dark ? '#333' : '#d9d9d9',
              overflow: 'hidden',
              flexShrink: 0,
            }}
          >
            <img
              src={`${import.meta.env.BASE_URL}avatar.png`}
              alt="Matias Cánepa"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              onError={(e) => { e.target.style.display = 'none' }}
            />
          </div>
          <ThemeSwitch />
        </div>

        {/* Name & Title */}
        <div className="reveal" style={{ animationDelay: '0.15s', display: 'flex', flexDirection: 'column', lineHeight: 'normal', paddingTop: 16 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 0 }}>
            <span
              style={{
                fontFamily: ff,
                fontWeight: 700,
                fontSize: 28,
                letterSpacing: '-0.56px',
                color: textPrimary,
                whiteSpace: 'nowrap',
                transition: 'color 0.3s ease',
              }}
            >
              Matias Cánepa
            </span>
            {/* Inline SVG arrow — overflow:visible lets it arc above the text */}
            <svg width="16" height="2" fill="none" style={{ overflow: 'visible', flexShrink: 0, opacity: 0.7, pointerEvents: 'none' }}>
              <path
                d="M -51,-19 C -45,-38 -3,-46 14,-22"
                stroke={textSecondary} strokeWidth="1.5" strokeLinecap="round"
              />
              <path
                d="M 14,-22 L 5,-23 M 14,-22 L 14,-31"
                stroke={textSecondary} strokeWidth="1.5" strokeLinecap="round"
              />
            </svg>
            <span style={{
              fontFamily: "'Caveat', cursive",
              fontSize: 20,
              fontWeight: 700,
              color: textSecondary,
              letterSpacing: '0.03em',
              lineHeight: 1,
              whiteSpace: 'nowrap',
              transform: 'rotate(-5deg)',
              display: 'inline-block',
              transition: 'color 0.3s ease',
              color: '#8B27FB',
            }}>
              AKA KANE
            </span>
          </div>
          <span
            style={{
              fontFamily: ff,
              fontWeight: 500,
              fontSize: 18,
              letterSpacing: '-0.36px',
              color: textPrimary,
              transition: 'color 0.3s ease',
            }}
          >
            Product Designer
          </span>
        </div>

        {/* Bio */}
        <p
          className="reveal"
          style={{
            animationDelay: '0.25s',
            fontFamily: ff,
            fontWeight: 400,
            fontSize: 15,
            letterSpacing: '-0.3px',
            lineHeight: 1.5,
            color: textSecondary,
            transition: 'color 0.3s ease',
          }}
        >
          Product Designer. Trabajo en la intersección entre sistemas, interfaces
          y comportamiento humano. Con interés creciente en cómo la IA transforma
          la práctica del diseño.
        </p>

        {/* Currently working at */}
        <p
          className="reveal"
          style={{
            animationDelay: '0.30s',
            fontFamily: ff,
            fontSize: 13,
            fontWeight: 400,
            color: textSecondary,
            transition: 'color 0.3s ease',
            margin: 0,
          }}
        >
          Currently working at{' '}
          <span
            onMouseEnter={() => setPolaroidVisible(true)}
            onMouseLeave={() => setPolaroidVisible(false)}
            style={{
              fontWeight: 600,
              color: textPrimary,
              borderBottom: `1px dashed ${textSecondary}`,
              cursor: 'default',
              transition: 'color 0.3s ease',
            }}
          >
            Dinocloud
          </span>
        </p>
        <Polaroid visible={polaroidVisible} />
      </div>

      {/* Bottom: Links */}
      <div className="reveal" style={{ animationDelay: '0.35s', display: 'flex', flexDirection: 'column' }}>
        {links.map((link) => (
          <div key={link.label}>
            <div style={{ height: 1, background: divider, width: '100%', transition: 'background 0.3s ease' }} />
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                paddingTop: 16,
                paddingBottom: 16,
                paddingLeft: 12,
                paddingRight: 12,
                marginLeft: -12,
                marginRight: -12,
                borderRadius: 8,
                textDecoration: 'none',
                color: textSecondary,
                transition: 'background 0.15s, color 0.15s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = hoverBg
                e.currentTarget.style.color = hoverColor
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent'
                e.currentTarget.style.color = textSecondary
              }}
            >
              <span
                style={{
                  flex: 1,
                  fontFamily: ff,
                  fontWeight: 400,
                  fontSize: 15,
                  letterSpacing: '-0.3px',
                  lineHeight: 1.4,
                  color: 'inherit',
                }}
              >
                {link.label}
              </span>
              <ArrowUpRight size={20} style={{ flexShrink: 0, color: 'inherit' }} />
            </a>
          </div>
        ))}
        <div style={{ height: 1, background: divider, width: '100%', transition: 'background 0.3s ease' }} />
      </div>
    </aside>
  )
}
