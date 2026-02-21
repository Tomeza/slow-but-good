/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          // クリックジャッキング防止
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          // MIMEスニッフィング防止
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          // リファラー制御
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          // 機能制限（カメラ、マイク等）
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
          // HSTS（HTTPS強制）
          // 注意: HTTPSでない環境では問題が起きる可能性あり
          // Vercelは自動HTTPS対応のため有効化推奨
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains',
          },
          // ============================================
          // CSP: 本適用中
          // ============================================
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' data: https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self'; frame-ancestors 'none';",
          },
        ],
      },
    ]
  },
}

export default nextConfig
