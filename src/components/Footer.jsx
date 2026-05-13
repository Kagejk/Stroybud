const footerLinks = [
  { label: 'Послуги',     href: '#services' },
  { label: 'Переваги',    href: '#advantages' },
  { label: 'Результати',  href: '#projects' },
  { label: 'Як працюємо', href: '#about' },
  { label: 'Портфоліо',   href: '#projects' },
]

export default function Footer() {
  return (
    <footer className="bg-brand-gray border-t border-brand-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-10">

          {/* Brand */}
          <div className="sm:col-span-2 md:col-span-1">
            <a href="#hero" className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 bg-brand-yellow rounded-sm flex items-center justify-center flex-shrink-0">
                <span className="text-brand-dark font-black text-sm tracking-tight">SB</span>
              </div>
              <span className="text-white font-bold text-lg tracking-wide">STROYBUD 58</span>
            </a>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
              Надійний підрядник з асфальтування та благоустрою. Якість, терміни, гарантія.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-white text-sm font-semibold uppercase tracking-wider mb-4">Навігація</h4>
            <ul className="space-y-2">
              {footerLinks.map(link => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-gray-500 hover:text-brand-yellow text-sm transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <h4 className="text-white text-sm font-semibold uppercase tracking-wider mb-4">Контакти</h4>
            <ul className="space-y-3">
              <li>
                <a href="tel:+380960600060" className="flex items-center gap-2 text-gray-500 hover:text-brand-yellow text-sm transition-colors">
                  <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  +380 96 060 00 60
                </a>
              </li>
              <li>
                <a href="mailto:stroybud582014@ukr.net" className="flex items-center gap-2 text-gray-500 hover:text-brand-yellow text-sm transition-colors">
                  <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  stroybud582014@ukr.net
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/58_stroybud?igsh=MWdtdnVnN3NvdTE4OA%3D%3D&utm_source=qr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-500 hover:text-brand-yellow text-sm transition-colors"
                >
                  <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  @58_stroybud
                </a>
              </li>
              <li className="text-gray-500 text-sm">
                Пн–Пт: 8:00–18:00
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-brand-muted mt-8 md:mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-gray-600 text-xs text-center sm:text-left">
            © {new Date().getFullYear()} Стройбуд. Усі права захищено.
          </p>
          <p className="text-gray-700 text-xs text-center sm:text-right">
            Асфальтування на замовлення по всій Україні
          </p>
        </div>
      </div>
    </footer>
  )
}
