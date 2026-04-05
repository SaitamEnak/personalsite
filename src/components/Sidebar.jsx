import { useState } from 'react'
import { createPortal } from 'react-dom'
import { Sun, Moon, PanelLeftClose, PanelLeft } from 'lucide-react'
import { FaLinkedinIn, FaDribbble, FaBehance, FaEnvelope } from 'react-icons/fa'
import { useTheme } from '../context/ThemeContext'

const TABS = ['Home', 'Articles', 'Portfolio', 'Lab']

const ff = 'Figtree, sans-serif'

const socialLinks = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/mcanepadcv', Icon: FaLinkedinIn },
  { label: 'Dribbble', href: 'https://dribbble.com/Kanematias', Icon: FaDribbble },
  { label: 'Behance', href: 'https://www.behance.net/MatiasCanepa', Icon: FaBehance },
  { label: 'Email', href: 'mailto:matiascanepadcv@gmail.com', Icon: FaEnvelope },
]

function Polaroid({ visible }) {
  return createPortal(
    <>
      <div
        style={{
          position: 'fixed',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 100,
          opacity: visible ? 1 : 0,
          background: 'rgba(0,0,0,0.45)',
          transition: 'opacity 0.4s ease',
        }}
      />
      <div
        style={{
          position: 'fixed',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none',
          zIndex: 102,
        }}
      >
        <div
          style={{
            translate: visible ? '0 0' : '0 110vh',
            rotate: visible ? '-2deg' : '18deg',
            opacity: visible ? 1 : 0,
            transition: 'translate 0.5s cubic-bezier(0.34, 1.4, 0.64, 1), rotate 0.5s cubic-bezier(0.34, 1.4, 0.64, 1), opacity 0.3s ease',
            background: '#fff',
            padding: '12px 12px 40px',
            borderRadius: 4,
            boxShadow: '0 24px 64px rgba(0,0,0,0.28), 0 4px 16px rgba(0,0,0,0.12)',
            width: 320,
          }}
        >
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
        background: dark ? '#3D3545' : '#777',
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
          left: dark ? 27 : 3,
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

export default function Sidebar({ active, setActive, open, setOpen }) {
  const { dark } = useTheme()
  const [polaroidVisible, setPolaroidVisible] = useState(false)

  const bg = dark ? '#242027' : '#F8F9FF'
  const textPrimary = dark ? '#f0f0f0' : '#000'
  const textSecondary = dark ? '#a8a8a8' : '#606060'
  const divider = dark ? 'rgba(255,255,255,0.12)' : '#d9d9d9'
  const hoverBg = dark ? 'rgba(255,255,255,0.06)' : '#ebebeb'
  const hoverColor = dark ? '#fff' : '#000'
  const activeBg = dark ? 'rgba(255,255,255,0.08)' : '#e4e4f0'

  return (
    <>
      {/* Floating open button when sidebar is hidden */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          aria-label="Open sidebar"
          style={{
            position: 'fixed',
            top: 16,
            left: 16,
            zIndex: 200,
            width: 40,
            height: 40,
            borderRadius: 10,
            border: 'none',
            background: bg,
            color: textSecondary,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: dark ? '0 2px 12px rgba(0,0,0,0.4)' : '0 2px 12px rgba(0,0,0,0.12)',
            transition: 'background 0.3s',
          }}
        >
          <PanelLeft size={18} />
        </button>
      )}

    <aside
      className="lg:sticky lg:top-[16px] lg:shrink-0 rounded-2xl overflow-hidden w-full lg:h-[calc(100vh-32px)]"
      style={{
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        gap: '32px',
        background: bg,
        transition: 'background 0.3s ease, width 0.3s ease, min-width 0.3s ease, opacity 0.3s ease, padding 0.3s ease',
        zIndex: 101,
        width: open ? 400 : 0,
        minWidth: open ? 400 : 0,
        opacity: open ? 1 : 0,
        padding: open ? '24px' : '0',
        pointerEvents: open ? 'auto' : 'none',
      }}
    >
      {/* Top: Nav */}
      <div className="reveal" style={{ animationDelay: '0.05s', display: 'flex', flexDirection: 'column' }}>
        {TABS.map((tab) => {
          const i = TABS.indexOf(tab)
          const isActive = active === i
          return (
            <button
              key={tab}
              onClick={() => setActive(i)}
              style={{
                display: 'flex',
                alignItems: 'center',
                paddingTop: 14,
                paddingBottom: 14,
                paddingLeft: 12,
                paddingRight: 12,
                marginLeft: -12,
                marginRight: -12,
                borderRadius: 8,
                border: 'none',
                background: isActive ? activeBg : 'transparent',
                fontFamily: ff,
                fontWeight: isActive ? 600 : 400,
                fontSize: 40,
                letterSpacing: '-0.8px',
                color: isActive ? textPrimary : textSecondary,
                transition: 'background 0.15s, color 0.15s',
                textAlign: 'left',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = hoverBg
                  e.currentTarget.style.color = hoverColor
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = 'transparent'
                  e.currentTarget.style.color = textSecondary
                }
              }}
            >
              {tab}
            </button>
          )
        })}
      </div>

      {/* Bottom: Social + Profile */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

        {/* Social icons */}
        <div className="reveal" style={{ animationDelay: '0.15s', display: 'flex', justifyContent: 'space-between' }}>
          {socialLinks.map(({ label, href, Icon }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('mailto') ? undefined : '_blank'}
              rel="noopener noreferrer"
              aria-label={label}
              style={{
                flex: 1,
                height: 44,
                borderRadius: 8,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: textSecondary,
                transition: 'background 0.15s, color 0.15s',
                textDecoration: 'none',
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
              <Icon size={20} />
            </a>
          ))}
        </div>

        <div style={{ height: 1, background: divider, transition: 'background 0.3s ease' }} />

        {/* Profile */}
        <div className="reveal" style={{ animationDelay: '0.20s', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div
              style={{
                width: 40,
                height: 40,
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
            <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 'normal' }}>
              <span style={{ fontFamily: ff, fontWeight: 500, fontSize: 16, letterSpacing: '-0.32px', color: textPrimary, transition: 'color 0.3s ease' }}>
                Matias Cánepa
              </span>
              <span style={{ fontFamily: ff, fontSize: 12, color: textSecondary, transition: 'color 0.3s ease' }}>
                Currently at{' '}
                <span
                  onMouseEnter={() => setPolaroidVisible(true)}
                  onMouseLeave={() => setPolaroidVisible(false)}
                  style={{ fontWeight: 600, color: textPrimary, borderBottom: `1px dashed ${textSecondary}`, cursor: 'default', transition: 'color 0.3s ease' }}
                >
                  Dinocloud
                </span>
              </span>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <ThemeSwitch />
            <button
              onClick={() => setOpen(false)}
              aria-label="Close sidebar"
              style={{
                width: 36,
                height: 28,
                borderRadius: 8,
                border: 'none',
                background: 'transparent',
                color: textSecondary,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
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
              <PanelLeftClose size={16} />
            </button>
          </div>
        </div>
        <Polaroid visible={polaroidVisible} />

      </div>
    </aside>
    </>
  )
}
