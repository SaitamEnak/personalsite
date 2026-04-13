import { useState, useRef, useEffect } from 'react'
import { BookOpen, User } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

const TABS = [
  { label: 'Articles', Icon: BookOpen },
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
      <div key={active} className="tab-enter" style={{ flex: 1 }}>
        {children[active]}
      </div>


    </div>
  )
}
