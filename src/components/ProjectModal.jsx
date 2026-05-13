import { useEffect } from 'react'
import { useLeadForm } from '../hooks/useLeadForm'

const inputClass =
  'w-full bg-brand-dark border border-brand-muted rounded-lg px-4 py-3 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-brand-yellow transition-colors disabled:opacity-50'

export default function ProjectModal({ project, onClose }) {
  const isOpen = !!project
  const { form, status, phoneError, handleChange, handleSubmit, reset } = useLeadForm(
    project ? `Портфоліо — ${project.title}` : 'Портфоліо'
  )
  const loading = status === 'loading'

  useEffect(() => {
    const onKey = e => { if (e.key === 'Escape') handleClose() }
    if (isOpen) document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [isOpen])

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  if (!project) return null

  const handleClose = () => { reset(); onClose() }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={handleClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" />

      {/* Card */}
      <div
        className="relative z-10 w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-brand-gray border border-brand-muted rounded-2xl shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 flex items-center justify-center text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-white/10 bg-brand-dark/60"
          aria-label="Закрити"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">

          {/* Photo */}
          <div className="relative h-56 md:h-full min-h-[220px]">
            <img
              src={project.img}
              alt={project.title}
              className="w-full h-full object-cover rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none flex flex-col justify-end p-5">
              <span className="inline-block text-brand-yellow text-xs font-semibold uppercase tracking-wider bg-black/40 px-2 py-1 rounded mb-2 w-fit">
                {project.category}
              </span>
              {project.area !== '—' && (
                <p className="text-white/80 text-xs">Площа: {project.area}</p>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="p-6 md:p-8 flex flex-col">

            {status === 'success' ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center py-6">
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
                {/* Project info */}
                <div className="mb-6">
                  <h2 className="text-white font-bold text-xl mb-3">{project.title}</h2>
                  <p className="text-gray-400 text-sm leading-relaxed">{project.desc}</p>
                </div>

                <div className="border-t border-brand-muted mb-6" />

                {/* Form */}
                <div className="mt-auto">
                  <p className="text-white text-sm font-semibold mb-4">Хочете подібний проєкт? Залишіть заявку</p>
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
