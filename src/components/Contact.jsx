import { useLeadForm } from '../hooks/useLeadForm'

const contactDetails = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
        />
      </svg>
    ),
    label: 'Телефон',
    value: '+38 (095) 758-00-00',
    href: 'tel:+380957580000',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    ),
    label: 'Email',
    value: 'info@stroybud.ua',
    href: 'mailto:info@stroybud.ua',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
        />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    label: 'Адреса',
    value: 'вул. Будівельна, 58, Україна',
    href: null,
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    label: 'Режим роботи',
    value: 'Пн–Пт: 8:00–18:00 | Сб: 9:00–15:00',
    href: null,
  },
]

const inputClass =
  'w-full bg-brand-dark border border-brand-muted rounded-lg px-4 py-3 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-brand-yellow transition-colors disabled:opacity-50'

export default function Contact() {
  const { form, status, phoneError, handleChange, handleSubmit, reset } = useLeadForm('Загальна заявка')
  const loading = status === 'loading'

  return (
    <section id="contact" className="py-16 md:py-24 bg-brand-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <div className="text-center mb-10 md:mb-16">
          <span className="text-brand-yellow text-sm font-semibold uppercase tracking-widest">Зв'язок</span>
          <h2 className="section-heading mt-2">Зв'яжіться з нами</h2>
          <p className="section-subheading mx-auto">
            Залиште заявку і наш менеджер зв'яжеться з вами протягом 30 хвилин.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">

          {/* Form card */}
          <div className="bg-brand-gray rounded-2xl p-5 sm:p-8 border border-brand-muted">
            <h3 className="text-white text-lg sm:text-xl font-bold mb-5 sm:mb-6">Залишити заявку</h3>

            {status === 'success' ? (
              <div className="text-center py-10">
                <div className="text-5xl mb-4">✅</div>
                <p className="text-white font-semibold text-lg">Дякуємо! Ми зателефонуємо вам найближчим часом.</p>
                <button onClick={reset} className="mt-6 text-brand-yellow text-sm hover:underline">
                  Надіслати ще одну заявку
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Ваше ім'я *</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    disabled={loading}
                    placeholder="Іван Петренко"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className="block text-gray-400 text-sm mb-2">Номер телефону *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    required
                    disabled={loading}
                    placeholder="380XXXXXXXXX"
                    inputMode="numeric"
                    className={`${inputClass} ${phoneError ? 'border-red-500 focus:border-red-500' : ''}`}
                  />
                  {phoneError && (
                    <p className="text-red-400 text-xs mt-1">{phoneError}</p>
                  )}
                </div>

                {status === 'error' && (
                  <p className="text-red-400 text-sm">
                    Сталася помилка. Спробуйте ще раз або зателефонуйте нам напряму.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full text-center text-base py-4 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
            )}
          </div>

          {/* Contact info + map */}
          <div className="flex flex-col gap-6">
            <div className="bg-brand-gray rounded-2xl p-5 sm:p-8 border border-brand-muted">
              <h3 className="text-white text-lg sm:text-xl font-bold mb-5 sm:mb-6">Контактна інформація</h3>
              <ul className="space-y-4 sm:space-y-5">
                {contactDetails.map((item, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <span className="w-10 h-10 flex-shrink-0 rounded-lg bg-brand-yellow/10 text-brand-yellow flex items-center justify-center">
                      {item.icon}
                    </span>
                    <div>
                      <p className="text-gray-500 text-xs mb-1">{item.label}</p>
                      {item.href ? (
                        <a href={item.href} className="text-white text-sm font-medium hover:text-brand-yellow transition-colors">
                          {item.value}
                        </a>
                      ) : (
                        <span className="text-white text-sm font-medium">{item.value}</span>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Google Maps */}
            <div className="bg-brand-gray rounded-2xl border border-brand-muted overflow-hidden flex-1 min-h-[220px]">
              <iframe
                src="https://www.google.com/maps?q=53.3660601,-6.4893507&z=15&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '220px' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Наше місцезнаходження"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
