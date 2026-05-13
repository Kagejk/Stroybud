import { useRef, useState, useEffect, useCallback } from 'react'
import ProjectModal from './ProjectModal'

const projects = [
  {
    title: 'Асфальтування складського приміщення',
    category: 'Промисловість',
    area: '4 000 м²',
    img: '/images/склад.jpg',
    desc: 'Підготовка основи та укладання асфальтобетонного покриття для промислового складу. Рівне, міцне та зносостійке покриття для інтенсивного руху техніки.',
  },
  {
    title: 'Фрезерування та підготовка основи',
    category: 'Ремонт',
    area: '—',
    img: '/images/підготовка.jpg',
    desc: 'Фрезерування існуючого покриття з підготовкою основи. Очищення дорожнього полотна та профілювання для якісного зчеплення нового шару асфальту.',
  },
  {
    title: 'Асфальтування дорожньої ділянки',
    category: 'Дороги',
    area: '3 000 м²',
    img: '/images/3000.JPG',
    desc: 'Укладання нового асфальтобетонного покриття: підготовка основи, обробка бітумною емульсією, укладання асфальту, ущільнення котками.',
  },
  {
    title: 'Покриття з асфальтної крихти',
    category: 'Дороги',
    area: '4 км',
    img: '/images/Дорожня крихта.jpg',
    desc: 'Влаштування дорожнього покриття під ключ: планування основи, встановлення бордюрів, ущільнення щебеневої подушки та укладання асфальтної крихти.',
  },
  {
    title: 'Асфальтування комерційного об\'єкта',
    category: 'Парковки',
    area: '1 500 м²',
    img: '/images/атб парковка.jpg',
    desc: 'Комплекс робіт з асфальтування та благоустрою: підготовка основи, укладання покриття, організація під\'їзних зон і паркування.',
  },
  {
    title: 'Облаштування сільгосппідприємства',
    category: 'Промисловість',
    area: '12 000 м²',
    img: '/images/12000.jpg',
    desc: 'Асфальтування під\'їздів до складів, маневрових зон та внутрішніх проїздів з урахуванням навантажень важкої сільгосптехніки.',
  },
  {
    title: 'Укладання бруківки',
    category: 'Благоустрій',
    area: '2 000 м²',
    img: '/images/Pavers.jpg',
    desc: 'Облаштування пішохідних і під\'їзних зон тротуарною бруківкою. Підготовка основи, встановлення бордюрів, укладання та ущільнення бруківки з дотриманням ухилів для відведення води.',
  },
]

const N       = projects.length                              // 7
const STEP    = 288 + 24                                    // CARD_W + GAP = 312
const tripled = [...projects, ...projects, ...projects]     // 21 карток

function ProjectCard({ project, onClick }) {
  return (
    <div
      onClick={onClick}
      className="w-72 flex-none group rounded-xl overflow-hidden border border-brand-muted hover:border-brand-yellow transition-colors duration-300 cursor-pointer"
    >
      <div className="relative w-full h-52 overflow-hidden bg-brand-dark">
        <img
          src={project.img}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          draggable="false"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/90 via-brand-dark/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
          <span className="text-brand-yellow text-xs font-semibold uppercase tracking-wider mb-1">{project.category}</span>
          <h3 className="text-white font-bold text-sm">{project.title}</h3>
          {project.area !== '—' && <p className="text-gray-300 text-xs mt-1">{project.area}</p>}
        </div>
        <div className="absolute top-3 right-3 bg-brand-yellow text-brand-dark text-xs font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          Детальніше →
        </div>
      </div>

      <div className="p-4 bg-brand-gray">
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="inline-block text-brand-yellow text-xs font-medium bg-brand-yellow/10 px-2 py-1 rounded">
            {project.category}
          </span>
          {project.area !== '—' && (
            <span className="text-gray-500 text-xs">{project.area}</span>
          )}
        </div>
        <h3 className="text-white text-sm font-semibold mb-1">{project.title}</h3>
        <p className="text-gray-500 text-xs leading-relaxed line-clamp-2">{project.desc}</p>
      </div>
    </div>
  )
}

export default function Projects() {
  const trackRef   = useRef(null)
  const drag       = useRef({ active: false, startX: 0, scrollStart: 0, moved: false })
  const idxRef     = useRef(N)   // mutable ref — no stale closure in scrollToIdx
  const [activeIdx, setActiveIdx] = useState(N)
  const [selected,  setSelected]  = useState(null)

  const setIdx = (i) => { idxRef.current = i; setActiveIdx(i) }

  // Start in the middle copy (index N=7) so both directions have room
  useEffect(() => {
    if (trackRef.current) trackRef.current.scrollLeft = N * STEP
  }, [])

  const scrollToIdx = useCallback((target) => {
    const el = trackRef.current
    if (!el) return
    const from = idxRef.current
    let to = target

    // Crossed left edge of middle copy → instant-jump to equivalent in right copy
    if (to < N) {
      el.scrollLeft = (from + N) * STEP  // invisible same-card reposition
      to = to + N
    }
    // Crossed right edge of middle copy → instant-jump to equivalent in left copy
    else if (to >= N * 2) {
      el.scrollLeft = (from - N) * STEP  // invisible same-card reposition
      to = to - N
    }

    el.scrollTo({ left: to * STEP, behavior: 'smooth' })
    setIdx(to)
  }, [])

  const prev = () => scrollToIdx(idxRef.current - 1)
  const next = () => scrollToIdx(idxRef.current + 1)

  // Drag
  const startDrag = (x) => {
    drag.current = { active: true, startX: x, scrollStart: trackRef.current.scrollLeft, moved: false }
    trackRef.current.style.cursor = 'grabbing'
  }
  const moveDrag = (x) => {
    if (!drag.current.active) return
    const dx = x - drag.current.startX
    if (Math.abs(dx) > 5) drag.current.moved = true
    trackRef.current.scrollLeft = drag.current.scrollStart - dx
  }
  const endDrag = () => {
    if (!drag.current.active) return
    drag.current.active = false
    if (trackRef.current) trackRef.current.style.cursor = 'grab'
    const el = trackRef.current
    if (!el || !drag.current.moved) return
    const nearest = Math.max(0, Math.min(Math.round(el.scrollLeft / STEP), N * 3 - 1))
    el.scrollTo({ left: nearest * STEP, behavior: 'smooth' })
    setIdx(nearest)
  }

  const handleCardClick = (project) => {
    if (!drag.current.moved) setSelected(project)
  }

  const realIdx = activeIdx % N  // 0–6 for display

  return (
    <section id="projects" className="py-16 md:py-24 bg-brand-gray overflow-hidden">

      {/* Header row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 md:mb-14">
          <div>
            <span className="text-brand-yellow text-sm font-semibold uppercase tracking-widest">Портфоліо</span>
            <h2 className="section-heading mt-2">Наші проєкти</h2>
            <p className="section-subheading">
              Натисніть на кейс, щоб дізнатися більше.
            </p>
          </div>

          {/* Arrows + counter */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <span className="text-gray-500 text-sm mr-1">
              {realIdx + 1} / {N}
            </span>
            <button
              onClick={prev}
              className="w-11 h-11 rounded-full border border-brand-muted flex items-center justify-center text-white hover:bg-brand-yellow hover:text-brand-dark hover:border-brand-yellow transition-colors"
              aria-label="Попередній"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={next}
              className="w-11 h-11 rounded-full border border-brand-muted flex items-center justify-center text-white hover:bg-brand-yellow hover:text-brand-dark hover:border-brand-yellow transition-colors"
              aria-label="Наступний"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Track */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={trackRef}
          className="flex gap-6 overflow-x-scroll [scrollbar-width:none] [&::-webkit-scrollbar]:hidden cursor-grab select-none py-2"
          onMouseDown={e => startDrag(e.pageX)}
          onMouseMove={e => moveDrag(e.pageX)}
          onMouseUp={endDrag}
          onMouseLeave={endDrag}
          onTouchStart={e => startDrag(e.touches[0].pageX)}
          onTouchMove={e => { e.preventDefault(); moveDrag(e.touches[0].pageX) }}
          onTouchEnd={endDrag}
        >
          {tripled.map((project, i) => (
            <ProjectCard
              key={i}
              project={project}
              onClick={() => handleCardClick(project)}
            />
          ))}
        </div>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-6">
        {projects.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollToIdx(idxRef.current - realIdx + i)}
            className={`rounded-full transition-all duration-200 ${
              i === realIdx
                ? 'w-6 h-2.5 bg-brand-yellow'
                : 'w-2.5 h-2.5 bg-gray-600 hover:bg-gray-400'
            }`}
            aria-label={`Проєкт ${i + 1}`}
          />
        ))}
      </div>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </section>
  )
}
