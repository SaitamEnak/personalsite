import { useEffect, useRef } from 'react'
import { useTheme } from '../context/ThemeContext'

export default function Cursor() {
  const cursorRef = useRef(null)
  const { dark } = useTheme()

  useEffect(() => {
    const cursor = cursorRef.current
    let x = -100, y = -100

    const move = (e) => {
      x = e.clientX
      y = e.clientY
      cursor.style.transform = `translate(${x}px, ${y}px)`
    }

    const grow = () => cursor.classList.add('is-hovering')
    const shrink = () => cursor.classList.remove('is-hovering')

    document.addEventListener('mousemove', move)

    const addListeners = () => {
      document.querySelectorAll('a, button, [role="button"], input, textarea, select, label').forEach((el) => {
        el.addEventListener('mouseenter', grow)
        el.addEventListener('mouseleave', shrink)
      })
    }

    addListeners()

    const observer = new MutationObserver(addListeners)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      document.removeEventListener('mousemove', move)
      observer.disconnect()
    }
  }, [])

  useEffect(() => {
    if (cursorRef.current) {
      cursorRef.current.style.backgroundColor = dark ? '#9747FF' : '#7002FF'
    }
  }, [dark])

  return <div ref={cursorRef} id="custom-cursor" />
}
