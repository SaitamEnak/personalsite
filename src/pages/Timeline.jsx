import { useState, useEffect, useCallback, useRef } from 'react'
import { createPortal } from 'react-dom'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

const ff = 'Figtree, sans-serif'

const years = [
  { year: '2026', entries: [{ title: '', desc: '', image: null, gradient: 'linear-gradient(160deg, #0a0f1a 0%, #0f2040 100%)' }] },
  { year: '2025', entries: [{ title: '', desc: '', image: null, gradient: 'linear-gradient(160deg, #0a1628 0%, #1a4080 100%)' }] },
  { year: '2024', entries: [{ title: '', desc: '', image: null, gradient: 'linear-gradient(160deg, #0f1923 0%, #1e3a5f 100%)' }] },
  { year: '2023', entries: [{ title: '', desc: '', image: null, gradient: 'linear-gradient(160deg, #0f0c29 0%, #302b63 100%)' }] },
  { year: '2022', entries: [{ title: '', desc: '', image: null, gradient: 'linear-gradient(160deg, #0f2027 0%, #2c5364 100%)' }] },
  { year: '2021', entries: [{ title: '', desc: '', image: null, gradient: 'linear-gradient(160deg, #1a0520 0%, #4a0050 100%)' }] },
  { year: '2020', entries: [{ title: '', desc: '', image: null, gradient: 'linear-gradient(160deg, #1a0533 0%, #4a0080 100%)' }] },
  { year: '2019', entries: [{ title: '', desc: '', image: null, gradient: 'linear-gradient(160deg, #1a0a2e 0%, #2d1060 100%)' }] },
  { year: '2018', entries: [{ title: '', desc: '', image: null, gradient: 'linear-gradient(160deg, #1a1a2e 0%, #16213e 100%)' }] },
  { year: '2017', entries: [{ title: '', desc: '', image: null, gradient: 'linear-gradient(160deg, #0f0c29 0%, #1e1060 100%)' }] },
  { year: '2016', entries: [{ title: '', desc: '', image: null, gradient: 'linear-gradient(160deg, #0d1f2d 0%, #00416a 100%)' }] },
  { year: '2015', entries: [{ title: '', desc: '', image: null, gradient: 'linear-gradient(160deg, #0a121a 0%, #12263d 100%)' }] },
  { year: '2014', entries: [{ title: '', desc: '', image: null, gradient: 'linear-gradient(160deg, #0a1a1a 0%, #123d3a 100%)' }] },
  { year: '2013', entries: [{ title: '', desc: '', image: null, gradient: 'linear-gradient(160deg, #0a1a0a 0%, #123d1a 100%)' }] },
  { year: '2012', entries: [{ title: '', desc: '', image: null, gradient: 'linear-gradient(160deg, #1a1a0a 0%, #3d3a12 100%)' }] },
  { year: '2011', entries: [{ title: '', desc: '', image: null, gradient: 'linear-gradient(160deg, #1a100a 0%, #3d2612 100%)' }] },
  { year: '2010', entries: [{ title: '', desc: '', image: null, gradient: 'linear-gradient(160deg, #1a0a0a 0%, #3d1212 100%)' }] },
]

const flat = years.flatMap(g => g.entries.map(e => ({ ...e, year: g.year })))

// ─── Card ────────────────────────────────────────────────────────────────────

function CardEntry({ entry, year, cardBg, cardBorder, textPrimary, textSecondary, dark, onClick }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={e => e.key === 'Enter' && onClick()}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        background: cardBg,
        border: `1px solid ${cardBorder}`,
        borderRadius: 14,
        overflow: 'hidden',
        cursor: 'pointer',
        boxShadow: hovered ? '0 0 0 2px #7002FF' : 'none',
        transition: 'background 0.3s, border-color 0.3s, box-shadow 0.2s ease',
      }}
    >
      {/* Image */}
      <div style={{ aspectRatio: '3/4', background: entry.gradient, position: 'relative', overflow: 'hidden' }}>
        {entry.image
          ? <img src={entry.image} alt={year} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          : <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontFamily: ff, fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.18)', letterSpacing: '0.1em', textTransform: 'uppercase', writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
                {year}
              </span>
            </div>
        }
        {/* Light overlay on hover */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'linear-gradient(135deg, rgba(255,255,255,0.14) 0%, transparent 55%)',
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.35s ease',
        }} />
      </div>

      {/* Text */}
      <div style={{ padding: '20px 22px', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 6 }}>
        {entry.title
          ? <span style={{ fontFamily: ff, fontSize: 15, fontWeight: 700, letterSpacing: '-0.3px', color: textPrimary, lineHeight: 1.3, transition: 'color 0.3s' }}>
              {entry.title}
            </span>
          : <span style={{ fontFamily: ff, fontSize: 13, color: textSecondary, fontStyle: 'italic' }}>Sin descripción aún</span>
        }
        {entry.desc && (
          <p style={{ fontFamily: ff, fontSize: 13, color: textSecondary, lineHeight: 1.6, margin: 0 }}>
            {entry.desc}
          </p>
        )}
      </div>
    </div>
  )
}

// ─── Lightbox ────────────────────────────────────────────────────────────────

function Lightbox({ index, onClose, onPrev, onNext }) {
  const { dark } = useTheme()
  const entry = flat[index]
  const [visible, setVisible] = useState(false)
  const [contentVisible, setContentVisible] = useState(false)
  const touchStartX = useRef(null)

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return
    const delta = touchStartX.current - e.changedTouches[0].clientX
    if (Math.abs(delta) > 50) {
      if (delta > 0 && index < flat.length - 1) onNext()
      if (delta < 0 && index > 0) onPrev()
    }
    touchStartX.current = null
  }

  useEffect(() => {
    requestAnimationFrame(() => {
      setVisible(true)
      setTimeout(() => setContentVisible(true), 60)
    })
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft' && index > 0) onPrev()
      if (e.key === 'ArrowRight' && index < flat.length - 1) onNext()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [index])

  const textPrimary = dark ? '#f0f0f0' : '#111'
  const textSecondary = dark ? '#a8a8a8' : '#606060'
  const cardBg = dark ? '#1e1b22' : '#ffffff'

  return createPortal(
    <>
    <style>{`
      .lb-overlay { padding: 24px; align-items: center; }
      .lb-modal { grid-template-columns: 1fr 1fr; border-radius: 20px; max-height: 90vh; overflow: hidden; }
      .lb-image { aspect-ratio: 3/4; }
      .lb-text { padding: 36px; }
      .lb-modal-enter { transform: scale(0.96) translateY(16px); }
      .lb-modal-enter-done { transform: scale(1) translateY(0); }
      @media (max-width: 600px) {
        .lb-overlay { padding: 0 !important; align-items: flex-end !important; }
        .lb-modal {
          grid-template-columns: 1fr !important;
          border-radius: 24px 24px 0 0 !important;
          max-height: 96vh !important;
          overflow-y: auto !important;
          width: 100% !important;
          max-width: 100% !important;
        }
        .lb-image { aspect-ratio: 3/4 !important; width: 100% !important; max-height: none !important; }
        .lb-text { padding: 24px 20px 40px !important; }
        .lb-modal-enter { transform: translateY(60px) !important; }
        .lb-modal-enter-done { transform: translateY(0) !important; }
      }
    `}</style>
    <div
      className="lb-overlay"
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 200,
        background: 'rgba(0,0,0,0.75)',
        backdropFilter: 'blur(8px)',
        display: 'flex', justifyContent: 'center',
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.25s ease',
      }}
    >
      <div
        className={`lb-modal ${contentVisible ? 'lb-modal-enter-done' : 'lb-modal-enter'}`}
        onClick={e => e.stopPropagation()}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        style={{
          display: 'grid',
          maxWidth: 820,
          width: '100%',
          background: cardBg,
          boxShadow: '0 32px 80px rgba(0,0,0,0.5)',
          opacity: contentVisible ? 1 : 0,
          transition: 'transform 0.35s cubic-bezier(0.34,1.2,0.64,1), opacity 0.25s ease',
        }}
      >
        {/* Image */}
        <div className="lb-image" style={{ background: entry.gradient, position: 'relative', overflow: 'hidden' }}>
          {entry.image
            ? <img src={entry.image} alt={entry.year} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            : <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontFamily: ff, fontSize: 64, fontWeight: 800, color: 'rgba(255,255,255,0.1)', letterSpacing: '-4px' }}>{entry.year}</span>
              </div>
          }
          {/* Prev/Next */}
          <div style={{ position: 'absolute', bottom: 16, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 8 }}>
            {[
              { Icon: ChevronLeft, action: onPrev, disabled: index === 0 },
              { Icon: ChevronRight, action: onNext, disabled: index === flat.length - 1 },
            ].map(({ Icon, action, disabled }, i) => (
              <button
                key={i}
                onClick={action}
                disabled={disabled}
                style={{
                  width: 38, height: 38, borderRadius: '50%', border: 'none',
                  background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(6px)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: disabled ? 'default' : 'pointer',
                  opacity: disabled ? 0.25 : 1,
                  color: '#fff',
                  transition: 'opacity 0.15s, background 0.15s',
                }}
                onMouseEnter={e => { if (!disabled) e.currentTarget.style.background = 'rgba(0,0,0,0.65)' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(0,0,0,0.4)' }}
              >
                <Icon size={18} />
              </button>
            ))}
          </div>
        </div>

        {/* Text */}
        <div className="lb-text" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', overflowY: 'auto' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <span style={{ fontFamily: ff, fontSize: 48, fontWeight: 800, letterSpacing: '-2px', color: textPrimary, lineHeight: 1 }}>
              {entry.year}
            </span>
            {entry.title
              ? <span style={{ fontFamily: ff, fontSize: 18, fontWeight: 700, letterSpacing: '-0.3px', color: textPrimary, lineHeight: 1.3 }}>
                  {entry.title}
                </span>
              : <span style={{ fontFamily: ff, fontSize: 14, color: textSecondary, fontStyle: 'italic' }}>Sin descripción aún</span>
            }
            {entry.desc && (
              <p style={{ fontFamily: ff, fontSize: 14, color: textSecondary, lineHeight: 1.7, margin: 0 }}>
                {entry.desc}
              </p>
            )}
          </div>
          <span style={{ fontFamily: ff, fontSize: 12, color: textSecondary, marginTop: 24 }}>
            {index + 1} / {flat.length}
          </span>
        </div>

        {/* Close */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute', top: 16, right: 16,
            width: 34, height: 34, borderRadius: '50%', border: 'none',
            background: 'rgba(0,0,0,0.35)', backdropFilter: 'blur(6px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', color: '#fff',
            transition: 'background 0.15s',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(0,0,0,0.6)' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(0,0,0,0.35)' }}
        >
          <X size={16} />
        </button>
      </div>
    </div>
    </>,
    document.body
  )
}

// ─── Main ────────────────────────────────────────────────────────────────────

export default function Timeline() {
  const { dark } = useTheme()
  const [lightboxIndex, setLightboxIndex] = useState(null)

  const openAt = useCallback((i) => setLightboxIndex(i), [])
  const close = useCallback(() => setLightboxIndex(null), [])
  const prev = useCallback(() => setLightboxIndex(i => Math.max(0, i - 1)), [])
  const next = useCallback(() => setLightboxIndex(i => Math.min(flat.length - 1, i + 1)), [])

  const textPrimary = dark ? '#f0f0f0' : '#111'
  const textSecondary = dark ? '#a8a8a8' : '#606060'
  const lineBg = dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'
  const dotBg = dark ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.2)'
  const cardBg = dark ? '#2a2630' : '#ffffff'
  const cardBorder = dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'
  const dividerColor = dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'

  let flatIdx = 0

  return (
    <>
      <div className="reveal" style={{ width: '100%', maxWidth: 680, margin: '0 auto', padding: '8px 0 40px' }}>
        <div style={{ position: 'relative' }}>

          {/* Vertical line */}
          <div style={{ position: 'absolute', top: 14, bottom: 14, left: 19, width: 2, background: lineBg, borderRadius: 99 }} />

          {years.map((group, gi) => {
            const groupStartIdx = flatIdx
            flatIdx += group.entries.length

            return (
              <div key={group.year} style={{ marginBottom: gi < years.length - 1 ? 8 : 0 }}>

                {/* Year divider */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 10 }}>
                  <div style={{ flexShrink: 0, width: 40, display: 'flex', justifyContent: 'center' }}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: dotBg }} />
                  </div>
                  <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ fontFamily: ff, fontSize: 22, fontWeight: 800, letterSpacing: '-0.5px', color: textPrimary, whiteSpace: 'nowrap', transition: 'color 0.3s' }}>
                      {group.year}
                    </span>
                    <div style={{ flex: 1, height: 1, background: dividerColor }} />
                  </div>
                </div>

                {/* Entries */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, paddingLeft: 56 }}>
                  {group.entries.map((entry, ei) => (
                    <CardEntry
                      key={ei}
                      entry={entry}
                      year={group.year}
                      cardBg={cardBg}
                      cardBorder={cardBorder}
                      textPrimary={textPrimary}
                      textSecondary={textSecondary}
                      dark={dark}
                      onClick={() => openAt(groupStartIdx + ei)}
                    />
                  ))}
                </div>

              </div>
            )
          })}
        </div>
      </div>

      {lightboxIndex !== null && (
        <Lightbox index={lightboxIndex} onClose={close} onPrev={prev} onNext={next} />
      )}
    </>
  )
}
