import InlineLeadForm from './InlineLeadForm'

const facts = [
  { value: '2014', label: 'Рік заснування' },
  { value: '10+',  label: 'Років на ринку' },
  { value: '500+', label: 'Проєктів виконано' },
  { value: '30+',  label: 'Одиниць власної техніки' },
]

const strengths = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-2 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
        />
      </svg>
    ),
    title: 'Власний асфальтобетонний завод',
    desc: 'Виробляємо суміш самостійно — повний контроль якості від рецептури до укладання.',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
        />
      </svg>
    ),
    title: '30+ одиниць спецтехніки',
    desc: 'Асфальтоукладачі, дорожні котки, самоскиди, фрезерувальні машини — весь парк власний.',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
        />
      </svg>
    ),
    title: 'Без субпідрядників',
    desc: 'Весь цикл — від виробництва суміші до здачі об\'єкта — під нашим контролем.',
  },
]

export default function About() {
  return (
    <section id="about" className="py-16 md:py-24 bg-brand-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* Image */}
          <div className="relative pb-10 md:pb-8 lg:pb-0">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-brand-muted">
              <img
                src="/images/58.jpg"
                alt="Власна техніка Стройбуд за роботою"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Floating badge */}
            <div className="absolute bottom-0 right-4 md:right-0 lg:-bottom-6 lg:-right-6 bg-brand-yellow text-brand-dark rounded-2xl p-4 md:p-5 shadow-xl">
              <div className="text-2xl md:text-3xl font-extrabold">1</div>
              <div className="text-xs font-semibold leading-tight">Власний<br />АБЗ завод</div>
            </div>
          </div>

          {/* Content */}
          <div>
            <span className="text-brand-yellow text-sm font-semibold uppercase tracking-widest">Про компанію</span>
            <h2 className="section-heading mt-2">
              Свій завод. Своя техніка.<br className="hidden sm:block" />Повний контроль якості.
            </h2>
            <p className="text-gray-400 text-base leading-relaxed mb-5">
              «Стройбуд» — провідний підрядник з дорожнього будівництва та асфальтування в Україні.
              З 2014 року виконуємо проєкти будь-якого масштабу: від приватних подвір'їв до
              муніципальних доріг і великих промислових майданчиків.
            </p>
            <p className="text-gray-400 text-base leading-relaxed mb-6">
              На відміну від більшості підрядників, ми маємо <span className="text-white font-semibold">власний асфальтобетонний завод</span> і{' '}
              <span className="text-white font-semibold">понад 30 одиниць спецтехніки</span>. Ми не залежимо від субпідрядників —
              весь цикл від виробництва суміші до укладання під нашим повним контролем.
              Це означає вищу якість, точні терміни і реальну економію для замовника.
            </p>

            {/* Strengths list */}
            <div className="space-y-3 mb-6">
              {strengths.map(s => (
                <div key={s.title} className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-brand-yellow/10 text-brand-yellow flex items-center justify-center flex-shrink-0 mt-0.5">
                    {s.icon}
                  </div>
                  <div>
                    <div className="text-white text-sm font-semibold">{s.title}</div>
                    <div className="text-gray-500 text-xs leading-relaxed">{s.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Phone CTA */}
            <a
              href="tel:+380960600060"
              className="inline-flex items-center gap-3 bg-brand-yellow/10 border border-brand-yellow/30 hover:bg-brand-yellow hover:border-brand-yellow text-brand-yellow hover:text-brand-dark rounded-xl px-5 py-3 transition-colors duration-200 mb-8 group"
            >
              <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              <div>
                <div className="text-xs font-medium opacity-70 group-hover:opacity-100">Зателефонуйте нам</div>
                <div className="text-base font-bold leading-tight">+380 96 060 00 60</div>
              </div>
            </a>

            {/* Facts grid */}
            <div className="grid grid-cols-2 gap-3 md:gap-4">
              {facts.map(fact => (
                <div key={fact.label} className="bg-brand-dark rounded-xl p-4 border border-brand-muted">
                  <div className="text-xl md:text-2xl font-bold text-brand-yellow">{fact.value}</div>
                  <div className="text-gray-400 text-xs md:text-sm mt-1">{fact.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <InlineLeadForm label="Хочете дізнатися більше або отримати кошторис?" serviceName="Про компанію" />
      </div>
    </section>
  )
}
