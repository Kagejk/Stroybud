const reviews = [
  {
    name: 'Олексій Коваленко',
    role: 'Директор ТОВ "Логіст Плюс"',
    text: 'Заасфальтували парковку перед офісом. Усе чітко по договору — вклалися у терміни і кошторис. Бригада акуратна, прибрали за собою. Рекомендую без застережень.',
    stars: 5,
  },
  {
    name: 'Наталія Дем\'яненко',
    role: 'Приватний забудовник, Київ',
    text: 'Робили під\'їзд до будинку та відмостку. Якість матеріалів хороша, покриття рівне. Майстер пояснив усі нюанси ще до початку робіт. Дуже задоволена результатом.',
    stars: 5,
  },
  {
    name: 'Ігор Мартиненко',
    role: 'Керуючий ЖК "Сонячний"',
    text: 'Відремонтували двір і замінили частину тротуарної плитки. Роботи виконано якісно і швидко. Мешканці задоволені. Обов\'язково звернемося знову.',
    stars: 5,
  },
]

function Stars({ count }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} className={`w-4 h-4 ${i < count ? 'text-brand-yellow' : 'text-gray-600'}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

export default function Reviews() {
  return (
    <section id="reviews" className="py-16 md:py-24 bg-brand-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-10 md:mb-16">
          <span className="text-brand-yellow text-sm font-semibold uppercase tracking-widest">Відгуки</span>
          <h2 className="section-heading mt-2">Що кажуть клієнти</h2>
          <p className="section-subheading mx-auto">
            Більше 500 виконаних об'єктів. Ось що говорять ті, хто вже обрав нас.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((r, i) => (
            <div key={i} className="bg-brand-dark rounded-2xl border border-brand-muted p-6 flex flex-col gap-4">
              <Stars count={r.stars} />
              <p className="text-gray-300 text-sm leading-relaxed flex-1">"{r.text}"</p>
              <div className="border-t border-brand-muted pt-4">
                <p className="text-white font-semibold text-sm">{r.name}</p>
                <p className="text-gray-500 text-xs mt-0.5">{r.role}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
