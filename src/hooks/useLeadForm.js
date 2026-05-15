import { useState } from 'react'

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

    try {
      const res  = await fetch('/api/proxy', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({
          name:    form.name,
          phone:   form.phone,
          service: serviceName,
          url:     window.location.href,
          website: '', // honeypot — always empty for real users
        }),
      })
      const data = await res.json()

      if (!data.ok) throw new Error(data.error ?? 'proxy_error')

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
        }).catch(() => {})
      }

      setStatus('success')
      setForm({ name: '', phone: '380' })
      setPhoneError('')
    } catch {
      setStatus('error')
    }
  }

  const reset = () => { setStatus('idle'); setPhoneError('') }

  return { form, status, phoneError, handleChange, handleSubmit, reset }
}
