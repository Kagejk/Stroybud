import { useState } from 'react'
import { useLeadForm } from '../hooks/useLeadForm'

const services = [
  {
    title: 'Асфальтування',
    desc: 'Укладання асфальту для доріг, дворів, парковок та промислових майданчиків.',
    tags: ['від 100 м²', 'товщина 4–8 см', 'гарантія 3 роки'],
    img: '/images/Асфальтування.png',
  },
  {
    title: 'Ямковий ремонт',
    desc: 'Оперативне усунення ям та тріщин на дорожньому покритті.',
    tags: ['від 1 м²', 'за 24 години', 'холодний / гарячий'],
    img: '/images/ямковий ремонт.png',
  },
  {
    title: 'Благоустрій територій',
    desc: 'Комплексне облаштування дворів, тротуарів та зелених зон.',
    tags: ['бордери', 'дренаж', 'освітлення'],
    img: '/images/благоустрій тер.png',
  },
  {
    title: 'Роботи під ключ',
    desc: 'Повний цикл: від проектування до здачі об\'єкта з усіма документами.',
    tags: ['проект', 'матеріали', 'виконання'],
    img: '/images/Проект під ключ.png',
  },
]

const inputClass =
  'w-full bg-brand-dark border border-brand-muted rounded-lg px-4 py-3 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-brand-yellow transition-colors disabled:opacity-50'

function Modal({ service, onClose }) {
  const { form, status, phoneError, handleChange, handleSubmit, reset } = useLeadForm(service.title)
  const loading = status === 'loading'

  const handleClose = () => { reset(); onClose() }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={handleClose}
    >
      <div
        className="relative w-full max-w-md bg-brand-gray rounded-2xl border border-brand-muted shadow-2xl overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Top image strip */}
        <div className="relative h-36 overflow-hidden">
          <img src={service.img} alt={service.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-gray via-black/40 to-transparent" />
          <h3 className="absolute bottom-4 left-5 right-10 text-white text-lg font-bold leading-tight">
            {service.title}
          </h3>
        </div>

        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/80 transition-colors"
          aria-label="Закрити"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Content */}
        <div className="p-6">
          {status === 'success' ? (
            <div className="text-center py-6">
              <div className="text-5xl mb-4">✅</div>
              <p className="text-white font-semibold text-base">Дякуємо! Ми зателефонуємо вам найближчим часом.</p>
              <button onClick={handleClose} className="mt-5 btn-primary w-full text-center text-sm">
                Закрити
              </button>
            </div>
          ) : (
            <>
              <p className="text-gray-400 text-sm mb-5">
                Залиште свої дані — менеджер зв'яжеться з вами протягом 30 хвилин і безкоштовно проконсультує.
              </p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-gray-400 text-xs mb-1.5">Ваше ім'я *</label>
                  <input
                    type="text" name="name" value={form.name}
                    onChange={handleChange} required disabled={loading}
                    placeholder="Іван Петренко" className={inputClass}
                  />
                </div>
                <div>
                  <label className="block text-gray-400 text-xs mb-1.5">Номер телефону *</label>
                  <input
                    type="tel" name="phone" value={form.phone}
                    onChange={handleChange} required disabled={loading}
                    placeholder="380XXXXXXXXX" inputMode="numeric"
                    className={`${inputClass} ${phoneError ? 'border-red-500 focus:border-red-500' : ''}`}
                  />
                  {phoneError && (
                    <p className="text-red-400 text-xs mt-1">{phoneError}</p>
                  )}
                </div>

                {status === 'error' && (
                  <p className="text-red-400 text-xs">
                    Сталася помилка. Спробуйте ще раз або зателефонуйте нам напряму.
                  </p>
                )}

                <button
                  type="submit" disabled={loading}
                  className="btn-primary w-full text-center text-sm py-3.5 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                      </svg>
                      Надсилаємо…
                    </>
                  ) : 'Надіслати заявку'}
                </button>
                <p className="text-gray-600 text-xs text-center">
                  Натискаючи кнопку, ви погоджуєтесь з обробкою персональних даних
                </p>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default function Services() {
  const [selected, setSelected] = useState(null)

  return (
    <>
      <section id="services" className="py-16 md:py-24 bg-brand-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Section header */}
          <div className="text-center mb-10 md:mb-16">
            <span className="text-brand-yellow text-sm font-semibold uppercase tracking-widest">// Наші послуги</span>
            <h2 className="section-heading mt-2">Що ми робимо</h2>
          </div>

          {/* 2×2 Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {services.map((service, i) => (
              <button
                key={i}
                onClick={() => setSelected(service)}
                className="group relative rounded-xl overflow-hidden border border-brand-muted hover:border-brand-yellow transition-colors duration-300 text-left cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-yellow"
              >
                {/* Background photo */}
                <img
                  src={service.img}
                  alt={service.title}
                  className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                {/* Text content */}
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h3 className="text-white text-lg font-bold mb-1.5 group-hover:text-brand-yellow transition-colors duration-200">
                    {service.title}
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed mb-3">{service.desc}</p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {service.tags.map(tag => (
                      <span
                        key={tag}
                        className="text-xs text-gray-200 bg-white/10 border border-white/15 px-2.5 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  <span className="text-brand-yellow text-sm font-semibold inline-flex items-center gap-1 group-hover:gap-2 transition-all duration-200">
                    Замовити
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </button>
            ))}
          </div>

        </div>
      </section>

      {/* Modal */}
      {selected && (
        <Modal service={selected} onClose={() => setSelected(null)} />
      )}
    </>
  )
}
