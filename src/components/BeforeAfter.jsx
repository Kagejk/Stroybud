import { useState, useRef, useCallback, useEffect } from 'react'

export default function BeforeAfter() {
  const [position, setPosition] = useState(50)
  const containerRef = useRef(null)
  const dragging     = useRef(false)

  const updatePosition = useCallback((clientX) => {
    const el = containerRef.current
    if (!el) return
    const { left, width } = el.getBoundingClientRect()
    const pct = Math.min(100, Math.max(0, ((clientX - left) / width) * 100))
    setPosition(pct)
  }, [])

  const startDrag = (e) => { dragging.current = true; e.preventDefault() }
  const stopDrag  = ()  => { dragging.current = false }

  const onMouseMove = useCallback((e) => {
    if (dragging.current) updatePosition(e.clientX)
  }, [updatePosition])

  // Touch: add non-passive listener to allow preventDefault (prevents page scroll while dragging)
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const onTouchMove = (e) => {
      if (dragging.current) {
        e.preventDefault()
        updatePosition(e.touches[0].clientX)
      }
    }
    el.addEventListener('touchmove', onTouchMove, { passive: false })
    return () => el.removeEventListener('touchmove', onTouchMove)
  }, [updatePosition])

  return (
    <section id="results" className="py-16 md:py-24 bg-brand-dark">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <div className="text-center mb-10 md:mb-14">
          <span className="text-gray-500 text-xs font-semibold uppercase tracking-[0.25em]">
            // Результати
          </span>
          <h2 className="font-black uppercase leading-none mt-3 mb-5">
            <span className="text-white   text-5xl sm:text-6xl md:text-7xl">ДО</span>
            <span className="text-white   text-5xl sm:text-6xl md:text-7xl"> / </span>
            <span className="text-brand-yellow text-5xl sm:text-6xl md:text-7xl">ПІСЛЯ</span>
          </h2>
          <div className="inline-flex items-center gap-2 border border-brand-yellow/50 text-brand-yellow text-sm font-semibold px-5 py-2 rounded-full">
            <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            24 години від заявки до результату
          </div>
        </div>

        {/* Slider */}
        <div
          ref={containerRef}
          className="relative overflow-hidden rounded-2xl select-none cursor-ew-resize aspect-video"
          onMouseMove={onMouseMove}
          onMouseUp={stopDrag}
          onMouseLeave={stopDrag}
          onTouchStart={() => { dragging.current = true }}
          onTouchEnd={stopDrag}
        >
          {/* Before photo — base layer */}
          <img
            src="/images/до.jpg"
            alt="До"
            className="absolute inset-0 w-full h-full object-cover"
            draggable={false}
          />

          {/* After photo — clipped from the left at slider position */}
          <img
            src="/images/после.jpg"
            alt="Після"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ clipPath: `inset(0 0 0 ${position}%)` }}
            draggable={false}
          />

          {/* ДО label */}
          <div className="absolute top-4 left-4 bg-black/70 text-white text-xs font-bold px-3 py-1.5 rounded pointer-events-none">
            ДО
          </div>

          {/* ПІСЛЯ label */}
          <div className="absolute top-4 right-4 bg-brand-yellow text-brand-dark text-xs font-bold px-3 py-1.5 rounded pointer-events-none">
            ПІСЛЯ
          </div>

          {/* Divider line */}
          <div
            className="absolute inset-y-0 w-[2px] bg-brand-yellow pointer-events-none"
            style={{ left: `${position}%` }}
          />

          {/* Drag handle */}
          <div
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-11 h-11 bg-brand-yellow rounded-full flex items-center justify-center cursor-ew-resize shadow-xl z-10"
            style={{ left: `${position}%` }}
            onMouseDown={startDrag}
            onTouchStart={(e) => { dragging.current = true; e.stopPropagation() }}
          >
            <svg className="w-5 h-5 text-brand-dark" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8.5 12l-3.5 3.5L1.5 12 5 8.5 8.5 12zM15.5 12l3.5-3.5 3.5 3.5-3.5 3.5-3.5-3.5z"/>
            </svg>
          </div>
        </div>

      </div>
    </section>
  )
}
