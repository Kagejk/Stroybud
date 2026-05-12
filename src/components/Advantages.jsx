import InlineLeadForm from './InlineLeadForm'

const advantages = [
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
        />
      </svg>
    ),
    title: 'Гарантія якості',
    desc: 'Надаємо офіційну гарантію на всі виконані роботи від 2 до 5 років залежно від типу об\'єкта.',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    title: 'Точні терміни',
    desc: 'Дотримуємося погоджених термінів. Чіткий графік робіт і контроль на кожному етапі.',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
        />
      </svg>
    ),
    title: 'Прозора ціна',
    desc: 'Детальний кошторис без прихованих доплат. Кінцева вартість завжди відповідає договору.',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
      </svg>
    ),
    title: 'Власна техніка',
    desc: 'Парк сучасних асфальтоукладачів, котків і самоскидів. Не залежимо від субпідрядників.',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    ),
    title: 'Досвідчена команда',
    desc: 'Понад 50 спеціалістів з профільною освітою і багаторічним практичним досвідом.',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
        />
      </svg>
    ),
    title: 'Безкоштовна консультація',
    desc: 'Виїзд фахівця для огляду об\'єкта та складання попереднього кошторису — безкоштовно.',
  },
]

export default function Advantages() {
  return (
    <section id="advantages" className="py-16 md:py-24 bg-brand-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <div className="text-center mb-10 md:mb-16">
          <span className="text-brand-yellow text-sm font-semibold uppercase tracking-widest">Наші переваги</span>
          <h2 className="section-heading mt-2">Чому обирають нас</h2>
          <p className="section-subheading mx-auto">
            Ми не просто кладемо асфальт — ми несемо відповідальність за кожен сантиметр покриття.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {advantages.map((adv, i) => (
            <div key={i} className="card group">
              <div className="w-14 h-14 rounded-xl bg-brand-yellow/10 text-brand-yellow flex items-center justify-center mb-5 group-hover:bg-brand-yellow group-hover:text-brand-dark transition-colors duration-200">
                {adv.icon}
              </div>
              <h3 className="text-white text-lg font-bold mb-3">{adv.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{adv.desc}</p>
            </div>
          ))}
        </div>

        <InlineLeadForm label="Переконалися? Залишіть заявку!" serviceName="Переваги" />
      </div>
    </section>
  )
}
