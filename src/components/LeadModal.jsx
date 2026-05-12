import { useEffect } from 'react'
import { useLeadForm } from '../hooks/useLeadForm'

const inputClass =
  'w-full bg-brand-dark border border-brand-muted rounded-lg px-4 py-3 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-brand-yellow transition-colors disabled:opacity-50'

export default function LeadModal({ isOpen, onClose, serviceName = 'Модальна форма' }) {
  const { form, status, phoneError, handleChange, handleSubmit, reset } = useLeadForm(serviceName)
  const loading = status === 'loading'

  useEffect(() => {
    const onKey = e => { if (e.key === 'Escape') onClose() }
    if (isOpen) document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [isOpen, onClose])

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  if (!isOpen) return null

  const handleClose = () => { reset(); onClose() }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={handleClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* Card */}
      <div
        className="relative z-10 w-full max-w-md bg-brand-gray border border-brand-muted rounded-2xl p-8 shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-white/5"
          aria-label="Закрити"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {status === 'success' ? (
          <div className="text-center py-6">
            <div className="w-14 h-14 bg-brand-yellow/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-7 h-7 text-brand-yellow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-white font-bold text-xl mb-2">Заявку отримано!</p>
            <p className="text-gray-400 text-sm mb-6">Зателефонуємо протягом 30 хвилин.</p>
            <button onClick={handleClose} className="btn-primary px-8 py-3">
              Закрити
            </button>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <h2 className="text-white font-bold text-2xl mb-1">Залишити заявку</h2>
              <p className="text-gray-400 text-sm">Безкоштовний виїзд та консультація</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
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
                className="w-full btn-primary py-3.5 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
            </form>
          </>
        )}
      </div>
    </div>
  )
}
