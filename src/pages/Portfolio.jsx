import { ArrowUpRight } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useTheme } from '../context/ThemeContext'
import { fetchCollection } from '../lib/cms'
import SectionHeader from '../components/SectionHeader'

import { projects } from '../data/portfolio'

const ff = 'Figtree, sans-serif'

function useTokens() {
  const { dark } = useTheme()
  return {
    border: dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)',
  }
}

function ProjectCard({ project, index, className = '' }) {
  const { border } = useTokens()
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className={`reveal ${className}`}
      style={{
        animationDelay: `${index * 0.12}s`,
        borderRadius: 16,
        overflow: 'hidden',
        cursor: 'pointer',
        background: project.gradient,
        position: 'relative',
        aspectRatio: '4/3',
        transition: 'box-shadow 0.2s ease',
        boxShadow: hovered ? `0 0 0 2px #7002FF, inset 0 0 0 1px ${border}` : `inset 0 0 0 1px ${border}`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      role="button"
      tabIndex={0}
    >
      {/* Gradient overlay */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 55%)' }} />
      {/* Light overlay */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(255,255,255,0.14) 0%, transparent 55%)', opacity: hovered ? 1 : 0, transition: 'opacity 0.35s ease', pointerEvents: 'none' }} />

      {/* Year */}
      <div style={{ position: 'absolute', top: 16, right: 16, fontFamily: ff, fontSize: 11, fontWeight: 500, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.04em' }}>
        {project.year}
      </div>

      {/* Content */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 12 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, minWidth: 0 }}>
            <span style={{
              fontFamily: ff, fontSize: 10, fontWeight: 600, letterSpacing: '0.08em',
              textTransform: 'uppercase', color: project.accent,
              background: 'rgba(0,0,0,0.3)', borderRadius: 5,
              padding: '3px 8px', display: 'inline-block', alignSelf: 'flex-start',
              backdropFilter: 'blur(4px)',
            }}>
              {project.tag}
            </span>
            <p style={{ fontFamily: ff, fontSize: 15, fontWeight: 700, letterSpacing: '-0.3px', color: '#fff', margin: 0, lineHeight: 1.25 }}>
              {project.title}
            </p>
            <p style={{ fontFamily: ff, fontSize: 12, color: 'rgba(255,255,255,0.6)', margin: 0, lineHeight: 1.4 }}>
              {project.desc}
            </p>
          </div>
          <div style={{
            width: 32, height: 32, borderRadius: '50%', flexShrink: 0,
            background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(4px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <ArrowUpRight size={14} color="#fff" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Portfolio() {
  const [allProjects, setAllProjects] = useState(projects)

  useEffect(() => {
    fetchCollection('portfolio').then(data => {
      if (data.length > 0) setAllProjects(data)
    })
  }, [])

  const [featured, ...rest] = allProjects

  return (
    <div style={{ maxWidth: 760, margin: '0 auto' }}>
      <SectionHeader title="Portfolio" desc="Proyectos de producto en los que trabajé." />
    <div className="grid-bento" style={{ gap: 12, gridAutoRows: 'auto' }}>
      <ProjectCard project={featured} index={0} className="bento-featured" />
      {rest.map((p, i) => (
        <ProjectCard key={p.title} project={p} index={i + 1} />
      ))}
    </div>
    </div>
  )
}
