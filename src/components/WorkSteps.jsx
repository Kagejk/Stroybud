const steps = [
  {
    number: '01',
    title: 'Залишаєте заявку',
    desc: 'Телефонуєте або заповнюєте форму. Менеджер передзвонить протягом 30 хвилин.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
        />
      </svg>
    ),
  },
  {
    number: '02',
    title: 'Виїзд і замір',
    desc: 'Безкоштовний виїзд фахівця для огляду об\'єкта та складання точного кошторису.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
        />
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Укладаємо договір',
    desc: 'Фіксуємо строки, вартість і обсяги робіт у офіційному договорі. Без прихованих умов.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
    ),
  },
  {
    number: '04',
    title: 'Виконуємо роботи',
    desc: 'Бригада та техніка виходять на об\'єкт. Контроль якості на кожному етапі укладання.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
        />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    number: '05',
    title: 'Здача об\'єкта',
    desc: 'Прийомка з фотофіксацією. Підписуємо акт виконаних робіт і надаємо гарантійний лист.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
        />
      </svg>
    ),
  },
]

export default function WorkSteps() {
  return (
    <section id="steps" className="py-16 md:py-24 bg-brand-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <span className="text-brand-yellow text-sm font-semibold uppercase tracking-widest">Як ми працюємо</span>
          <h2 className="section-heading mt-2">Етапи роботи</h2>
          <p className="section-subheading mx-auto">
            Від першого дзвінка до здачі об'єкта — прозрачний і зрозумілий процес.
          </p>
        </div>

        {/* Steps — horizontal on lg, vertical on mobile */}
        <div className="relative">

          {/* Connecting line (desktop only) */}
          <div className="hidden lg:block absolute top-10 left-0 right-0 h-px bg-brand-muted" style={{ top: '2.5rem' }} />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-4 relative">
            {steps.map((step, i) => (
              <div key={i} className="flex lg:flex-col items-start lg:items-center gap-5 lg:gap-0 lg:text-center relative">

                {/* Circle */}
                <div className="relative flex-shrink-0">
                  <div className="w-20 h-20 rounded-full bg-brand-gray border-2 border-brand-yellow flex flex-col items-center justify-center z-10 relative">
                    <span className="text-brand-yellow text-xs font-bold leading-none mb-1">{step.number}</span>
                    <span className="text-white">{step.icon}</span>
                  </div>
                </div>

                {/* Text */}
                <div className="lg:mt-5">
                  <h3 className="text-white text-base font-bold mb-2">{step.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
