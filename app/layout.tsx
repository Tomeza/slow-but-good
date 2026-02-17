import type { Metadata } from 'next'
import { Fraunces, Shippori_Mincho } from 'next/font/google'
import './globals.css'

const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['300', '400'],
  variable: '--font-display',
  display: 'swap',
})

const shipporiMincho = Shippori_Mincho({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-body',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://slow-but-good.vercel.app'),
  title: 'slow but good — 早乙女貴昭',
  description:
    'デザインを30年ほど。道具も環境も時代と一緒に変わりました。今はAIと暮らしています。',
  openGraph: {
    title: 'slow but good',
    description: 'Good things take time. I take more.',
    type: 'website',
    locale: 'ja_JP',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'slow but good',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'slow but good',
    description: 'Good things take time. I take more.',
    images: ['/og-image.png'],
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: '早乙女貴昭',
  jobTitle: 'デザイナー',
  worksFor: {
    '@type': 'Organization',
    name: '有限会社さおとめの事務所',
  },
  knowsAbout: [
    'グラフィックデザイン',
    '日本語組版',
    'DTP',
    'Webアプリケーション開発',
    'AI活用',
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja" className={`${fraunces.variable} ${shipporiMincho.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
