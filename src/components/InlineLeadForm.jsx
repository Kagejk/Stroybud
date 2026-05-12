import { useLeadForm } from '../hooks/useLeadForm'

const inputClass =
  'w-full bg-brand-dark border border-brand-muted rounded-lg px-4 py-3 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-brand-yellow transition-colors disabled:opacity-50'

export default function InlineLeadForm({ label = 'Залишити заявку', serviceName = 'Загальна заявка' }) {
  const { form, status, phoneError, handleChange, handleSubmit, reset } = useLeadForm(serviceName)
  const loading = status === 'loading'

  if (status === 'success') {
    return (
      <div className="mt-10 text-center py-6">
        <p className="text-white font-semibold text-lg">✅ Дякуємо! Ми зателефонуємо вам найближчим часом.</p>
        <button onClick={reset} className="mt-3 text-brand-yellow text-sm hover:underline">
          Надіслати ще раз
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="mt-10">
      <p className="text-white text-lg font-bold text-center mb-5">{label}</p>
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
            className={`${inputClass} ${phoneError ? 'border-red-500 focus:border-red-500' : ''}`}
          />
          {phoneError && <p className="text-red-400 text-xs mt-1">{phoneError}</p>}
        </div>

        {/* Submit */}
        <button
          type="submit" disabled={loading}
          className="btn-primary whitespace-nowrap disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 py-3 px-7 flex-shrink-0"
        >
          {loading ? (
            <>
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
              Надсилаємо…
            </>
          ) : 'Надіслати'}
        </button>
      </div>

      {status === 'error' && (
        <p className="text-red-400 text-xs text-center mt-2">Сталася помилка. Спробуйте ще раз.</p>
      )}
    </form>
  )
}
