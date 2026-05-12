import { useState } from 'react'

const faqs = [
  {
    q: 'Скільки коштує асфальтування?',
    a: 'Ціна залежить від площі, товщини покриття та підготовки основи. Мінімальна вартість — від 350 грн/м². Точний кошторис складаємо безкоштовно після виїзду на об\'єкт.',
  },
  {
    q: 'Як довго займає укладання?',
    a: 'Стандартний об\'єкт до 500 м² виконуємо за 1–2 робочих дні. Великі об\'єкти — за погодженим графіком. Терміни фіксуємо у договорі.',
  },
  {
    q: 'Яку гарантію ви надаєте?',
    a: 'Надаємо письмову гарантію від 2 до 5 років залежно від типу робіт і товщини покриття. Гарантійний лист є частиною пакету закривних документів.',
  },
  {
    q: 'Чи працюєте ви з фізичними особами?',
    a: 'Так, беремо замовлення як від юридичних, так і від фізичних осіб. Укладаємо офіційний договір у будь-якому випадку.',
  },
  {
    q: 'Який мінімальний об\'єм робіт?',
    a: 'Для асфальтування — від 50 м², для ямкового ремонту — від 1 м². Дзвоніть навіть із невеликим об\'єктом — ми знайдемо рішення.',
  },
  {
    q: 'Чи надаєте договір і закривні документи?',
    a: 'Так, обов\'язково. Після виконання робіт надаємо акт виконаних робіт, гарантійний лист і всі необхідні закривні документи для бухгалтерії.',
  },
]

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="border-b border-brand-muted last:border-0">
      <button
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-center justify-between gap-4 py-5 text-left group"
      >
        <span className="text-white text-base font-semibold group-hover:text-brand-yellow transition-colors">
          {q}
        </span>
        <svg
          className={`w-5 h-5 text-brand-yellow flex-shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <p className="text-gray-400 text-sm leading-relaxed pb-5">
          {a}
        </p>
      )}
    </div>
  )
}

export default function FAQ() {
  return (
    <section id="faq" className="py-16 md:py-24 bg-brand-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-10 md:mb-14">
          <span className="text-brand-yellow text-sm font-semibold uppercase tracking-widest">FAQ</span>
          <h2 className="section-heading mt-2">Часті запитання</h2>
          <p className="section-subheading mx-auto">
            Відповіді на найпоширеніші запитання від наших клієнтів.
          </p>
        </div>

        {/* Accordion */}
        <div className="max-w-3xl mx-auto bg-brand-gray rounded-2xl border border-brand-muted px-6 md:px-8">
          {faqs.map((item, i) => (
            <FAQItem key={i} q={item.q} a={item.a} />
          ))}
        </div>

      </div>
    </section>
  )
}
