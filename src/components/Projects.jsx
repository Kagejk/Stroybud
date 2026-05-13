import { useRef, useEffect, useState } from 'react'
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

const doubled = [...projects, ...projects]

const SPEED = 0.4       // px per frame
const CLICK_THRESHOLD = 5 // px — менше цього = клік, більше = drag

function ProjectCard({ project, onClick }) {
  return (
    <div
      onClick={onClick}
      className="w-72 flex-none group rounded-xl overflow-hidden border border-brand-muted hover:border-brand-yellow transition-colors duration-300 cursor-pointer"
    >
      {/* Photo */}
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
        {/* "Читати більше" hint */}
        <div className="absolute top-3 right-3 bg-brand-yellow text-brand-dark text-xs font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          Детальніше →
        </div>
      </div>

      {/* Info */}
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
  const trackRef  = useRef(null)
  const rafRef    = useRef(null)
  const drag      = useRef({ active: false, startX: 0, scrollStart: 0, moved: false })
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    const el = trackRef.current
    if (!el) return
    const tick = () => {
      if (!drag.current.active) {
        el.scrollLeft += SPEED
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
    drag.current = { active: true, startX: x, scrollStart: trackRef.current.scrollLeft, moved: false }
    trackRef.current.style.cursor = 'grabbing'
  }

  const moveDrag = (x) => {
    if (!drag.current.active) return
    const dx = x - drag.current.startX
    if (Math.abs(dx) > CLICK_THRESHOLD) drag.current.moved = true
    trackRef.current.scrollLeft = drag.current.scrollStart - dx
  }

  const endDrag = () => {
    if (!drag.current.active) return
    drag.current.active = false
    const el = trackRef.current
    if (!el) return
    el.style.cursor = 'grab'
    const half = el.scrollWidth / 2
    if (el.scrollLeft >= half) el.scrollLeft -= half
    if (el.scrollLeft < 0)    el.scrollLeft += half
  }

  // Клік по картці спрацьовує тільки якщо не було drag
  const handleCardClick = (project) => {
    if (!drag.current.moved) setSelected(project)
  }

  return (
    <section id="projects" className="py-16 md:py-24 bg-brand-gray overflow-hidden">

      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 md:mb-16">
          <span className="text-brand-yellow text-sm font-semibold uppercase tracking-widest">Портфоліо</span>
          <h2 className="section-heading mt-2">Наші проєкти</h2>
          <p className="section-subheading mx-auto">
            Натисніть на кейс, щоб дізнатися більше та залишити заявку.
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
            <ProjectCard
              key={i}
              project={project}
              onClick={() => handleCardClick(project)}
            />
          ))}
        </div>
      </div>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </section>
  )
}
