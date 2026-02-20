import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

type ContactRequest = {
  name: string
  email: string
  message: string
  honeypot?: string
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactRequest = await request.json()
    const { name, email, message, honeypot } = body

    // Honeypot check
    if (honeypot) {
      return NextResponse.json({ success: true })
    }

    // Validation
    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      return NextResponse.json(
        { error: 'お名前を入力してください' },
        { status: 400 }
      )
    }

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json(
        { error: '有効なメールアドレスを入力してください' },
        { status: 400 }
      )
    }

    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return NextResponse.json(
        { error: 'メッセージを入力してください' },
        { status: 400 }
      )
    }

    // Send email
    const { error } = await resend.emails.send({
      from: 'noreply@saotomeno.com',
      to: 'info@saotomeno.com',
      subject: `[slow but good] ${name}様からのお問い合わせ`,
      text: `お名前: ${name}\nメールアドレス: ${email}\n\nメッセージ:\n${message}`,
      replyTo: email,
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
