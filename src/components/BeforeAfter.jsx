import { useState, useRef, useCallback, useEffect } from 'react'

const pairs = [
  { before: '/images/до.jpg',  after: '/images/после.jpg'  },
  { before: '/images/до1.jpg', after: '/images/после1.jpg' },
  { before: '/images/до2.jpg', after: '/images/после2.jpg' },
  { before: '/images/до3.jpg', after: '/images/после3.jpg' },
]

export default function BeforeAfter() {
  const [current,  setCurrent]  = useState(0)
  const [position, setPosition] = useState(50)
  const containerRef = useRef(null)
  const dragging     = useRef(false)

  const goTo = (idx) => {
    setCurrent(idx)
    setPosition(50)
  }
  const prev = () => goTo((current - 1 + pairs.length) % pairs.length)
  const next = () => goTo((current + 1) % pairs.length)

  const updatePosition = useCallback((clientX) => {
    const el = containerRef.current
    if (!el) return
    const { left, width } = el.getBoundingClientRect()
    setPosition(Math.min(100, Math.max(0, ((clientX - left) / width) * 100)))
  }, [])

  const startDrag = (e) => { dragging.current = true; e.preventDefault() }
  const stopDrag  = ()  => { dragging.current = false }
  const onMouseMove = useCallback((e) => {
    if (dragging.current) updatePosition(e.clientX)
  }, [updatePosition])

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const onTouchMove = (e) => {
      if (dragging.current) { e.preventDefault(); updatePosition(e.touches[0].clientX) }
    }
    el.addEventListener('touchmove', onTouchMove, { passive: false })
    return () => el.removeEventListener('touchmove', onTouchMove)
  }, [current, updatePosition])

  const pair = pairs[current]

  return (
    <section id="results" className="py-16 md:py-24 bg-brand-dark">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-10 md:mb-14">
          <span className="text-brand-yellow text-sm font-semibold uppercase tracking-widest">
            // Результати
          </span>
          <h2 className="font-black uppercase leading-none mt-3 mb-5">
            <span className="text-white text-5xl sm:text-6xl md:text-7xl">ДО</span>
            <span className="text-white text-5xl sm:text-6xl md:text-7xl"> / </span>
            <span className="text-brand-yellow text-5xl sm:text-6xl md:text-7xl">ПІСЛЯ</span>
          </h2>
          <div className="inline-flex items-center gap-2 border border-brand-yellow/50 text-brand-yellow text-sm font-semibold px-5 py-2 rounded-full">
            <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Потягніть лінію, щоб порівняти
          </div>
        </div>

        {/* Slider wrapper */}
        <div className="relative">

          {/* Left arrow */}
          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-6 z-20 w-10 h-10 bg-brand-gray border border-brand-muted rounded-full flex items-center justify-center text-white hover:bg-brand-yellow hover:text-brand-dark hover:border-brand-yellow transition-colors"
            aria-label="Попередній"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Right arrow */}
          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-6 z-20 w-10 h-10 bg-brand-gray border border-brand-muted rounded-full flex items-center justify-center text-white hover:bg-brand-yellow hover:text-brand-dark hover:border-brand-yellow transition-colors"
            aria-label="Наступний"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Comparison slider */}
          <div
            ref={containerRef}
            className="relative overflow-hidden rounded-2xl select-none cursor-ew-resize aspect-video"
            onMouseMove={onMouseMove}
            onMouseUp={stopDrag}
            onMouseLeave={stopDrag}
            onTouchStart={() => { dragging.current = true }}
            onTouchEnd={stopDrag}
          >
            {/* Counter */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 bg-black/60 text-white text-xs font-bold px-3 py-1 rounded-full pointer-events-none">
              {current + 1} / {pairs.length}
            </div>

            {/* Before photo */}
            <img
              src={pair.before}
              alt="До"
              className="absolute inset-0 w-full h-full object-cover"
              draggable={false}
            />

            {/* After photo — clipped from left at slider position */}
            <img
              src={pair.after}
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

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-6">
          {pairs.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`w-2.5 h-2.5 rounded-full transition-colors ${i === current ? 'bg-brand-yellow' : 'bg-gray-600 hover:bg-gray-400'}`}
              aria-label={`Об'єкт ${i + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  )
}
