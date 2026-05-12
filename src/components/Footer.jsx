const footerLinks = [
  { label: 'Послуги',     href: '#services' },
  { label: 'Переваги',    href: '#advantages' },
  { label: 'Результати',  href: '#projects' },
  { label: 'Як працюємо', href: '#about' },
  { label: 'Портфоліо',   href: '#projects' },
  { label: 'Контакти',    href: '#contact' },
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
                <a href="tel:+380000000000" className="text-gray-500 hover:text-brand-yellow text-sm transition-colors block">
                  +380 XX XXX XX XX
                </a>
              </li>
              <li>
                <a href="mailto:info@stroybud.ua" className="text-gray-500 hover:text-brand-yellow text-sm transition-colors block">
                  info@stroybud.ua
                </a>
              </li>
              <li className="text-gray-500 text-sm">
                вул. Будівельна, 58, Україна
              </li>
              <li className="text-gray-500 text-sm">
                Пн–Пт: 8:00–18:00
              </li>
            </ul>
          </div>
        </div>

        {/* Google Maps */}
        <div className="mt-8 md:mt-10 rounded-2xl overflow-hidden border border-brand-muted h-48">
          <iframe
            src="https://www.google.com/maps?q=53.3660601,-6.4893507&z=15&output=embed"
            width="100%" height="100%"
            style={{ border: 0 }}
            allowFullScreen loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Наше місцезнаходження"
          />
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
