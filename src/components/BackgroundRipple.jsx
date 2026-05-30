import { useEffect, useRef } from 'react'
import { t } from '../theme'

const CELL = 56

export default function BackgroundRipple({ darkMode = false }) {
  const m = t(darkMode)
  const gridRef = useRef(null)

  useEffect(() => {
    const grid = gridRef.current
    if (!grid) return

    function build() {
      grid.innerHTML = ''

      const cols = Math.ceil(window.innerWidth / CELL) + 1
      const rows = Math.ceil(window.innerHeight / CELL) + 1

      grid.style.display = 'grid'
      grid.style.gridTemplateColumns = `repeat(${cols}, ${CELL}px)`
      grid.style.gridTemplateRows = `repeat(${rows}, ${CELL}px)`
      grid.dataset.cols = cols
      grid.dataset.rows = rows

      const borderColor = darkMode ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.09)'
      const baseBg = darkMode ? '#080808' : '#f5f0e8'

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const cell = document.createElement('div')

          cell.style.cssText = `
            border: 0.5px solid ${borderColor};
            background: ${baseBg};
            cursor: pointer;
            transition: background 0.15s ease;
          `

          cell.dataset.row = r
          cell.dataset.col = c

          cell.addEventListener('mouseenter', () => {
            cell.style.background = darkMode
              ? 'rgba(131,160,201,0.22)'
              : 'rgba(131,160,201,0.16)'
          })

          cell.addEventListener('mouseleave', () => {
            cell.style.background = baseBg
          })

          cell.addEventListener('click', () => {
            ripple(r, c, rows, cols, baseBg)
          })

          grid.appendChild(cell)
        }
      }
    }

    function ripple(clickRow, clickCol, rows, cols, baseBg) {
      const cells = grid.children

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const dist = Math.hypot(clickRow - r, clickCol - c)
          const delay = Math.max(0, dist * 55)
          const dur = 200 + dist * 80
          const cell = cells[r * cols + c]

          if (!cell) continue

          setTimeout(() => {
            cell.style.transition = `background ${dur * 0.5}ms ease`
            cell.style.background = m.accent

            setTimeout(() => {
              cell.style.background = baseBg
            }, dur * 0.5)
          }, delay)
        }
      }
    }

    build()
    window.addEventListener('resize', build)

    return () => {
      window.removeEventListener('resize', build)
    }
  }, [darkMode, m.accent])

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        overflow: 'hidden',
        pointerEvents: 'auto',
      }}
    >
      <div ref={gridRef} style={{ position: 'absolute', inset: 0 }} />
    </div>
  )
}