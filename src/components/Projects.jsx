import { useRef, useEffect } from 'react'

const projects = [
  { title: 'Асфальтування міського двору',     category: 'Двори',         area: '1 200 м²', placeholder: '🏙️' },
  { title: 'Парковка торгового центру',         category: 'Парковки',      area: '3 500 м²', placeholder: '🛒' },
  { title: 'Під\'їзна дорога до підприємства', category: 'Дороги',        area: '2 800 м²', placeholder: '🏭' },
  { title: 'Ямковий ремонт вулиць',            category: 'Ремонт',        area: '400 м²',   placeholder: '🔨' },
  { title: 'Тротуарна плитка в парку',          category: 'Благоустрій',   area: '900 м²',   placeholder: '🌳' },
  { title: 'Промисловий майданчик',            category: 'Промисловість', area: '5 000 м²', placeholder: '🏗️' },
]

const doubled = [...projects, ...projects]

function ProjectCard({ project }) {
  return (
    <div className="w-72 flex-none group rounded-xl overflow-hidden border border-brand-muted hover:border-brand-yellow transition-colors duration-300">
      <div className="w-full h-52 bg-brand-dark flex flex-col items-center justify-center relative">
        <span className="text-5xl mb-3">{project.placeholder}</span>
        <p className="text-gray-500 text-xs text-center px-4">
          Замініть на фото<br />~600×400px
        </p>
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/90 via-brand-dark/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
          <span className="text-brand-yellow text-xs font-semibold uppercase tracking-wider mb-1">{project.category}</span>
          <h3 className="text-white font-bold text-sm">{project.title}</h3>
          <p className="text-gray-300 text-xs mt-1">Площа: {project.area}</p>
        </div>
      </div>
      <div className="p-4 bg-brand-gray">
        <span className="inline-block text-brand-yellow text-xs font-medium bg-brand-yellow/10 px-2 py-1 rounded mb-2">
          {project.category}
        </span>
        <h3 className="text-white text-sm font-semibold">{project.title}</h3>
        <p className="text-gray-500 text-xs mt-1">{project.area}</p>
      </div>
    </div>
  )
}

const SPEED = 1 // px per frame at 60fps

export default function Projects() {
  const trackRef = useRef(null)
  const rafRef   = useRef(null)
  const drag     = useRef({ active: false, startX: 0, scrollStart: 0 })

  useEffect(() => {
    const el = trackRef.current
    if (!el) return

    const tick = () => {
      if (!drag.current.active) {
        el.scrollLeft += SPEED
        // seamless loop: when first set scrolled past, jump back
        if (el.scrollLeft >= el.scrollWidth / 2) {
          el.scrollLeft -= el.scrollWidth / 2
        }
      }
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  const startDrag = (x) => {
    drag.current = { active: true, startX: x, scrollStart: trackRef.current.scrollLeft }
    trackRef.current.style.cursor = 'grabbing'
  }

  const moveDrag = (x) => {
    if (!drag.current.active) return
    const el = trackRef.current
    el.scrollLeft = drag.current.scrollStart - (x - drag.current.startX)
  }

  const endDrag = () => {
    if (!drag.current.active) return
    drag.current.active = false
    const el = trackRef.current
    if (!el) return
    el.style.cursor = 'grab'
    // normalize position into first set so auto-scroll continues seamlessly
    const half = el.scrollWidth / 2
    if (el.scrollLeft >= half) el.scrollLeft -= half
    if (el.scrollLeft < 0)    el.scrollLeft += half
  }

  return (
    <section id="projects" className="py-16 md:py-24 bg-brand-gray overflow-hidden">

      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 md:mb-16">
          <span className="text-brand-yellow text-sm font-semibold uppercase tracking-widest">Портфоліо</span>
          <h2 className="section-heading mt-2">Наші проєкти</h2>
          <p className="section-subheading mx-auto">
            Декілька прикладів виконаних робіт. Усі об'єкти здані вчасно та прийняті замовниками без зауважень.
          </p>
        </div>
      </div>

      {/* Infinite slider */}
      <div
        style={{
          maskImage: 'linear-gradient(to right, transparent, black 6%, black 94%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 6%, black 94%, transparent)',
        }}
      >
        <div
          ref={trackRef}
          className="flex gap-6 overflow-x-scroll [scrollbar-width:none] [&::-webkit-scrollbar]:hidden cursor-grab select-none px-3 py-2"
          onMouseDown={e => startDrag(e.pageX)}
          onMouseMove={e => moveDrag(e.pageX)}
          onMouseUp={endDrag}
          onMouseLeave={endDrag}
          onTouchStart={e => startDrag(e.touches[0].pageX)}
          onTouchMove={e => { e.preventDefault(); moveDrag(e.touches[0].pageX) }}
          onTouchEnd={endDrag}
        >
          {doubled.map((project, i) => (
            <ProjectCard key={i} project={project} />
          ))}
        </div>
      </div>

    </section>
  )
}
