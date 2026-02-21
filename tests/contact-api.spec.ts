import { test, expect, request } from '@playwright/test'

const BASE_URL = process.env.BASE_URL ?? 'http://localhost:3000'

function validPayload(
  overrides: Partial<{
    name: string
    email: string
    message: string
    honeypot: string
  }> = {}
) {
  return {
    name: 'テスト太郎',
    email: 'taro@example.com',
    message: 'テスト送信です。',
    honeypot: '', // スパム対策フィールド（空のまま）
    ...overrides,
  }
}

test.describe('/api/contact 最小セキュリティテスト', () => {
  test('正常送信: 正しい入力で成功する', async () => {
    const api = await request.newContext({ baseURL: BASE_URL })

    const res = await api.post('/api/contact', {
      data: validPayload(),
    })

    expect(res.status()).toBe(200)
    const body = await res.json()
    expect(body.success).toBe(true)
  })

  test('バリデーション失敗: 不正emailを400で拒否する', async () => {
    const api = await request.newContext({ baseURL: BASE_URL })

    const res = await api.post('/api/contact', {
      data: validPayload({ email: 'test@' }),
    })

    expect(res.status()).toBe(400)
    const body = await res.json()
    expect(body.error).toContain('入力内容をご確認ください')

    // 内部情報漏えい防止
    const bodyText = JSON.stringify(body)
    expect(bodyText).not.toMatch(/stack|exception|Resend/i)
  })

  test('レート制限: 4回目で429', async () => {
    // ユニークIPをシミュレート（テスト実行ごとに異なるIP）
    const testIp = `203.0.113.${Math.floor(Math.random() * 255)}`

    const api = await request.newContext({
      baseURL: BASE_URL,
      extraHTTPHeaders: {
        'x-forwarded-for': testIp,
      },
    })

    // 1〜3回目: レート制限には引っかからない
    // 注意: Resend APIキーがテスト用の場合500を返すことがある
    for (let i = 0; i < 3; i++) {
      const res = await api.post('/api/contact', {
        data: validPayload({ email: `taro+${i}@example.com` }),
      })
      // レート制限(429)でないことを確認
      expect(res.status()).not.toBe(429)
    }

    // 4回目は429想定（レート制限発動）
    const blocked = await api.post('/api/contact', {
      data: validPayload({ email: 'taro+blocked@example.com' }),
    })

    expect(blocked.status()).toBe(429)
    const body = await blocked.json()
    expect(body.error).toContain('送信回数の上限')
  })
})
