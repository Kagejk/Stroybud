const featureBadges = [
  {
    label: 'Власна техніка',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
        />
      </svg>
    ),
  },
  {
    label: 'Контроль якості',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
        />
      </svg>
    ),
  },
  {
    label: 'Гарантія на роботи',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
        />
      </svg>
    ),
  },
]

export default function Hero({ onOpenModal }) {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Background photo */}
      <img
        src="/hero-bg.jpg"
        alt=""
        className="absolute inset-0 w-full h-full object-cover object-right"
      />

      {/* Dark overlay — heavy on left, fades right, matching original */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/75 to-black/30" />
      {/* Extra top-to-bottom darkening */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/50" />

      {/* Content — left-aligned */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 pt-28 pb-20">
        <div className="max-w-2xl">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 border border-white/20 bg-black/40 text-white text-xs font-semibold px-4 py-2 rounded-full uppercase tracking-widest mb-8">
            <span className="w-2 h-2 bg-brand-yellow rounded-full animate-pulse flex-shrink-0" />
            Працюємо по всій Україні
          </div>

          {/* Main heading */}
          <h1 className="font-black uppercase leading-none mb-6">
            <span className="block text-white text-4xl sm:text-6xl lg:text-8xl">
              Асфальтування
            </span>
            <span className="block text-brand-yellow text-4xl sm:text-6xl lg:text-8xl">
              Під ключ
            </span>
          </h1>

          {/* Subtext */}
          <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-8">
            Дороги, двори, парковки та майданчики.
            <br />
            Від заявки до результату —{' '}
            <span className="text-brand-yellow font-semibold">24 години</span>
          </p>

          {/* Feature badges */}
          <div className="flex flex-wrap gap-3 mb-10">
            {featureBadges.map(badge => (
              <div
                key={badge.label}
                className="flex items-center gap-2 border border-white/20 bg-black/30 text-white text-sm font-medium px-4 py-2 rounded-full"
              >
                <span className="text-gray-300">{badge.icon}</span>
                {badge.label}
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={onOpenModal}
              className="inline-flex items-center justify-center gap-2 bg-brand-yellow text-brand-dark font-bold px-7 py-4 rounded-md hover:bg-yellow-400 transition-colors duration-200 text-base"
            >
              Безкоштовний виїзд
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            <a
              href="tel:+380960600060"
              className="inline-flex items-center justify-center gap-2 border border-white/25 bg-black/40 text-brand-yellow font-bold px-7 py-4 rounded-md hover:border-brand-yellow/60 transition-colors duration-200 text-base"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              Зателефонувати
            </a>
          </div>

        </div>
      </div>
    </section>
  )
}
