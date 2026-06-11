// src/components/HexOverlay.jsx
// Overlay de hexágonos que vive en App — NO se desmonta al navegar entre rutas.
// Fase IN:  hexes aparecen centro → afuera
// Fase OUT: hexes desaparecen afuera → adentro (inversa exacta)
// Durante la fase OUT el dashboard ya está montado y visible por detrás.

import { useState, useEffect, useRef } from 'react'
import { useTransicion } from '../contexts/TransicionContext.jsx'
import { useNavigate } from 'react-router-dom'

const R        = 40    // circunradio flat-top
const OVERDRAW = 0.7   // elimina sub-pixel gaps
const BATCH    = 8
const INTERVAL = 16    // ~60 fps

function buildGrid(vw, vh) {
  const stepX = R * 1.5
  const stepY = R * Math.sqrt(3)
  const cols  = Math.ceil(vw / stepX) + 3
  const rows  = Math.ceil(vh / stepY) + 3
  const hexes = []
  for (let col = -1; col < cols; col++) {
    for (let row = -1; row < rows; row++) {
      const cx = col * stepX
      const cy = row * stepY + (col % 2 !== 0 ? stepY / 2 : 0)
      hexes.push({ id: `${col}-${row}`, cx, cy })
    }
  }
  return hexes
}

function hexPoints(cx, cy, r) {
  return Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 3) * i
    return `${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`
  }).join(' ')
}

export default function HexOverlay() {
  const { activa, terminarTransicion, callbackRef } = useTransicion()
  const navigate = useNavigate()

  const [hexes,  setHexes]  = useState([])
  const [states, setStates] = useState({})
  const timerRef = useRef(null)
  const corriendoRef = useRef(false)

  useEffect(() => {
    if (!activa || corriendoRef.current) return
    corriendoRef.current = true

    const vw = window.innerWidth
    const vh = window.innerHeight
    const grid = buildGrid(vw, vh)
    setHexes(grid)
    setStates({})

    const cx = vw / 2, cy = vh / 2

    // Centro → afuera
    const sortedIn = [...grid].sort(
      (a, b) => Math.hypot(a.cx - cx, a.cy - cy) - Math.hypot(b.cx - cx, b.cy - cy)
    )
    // Afuera → adentro (reversa)
    const sortedOut = [...sortedIn].reverse()

    // ── Fase IN ──
    let i = 0
    function revealNext() {
      if (i >= sortedIn.length) {
        // Pantalla llena: navegar al dashboard (se monta detrás del overlay)
        if (callbackRef.current) callbackRef.current()
        timerRef.current = setTimeout(startOut, 350)
        return
      }
      const ids = sortedIn.slice(i, i + BATCH).map(h => h.id)
      setStates(prev => {
        const next = { ...prev }
        ids.forEach(id => { next[id] = 'shown' })
        return next
      })
      i += BATCH
      timerRef.current = setTimeout(revealNext, INTERVAL)
    }

    // ── Fase OUT (inversa) ──
    function startOut() {
      let j = 0
      function hideNext() {
        if (j >= sortedOut.length) {
          timerRef.current = setTimeout(() => {
            corriendoRef.current = false
            setStates({})
            setHexes([])
            terminarTransicion()
          }, 150)
          return
        }
        const ids = sortedOut.slice(j, j + BATCH).map(h => h.id)
        setStates(prev => {
          const next = { ...prev }
          ids.forEach(id => { next[id] = 'gone' })
          return next
        })
        j += BATCH
        timerRef.current = setTimeout(hideNext, INTERVAL)
      }
      hideNext()
    }

    timerRef.current = setTimeout(revealNext, 30)
    return () => clearTimeout(timerRef.current)
  }, [activa])  // eslint-disable-line react-hooks/exhaustive-deps

  if (!activa && hexes.length === 0) return null

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 300, pointerEvents: 'none', overflow: 'hidden' }}>
      <svg width="100%" height="100%" style={{ display: 'block' }}>
        <defs>
          <linearGradient id="hg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%"   stopColor="#3A2210" />
            <stop offset="100%" stopColor="#2A1B13" />
          </linearGradient>
        </defs>
        {hexes.map(h => {
          const st = states[h.id]
          return (
            <polygon
              key={h.id}
              points={hexPoints(h.cx, h.cy, R + OVERDRAW)}
              fill="url(#hg)"
              stroke="#F5A623"
              strokeWidth="0.4"
              strokeOpacity="0.15"
              style={{
                opacity: st === 'shown' ? 1 : 0,
                transition: 'opacity 0.15s ease-out',
              }}
            />
          )
        })}
      </svg>
    </div>
  )
}
