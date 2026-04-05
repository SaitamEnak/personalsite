import { useTheme } from '../context/ThemeContext'

const ff = 'Figtree, sans-serif'

export default function SectionHeader({ title, desc }) {
  const { dark } = useTheme()
  const textPrimary = dark ? '#f0f0f0' : '#111'
  const textSecondary = dark ? '#a8a8a8' : '#606060'

  return (
    <div style={{ padding: '0 4px 24px' }}>
      <h2 style={{
        fontFamily: ff,
        fontSize: 26,
        fontWeight: 800,
        letterSpacing: '-0.6px',
        color: textPrimary,
        margin: 0,
        lineHeight: 1,
        transition: 'color 0.3s',
      }}>
        {title}
      </h2>
      {desc && (
        <p style={{
          fontFamily: ff,
          fontSize: 14,
          fontWeight: 400,
          color: textSecondary,
          margin: '6px 0 0',
          lineHeight: 1.5,
          transition: 'color 0.3s',
        }}>
          {desc}
        </p>
      )}
    </div>
  )
}
