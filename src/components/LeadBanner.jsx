import { useLeadForm } from '../hooks/useLeadForm'

const inputClass =
  'w-full bg-brand-dark border border-brand-dark/30 rounded-lg px-4 py-3 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-brand-dark transition-colors disabled:opacity-50'

function BannerForm() {
  const { form, status, phoneError, handleChange, handleSubmit, reset } = useLeadForm('LeadBanner')
  const loading = status === 'loading'

  if (status === 'success') {
    return (
      <div className="text-center py-4">
        <p className="text-brand-dark font-bold text-lg">✅ Дякуємо! Зателефонуємо найближчим часом.</p>
        <button onClick={reset} className="mt-2 text-brand-dark/70 text-sm hover:underline">
          Надіслати ще раз
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto">

        {/* Name */}
        <div className="flex-1 min-w-0">
          <input
            type="text" name="name" value={form.name}
            onChange={handleChange} required disabled={loading}
            placeholder="Ваше ім'я" className={inputClass}
          />
        </div>

        {/* Phone */}
        <div className="flex-1 min-w-0">
          <input
            type="tel" name="phone" value={form.phone}
            onChange={handleChange} required disabled={loading}
            placeholder="380XXXXXXXXX" inputMode="numeric"
            className={`${inputClass} ${phoneError ? 'border-red-400' : ''}`}
          />
          {phoneError && <p className="text-red-700 text-xs mt-1">{phoneError}</p>}
        </div>

        {/* Submit */}
        <button
          type="submit" disabled={loading}
          className="bg-brand-dark text-white font-bold px-7 py-3 rounded-md hover:bg-brand-dark/90 transition-colors disabled:opacity-60 whitespace-nowrap flex items-center gap-2 justify-center flex-shrink-0"
        >
          {loading ? (
            <>
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
              Надсилаємо…
            </>
          ) : 'Отримати консультацію'}
        </button>
      </div>

      {status === 'error' && (
        <p className="text-red-700 text-xs text-center mt-2">Сталася помилка. Спробуйте ще раз.</p>
      )}
    </form>
  )
}

export default function LeadBanner({
  heading = 'Залиште заявку — зателефонуємо протягом 30 хвилин',
  sub = 'Безкоштовний виїзд та консультація. Фіксована ціна в договорі.',
}) {
  return (
    <section className="py-14 md:py-20 bg-brand-yellow relative overflow-hidden">
      {/* Decorative stripes */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{ backgroundImage: 'repeating-linear-gradient(-45deg, #000 0, #000 1px, transparent 0, transparent 50%)', backgroundSize: '12px 12px' }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-brand-dark font-black text-2xl sm:text-3xl md:text-4xl uppercase leading-tight mb-3">
          {heading}
        </h2>
        <p className="text-brand-dark/70 text-base mb-8">{sub}</p>
        <BannerForm />
      </div>
    </section>
  )
}
