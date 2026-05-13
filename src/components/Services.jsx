import { useState, useEffect } from 'react'
import { useLeadForm } from '../hooks/useLeadForm'

const services = [
  {
    title: 'Асфальтування',
    desc: 'Укладання асфальту для доріг, дворів, парковок та промислових майданчиків.',
    tags: ['від 100 м²', 'товщина 4–8 см', 'гарантія 3 роки'],
    img: '/images/Асфальтування.png',
    details: {
      about: 'Виконуємо укладання нового асфальтобетонного покриття з дотриманням технології та контролем якості на всіх етапах робіт. Використовуємо власний асфальтобетонний завод — повний контроль якості суміші від рецептури до укладання.',
      works: [
        'Підготовка та профілювання основи',
        'Обробка бітумною емульсією для надійного зчеплення шарів',
        'Укладання асфальтобетонного покриття',
        'Ущільнення дорожніми котками',
        'Примикання до бордюрів та існуючих покриттів',
      ],
      guarantee: 'Гарантія на покриття надається. Усі роботи виконуються відповідно до ДСТУ та технологічних регламентів.',
    },
  },
  {
    title: 'Ямковий ремонт',
    desc: 'Оперативне усунення ям та тріщин на дорожньому покритті.',
    tags: ['від 1 м²', 'за 24 години', 'холодний / гарячий'],
    img: '/images/ямковий ремонт.png',
    details: {
      about: 'Поточний ремонт дорожнього покриття з укладанням нового асфальтобетонного шару. Виконуємо як холодний, так і гарячий методи — залежно від масштабу та умов. Виїзд бригади — протягом 24 годин.',
      works: [
        'Підготовка та очищення пошкодженої ділянки',
        'Фрезерування або вирізання краю дефекту',
        'Обробка бітумною емульсією',
        'Укладання асфальтобетону (гарячий або холодний метод)',
        'Ущільнення та примикання до існуючого покриття',
      ],
      guarantee: 'Мінімальна ділянка — від 1 м². Гарантія на виконані роботи. Рівне та довговічне покриття без перепадів.',
    },
  },
  {
    title: 'Благоустрій територій',
    desc: 'Комплексне облаштування дворів, тротуарів та зелених зон.',
    tags: ['бордери', 'дренаж', 'освітлення'],
    img: '/images/благоустрій тер.png',
    details: {
      about: 'Виконуємо комплексний благоустрій прибудинкових, комерційних та виробничих територій з дотриманням усіх стандартів якості. Результат — рівне, надійне та зручне покриття для щоденного руху транспорту й людей.',
      works: [
        'Підготовка та планування ділянки',
        'Встановлення бордюрів та дренажних систем',
        'Укладання асфальтобетонного покриття або тротуарної плитки',
        'Облаштування під\'їзних зон і паркінгів',
        'Озеленення та освітлення (за потреби)',
      ],
      guarantee: 'Комплексна здача об\'єкта з актом виконаних робіт і гарантійним листом.',
    },
  },
  {
    title: 'Роботи під ключ',
    desc: 'Повний цикл: від проектування до здачі об\'єкта з усіма документами.',
    tags: ['проект', 'матеріали', 'виконання'],
    img: '/images/Проект під ключ.png',
    details: {
      about: 'Беремо на себе весь цикл робіт — від виїзду фахівця та складання проекту до повної здачі об\'єкта із закривними документами. Власний завод, власна техніка, без субпідрядників — ви спілкуєтесь тільки з нами.',
      works: [
        'Безкоштовний виїзд та замір ділянки',
        'Складання проекту та погодження кошторису',
        'Постачання матеріалів власного виробництва',
        'Виконання усіх видів земляних і дорожніх робіт',
        'Здача об\'єкта з актом, гарантійним листом та усіма документами',
      ],
      guarantee: 'Фіксована ціна в договорі. Жодних прихованих доплат. Гарантія від 2 до 5 років залежно від виду робіт.',
    },
  },
]

const inputClass =
  'w-full bg-brand-dark border border-brand-muted rounded-lg px-4 py-3 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-brand-yellow transition-colors disabled:opacity-50'

function ServiceModal({ service, onClose }) {
  const { form, status, phoneError, handleChange, handleSubmit, reset } = useLeadForm(service.title)
  const loading = status === 'loading'

  useEffect(() => {
    const onKey = e => { if (e.key === 'Escape') handleClose() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [])

  const handleClose = () => { reset(); onClose() }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm"
      onClick={handleClose}
    >
      <div
        className="relative z-10 w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-brand-gray border border-brand-muted rounded-2xl shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 flex items-center justify-center rounded-lg bg-brand-dark/70 text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
          aria-label="Закрити"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">

          {/* Photo */}
          <div className="relative h-56 md:h-auto min-h-[220px]">
            <img
              src={service.img}
              alt={service.title}
              className="w-full h-full object-cover rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none flex flex-col justify-end p-5">
              <h2 className="text-white font-bold text-xl">{service.title}</h2>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {service.tags.map(tag => (
                  <span key={tag} className="text-xs text-white/80 bg-white/15 border border-white/20 px-2 py-0.5 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 md:p-8 flex flex-col gap-5 overflow-y-auto">

            {status === 'success' ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center py-8">
                <div className="w-14 h-14 bg-brand-yellow/10 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-7 h-7 text-brand-yellow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-white font-bold text-xl mb-2">Заявку отримано!</p>
                <p className="text-gray-400 text-sm mb-6">Зателефонуємо протягом 30 хвилин.</p>
                <button onClick={handleClose} className="btn-primary px-8 py-3">Закрити</button>
              </div>
            ) : (
              <>
                {/* About */}
                <div>
                  <p className="text-gray-300 text-sm leading-relaxed">{service.details.about}</p>
                </div>

                {/* Work types */}
                <div>
                  <p className="text-white text-xs font-semibold uppercase tracking-wider mb-3">Що входить у роботи</p>
                  <ul className="space-y-2">
                    {service.details.works.map((w, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm text-gray-400">
                        <svg className="w-4 h-4 text-brand-yellow flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                        {w}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Guarantee */}
                <div className="bg-brand-yellow/5 border border-brand-yellow/20 rounded-xl px-4 py-3 text-xs text-gray-400 leading-relaxed">
                  {service.details.guarantee}
                </div>

                <div className="border-t border-brand-muted" />

                {/* Form */}
                <div>
                  <p className="text-white text-sm font-semibold mb-4">Залишити заявку на консультацію</p>
                  <form onSubmit={handleSubmit} className="space-y-3">
                    <input
                      type="text" name="name" value={form.name}
                      onChange={handleChange} required disabled={loading}
                      placeholder="Ваше ім'я" className={inputClass}
                    />
                    <div>
                      <input
                        type="tel" name="phone" value={form.phone}
                        onChange={handleChange} required disabled={loading}
                        placeholder="380XXXXXXXXX" inputMode="numeric"
                        className={`${inputClass} ${phoneError ? 'border-red-500' : ''}`}
                      />
                      {phoneError && <p className="text-red-400 text-xs mt-1">{phoneError}</p>}
                    </div>
                    <button
                      type="submit" disabled={loading}
                      className="w-full btn-primary py-3 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
                    {status === 'error' && (
                      <p className="text-red-400 text-xs text-center">Сталася помилка. Спробуйте ще раз.</p>
                    )}
                    <p className="text-gray-600 text-xs text-center">
                      Натискаючи кнопку, ви погоджуєтесь з обробкою персональних даних
                    </p>
                  </form>
                </div>
              </>
            )}
          </div>
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

          <div className="text-center mb-10 md:mb-16">
            <span className="text-brand-yellow text-sm font-semibold uppercase tracking-widest">// Наші послуги</span>
            <h2 className="section-heading mt-2">Що ми робимо</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {services.map((service, i) => (
              <button
                key={i}
                onClick={() => setSelected(service)}
                className="group relative rounded-xl overflow-hidden border border-brand-muted hover:border-brand-yellow transition-colors duration-300 text-left cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-yellow"
              >
                <img
                  src={service.img}
                  alt={service.title}
                  className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h3 className="text-white text-lg font-bold mb-1.5 group-hover:text-brand-yellow transition-colors duration-200">
                    {service.title}
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed mb-3">{service.desc}</p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {service.tags.map(tag => (
                      <span key={tag} className="text-xs text-gray-200 bg-white/10 border border-white/15 px-2.5 py-1 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
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

      {selected && (
        <ServiceModal service={selected} onClose={() => setSelected(null)} />
      )}
    </>
  )
}
