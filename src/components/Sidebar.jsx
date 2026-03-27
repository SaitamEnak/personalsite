import { ArrowUpRight, Sun, Moon } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

const links = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/mcanepadcv' },
  { label: 'Dribbble', href: 'https://dribbble.com/Kanematias' },
  { label: 'Behance', href: 'https://www.behance.net/MatiasCanepa' },
  { label: 'Email', href: 'mailto:matiascanepadcv@gmail.com' },
]

const ff = 'Figtree, sans-serif'

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
              src="/profile.jpg"
              alt="Matias Cánepa"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              onError={(e) => { e.target.style.display = 'none' }}
            />
          </div>
          <ThemeSwitch />
        </div>

        {/* Name & Title */}
        <div className="reveal" style={{ animationDelay: '0.15s', display: 'flex', flexDirection: 'column', lineHeight: 'normal' }}>
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
