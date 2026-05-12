import { useState } from 'react'

const BOT_TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN

function validatePhone(digits) {
  if (!digits.startsWith('380')) return 'Номер повинен починатися з 380'
  if (digits.length !== 12) return 'Введіть 9 цифр після 380'
  return ''
}

export function useLeadForm(serviceName = 'Загальна заявка') {
  const [form,       setForm]       = useState({ name: '', phone: '380' })
  const [status,     setStatus]     = useState('idle') // 'idle' | 'loading' | 'success' | 'error'
  const [phoneError, setPhoneError] = useState('')

  const handleChange = e => {
    const { name, value } = e.target
    if (name === 'phone') {
      const digits = value.replace(/\D/g, '').slice(0, 12)
      const safe = digits.startsWith('380') ? digits : '380'
      setForm(prev => ({ ...prev, phone: safe }))
      setPhoneError(safe.length > 3 ? validatePhone(safe) : '')
    } else {
      setForm(prev => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = async e => {
    e.preventDefault()
    const err = validatePhone(form.phone)
    if (err) { setPhoneError(err); return }
    setStatus('loading')

    const chatId = import.meta.env.VITE_TELEGRAM_CHAT_ID

    const dateStr = new Date().toLocaleString('uk-UA', {
      timeZone: 'Europe/Kiev',
      day: '2-digit', month: '2-digit', year: 'numeric',
      hour: '2-digit', minute: '2-digit',
    })

    const text =
      `🔔 Нова заявка з сайту!\n\n` +
      `👤 Ім'я: ${form.name}\n` +
      `📞 Телефон: ${form.phone}\n` +
      `🛣️ Послуга: ${serviceName}\n\n` +
      `🌐 ${window.location.href}\n` +
      `🕐 ${dateStr}`

    const payload = { chat_id: chatId, text }

    console.log('Telegram chat ID:', chatId)
    console.log('Telegram request payload:', payload)

    try {
      const res  = await fetch(
        `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
        {
          method:  'POST',
          headers: { 'Content-Type': 'application/json' },
          body:    JSON.stringify(payload),
        },
      )
      const data = await res.json()
      console.log('Telegram API response:', data)

      if (!data.ok) throw new Error(data.description ?? 'telegram_error')

      const sheetsUrl = import.meta.env.VITE_SHEETS_WEBHOOK_URL
      if (sheetsUrl) {
        fetch(sheetsUrl, {
          method: 'POST',
          mode: 'no-cors',
          body: JSON.stringify({
            name: form.name,
            phone: form.phone,
            service: serviceName,
            url: window.location.href,
          }),
        }).catch(err => console.warn('[Sheets]', err.message))
      }

      setStatus('success')
      setForm({ name: '', phone: '380' })
      setPhoneError('')
    } catch (err) {
      console.error('[useLeadForm] Telegram error:', err.message)
      setStatus('error')
    }
  }

  const reset = () => { setStatus('idle'); setPhoneError('') }

  return { form, status, phoneError, handleChange, handleSubmit, reset }
}
