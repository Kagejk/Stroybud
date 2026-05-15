export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')

  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' })
  }

  const { name, phone, service, url, website } = req.body ?? {}

  if (website) return res.json({ ok: true })

  const digits = (phone ?? '').replace(/\D/g, '')
  if (!/^380\d{9}$/.test(digits)) {
    return res.status(400).json({ ok: false, error: 'Invalid phone' })
  }

  const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN
  const CHAT_ID   = process.env.TELEGRAM_CHAT_ID

  const date = new Date().toLocaleString('uk-UA', {
    timeZone: 'Europe/Kiev',
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  })

  const text =
    `Нова заявка з сайту!\n\n` +
    `Ім'я: ${String(name).slice(0, 100)}\n` +
    `Телефон: ${digits}\n` +
    `Послуга: ${String(service).slice(0, 100)}\n\n` +
    `${String(url).slice(0, 200)}\n${date}`

  const telegramRes = await fetch(
    `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: CHAT_ID, text }),
    }
  )

  const data = await telegramRes.json()
  return res.json(data)
}
