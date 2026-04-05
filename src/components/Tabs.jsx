import { useState, useRef, useEffect } from 'react'
import { useTheme } from '../context/ThemeContext'

const ff = 'Figtree, sans-serif'
const TABS = ['Articles', 'Portfolio', 'Lab', 'Timeline']

export default function Tabs({ children }) {
  const { dark } = useTheme()
  const [active, setActive] = useState(0)
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 })
  const tabRefs = useRef([])

  useEffect(() => {
    const el = tabRefs.current[active]
    if (el) {
      setIndicatorStyle({ left: el.offsetLeft, width: el.offsetWidth })
    }
  }, [active])

  const containerBg = dark ? '#242027' : '#aaaaaa'
  const containerBorder = 'transparent'
  const indicatorBg = dark ? 'rgba(255,255,255,0.32)' : 'rgba(255,255,255,0.6)'
  const textColor = dark ? '#dadada' : '#1a1a1a'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        marginBottom: 16,
        position: 'sticky',
        top: 0,
        zIndex: 10,
        paddingTop: 8,
        paddingBottom: 8,
      }}>
        <div
          style={{
            position: 'relative',
            display: 'inline-flex',
            alignItems: 'center',
            background: containerBg,
            border: `1px solid ${containerBorder}`,
            borderRadius: 10,
            padding: 4,
            transition: 'background 0.3s, border-color 0.3s',
          }}
        >
          {/* Sliding indicator */}
          <span
            style={{
              position: 'absolute',
              top: 4,
              left: indicatorStyle.left,
              width: indicatorStyle.width,
              height: 'calc(100% - 8px)',
              borderRadius: 8,
              background: indicatorBg,
              transition: 'left 0.25s cubic-bezier(0.4, 0, 0.2, 1), width 0.25s cubic-bezier(0.4, 0, 0.2, 1), background 0.3s',
              pointerEvents: 'none',
              zIndex: 0,
            }}
          />

          {TABS.map((tab, i) => (
            <button
              key={tab}
              ref={el => tabRefs.current[i] = el}
              onClick={() => setActive(i)}
              style={{
                fontFamily: ff,
                fontSize: 16,
                fontWeight: active === i ? 600 : 400,
                letterSpacing: '-0.24px',
                color: textColor,
                background: 'none',
                border: 'none',
                borderRadius: 8,
                padding: '10px 20px',
                whiteSpace: 'nowrap',
                transition: 'color 0.2s, font-weight 0.2s',
                lineHeight: 'normal',
                position: 'relative',
                zIndex: 1,
              }}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div key={active} className="tab-enter" style={{ flex: 1 }}>
        {children[active]}
      </div>
    </div>
  )
}
