import { useState, useRef, useEffect } from 'react'
import { House, BookOpen, FlaskConical, User } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

const TABS = [
  { label: 'Home', Icon: House },
  { label: 'Articles', Icon: BookOpen },
  { label: 'Lab', Icon: FlaskConical },
  { label: 'About', Icon: User },
]

export default function Tabs({ children, active: propActive, onTabChange }) {
  const { dark } = useTheme()
  const [internalActive, setInternalActive] = useState(0)
  const active = propActive ?? internalActive
  const setActive = onTabChange ?? setInternalActive
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 })
  const tabRefs = useRef([])
  const [tooltip, setTooltip] = useState(null)

  useEffect(() => {
    const el = tabRefs.current[active]
    if (el) {
      setIndicatorStyle({ left: el.offsetLeft, width: el.offsetWidth })
    }
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [active])

  const containerBg = dark ? '#242027' : '#aaaaaa'
  const indicatorBg = dark ? 'rgba(255,255,255,0.32)' : 'rgba(255,255,255,0.6)'
  const iconColor = (isActive) => {
    if (isActive) return dark ? '#fff' : '#111'
    return dark ? '#888' : '#666'
  }
  const tooltipBg = dark ? '#3a3540' : '#222'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100%' }}>

      {/* Content */}
      <div key={active} className="tab-enter pb-28" style={{ flex: 1 }}>
        {children[active]}
      </div>

      {/* Pill tab bar — fixed bottom, centered. On lg+: offset for sidebar */}
      {/* left = body padding (16) + sidebar (400) + gap (16) = 432px on lg+ */}
      <div className="flex left-0 right-0 lg:left-[432px] lg:right-[16px]" style={{
        justifyContent: 'center',
        position: 'fixed',
        bottom: 'calc(24px + env(safe-area-inset-bottom))',
        zIndex: 50,
        pointerEvents: 'none',
      }}>
        <div style={{
          pointerEvents: 'auto',
          position: 'relative',
          display: 'inline-flex',
          alignItems: 'center',
          background: containerBg,
          borderRadius: 18,
          padding: 8,
          transition: 'background 0.3s',
        }}>
          <span style={{
            position: 'absolute',
            top: 8,
            left: indicatorStyle.left,
            width: indicatorStyle.width,
            height: 'calc(100% - 16px)',
            borderRadius: 10,
            background: indicatorBg,
            transition: 'left 0.25s cubic-bezier(0.4, 0, 0.2, 1), width 0.25s cubic-bezier(0.4, 0, 0.2, 1), background 0.3s',
            pointerEvents: 'none',
            zIndex: 0,
          }} />

          {TABS.map(({ label, Icon }, i) => (
            <div
              key={label}
              ref={el => tabRefs.current[i] = el}
              style={{ position: 'relative' }}
            >
              <button
                onClick={() => setActive(i)}
                onMouseEnter={() => setTooltip(i)}
                onMouseLeave={() => setTooltip(null)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 52,
                  height: 44,
                  color: iconColor(active === i),
                  background: 'none',
                  border: 'none',
                  borderRadius: 8,
                  cursor: 'pointer',
                  position: 'relative',
                  zIndex: 1,
                  transition: 'color 0.2s',
                }}
              >
                <Icon size={20} strokeWidth={active === i ? 2.8 : 2} />
              </button>

              {tooltip === i && (
                <span style={{
                  position: 'absolute',
                  bottom: 'calc(100% + 6px)',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  background: tooltipBg,
                  color: '#fff',
                  fontSize: 12,
                  fontFamily: 'Figtree, sans-serif',
                  fontWeight: 500,
                  padding: '4px 8px',
                  borderRadius: 6,
                  whiteSpace: 'nowrap',
                  pointerEvents: 'none',
                  zIndex: 100,
                }}>
                  {label}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>


    </div>
  )
}
