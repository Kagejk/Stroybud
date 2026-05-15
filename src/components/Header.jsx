import { useState } from 'react'

const navLinks = [
  { label: 'Послуги',     href: '#services' },
  { label: 'Переваги',    href: '#advantages' },
  { label: 'Як працюємо', href: '#steps' },
  { label: 'До / Після',  href: '#results' },
  { label: 'Портфоліо',   href: '#projects' },
  { label: 'FAQ',         href: '#faq' },
]

export default function Header({ onOpenModal }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-brand-dark border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <a href="#hero" className="flex items-center gap-3 flex-shrink-0">
            <img src="/images/Logo.jpg" alt="Stroybud 58" className="w-10 h-10 rounded-full object-cover flex-shrink-0" />
            <span className="text-white font-bold text-lg tracking-wide">STROYBUD 58</span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map(link => (
              <a
                key={link.label}
                href={link.href}
                className="text-gray-300 hover:text-white text-sm font-medium transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Phone + CTA */}
          <div className="hidden lg:flex items-center gap-5">
            <a
              href="tel:+380960600060"
              className="flex items-center gap-2 text-brand-yellow text-sm font-medium hover:text-yellow-300 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              +380 96 060 00 60
            </a>
            <button onClick={onOpenModal} className="btn-primary text-sm px-5 py-2.5">
              Розрахувати вартість
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-white"
            aria-label="Меню"
          >
            {isOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="lg:hidden bg-brand-gray border-t border-brand-muted pb-4">
            {navLinks.map(link => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block px-4 py-3 text-gray-300 hover:text-white text-sm font-medium transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="px-4 pt-3 flex flex-col gap-3">
              <a href="tel:+380960600060" className="flex items-center gap-2 text-brand-yellow text-sm font-medium">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                +380 96 060 00 60
              </a>
              <button onClick={() => { onOpenModal(); setIsOpen(false) }} className="btn-primary text-sm text-center">
                Розрахувати вартість
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
