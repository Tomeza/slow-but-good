import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const isDev = process.env.NODE_ENV === 'development'

// ============================================
// 簡易レート制限（インメモリ）
// 注意: Vercelでは各インスタンス独立のため完全ではない
// 本格運用時は Upstash Rate Limit への移行を推奨
// ============================================
const RATE_LIMIT_WINDOW = 60 * 1000 // 1分
const RATE_LIMIT_MAX = 3 // 1分あたり3リクエスト
const ipRequestMap = new Map<string, { count: number; resetTime: number }>()

function getClientIp(request: NextRequest): string {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    '127.0.0.1'
  )
}

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const record = ipRequestMap.get(ip)

  if (!record || now > record.resetTime) {
    ipRequestMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW })
    return false
  }

  record.count++
  return record.count > RATE_LIMIT_MAX
}

// バリデーション定数
const MAX_NAME_LENGTH = 100
const MAX_EMAIL_LENGTH = 320
const MAX_MESSAGE_LENGTH = 5000
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const resend = new Resend(process.env.RESEND_API_KEY)

type ContactRequest = {
  name: string
  email: string
  message: string
  honeypot?: string
}

export async function POST(request: NextRequest) {
  // レート制限チェック
  const ip = getClientIp(request)
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: '送信回数の上限に達しました。しばらくしてからお試しください。' },
      { status: 429 }
    )
  }

  try {
    const body: ContactRequest = await request.json()
    const { name, email, message, honeypot } = body

    // Honeypot check
    if (honeypot) {
      return NextResponse.json({ success: true })
    }

    // バリデーション（一般化されたエラーメッセージ）
    const trimmedName = typeof name === 'string' ? name.trim() : ''
    const trimmedEmail = typeof email === 'string' ? email.trim() : ''
    const trimmedMessage = typeof message === 'string' ? message.trim() : ''

    if (!trimmedName || trimmedName.length > MAX_NAME_LENGTH) {
      return NextResponse.json(
        { error: '入力内容をご確認ください' },
        { status: 400 }
      )
    }

    if (
      !trimmedEmail ||
      trimmedEmail.length > MAX_EMAIL_LENGTH ||
      !EMAIL_REGEX.test(trimmedEmail)
    ) {
      return NextResponse.json(
        { error: '入力内容をご確認ください' },
        { status: 400 }
      )
    }

    if (!trimmedMessage || trimmedMessage.length > MAX_MESSAGE_LENGTH) {
      return NextResponse.json(
        { error: '入力内容をご確認ください' },
        { status: 400 }
      )
    }

    // Send email (development時はスキップ)
    if (isDev) {
      console.log('[DEV] メール送信スキップ:', {
        to: 'info@saotomeno.com',
        from: trimmedName,
        email: trimmedEmail,
        message: trimmedMessage.slice(0, 100) + (trimmedMessage.length > 100 ? '...' : ''),
      })
      return NextResponse.json({ success: true })
    }

    const { error } = await resend.emails.send({
      from: 'noreply@saotomeno.com',
      to: 'info@saotomeno.com',
      subject: `[slow but good] ${trimmedName}様からのお問い合わせ`,
      text: `お名前: ${trimmedName}\nメールアドレス: ${trimmedEmail}\n\nメッセージ:\n${trimmedMessage}`,
      replyTo: trimmedEmail,
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json(
        { error: '送信に失敗しました。しばらくしてからお試しください。' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact API error:', error)
    return NextResponse.json(
      { error: '送信に失敗しました。しばらくしてからお試しください。' },
      { status: 500 }
    )
  }
}
