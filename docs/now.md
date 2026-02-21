# now — 作業ログ

## 2026-02-15: 初期構築完了

### 完了したこと

- Next.js 14.2.35 + React 18 + Tailwind CSS 3 でプロジェクト作成
- モックHTML（`slow-but-good-v2.html`）に準拠したデザイン実装
- 全セクション実装: Hero / About / Tools / Writing / Contact / Footer
- スクロールアニメーション（Intersection Observer）
- フォント: Fraunces + Shippori Mincho（next/font/google）
- SEO: メタタグ、OGP、Twitter Card、JSON-LD（Person）、sitemap、robots.txt
- MDX記事基盤（`lib/mdx.ts` + `app/writing/[slug]/page.tsx`）
- GitHubリポジトリにプッシュ済み

### 変更点（指示書との差分）

- Shippori Mincho の weight 300 は Google Fonts で利用不可 → 400/500 に変更

## 2026-02-17: Vercel デプロイ完了

- Vercel デプロイ確認済み: https://slow-but-good.vercel.app/

### 未着手

- Formspree または Vercel Functions によるフォーム送信機能
- OGP画像（`public/og-image.png`）作成
- 独自ドメイン設定
- MDX記事の執筆
- ~~metadataBase のドメイン設定~~ → 完了（slow-but-good.vercel.app に設定済み）

## 2026-02-22: セキュリティ対応 + CI構築

### 完了したこと

- **Contact フォーム実装**: Resend API でメール送信
- **セキュリティ対策**:
  - レート制限（1分3回/IP）
  - 入力バリデーション（name 100 / email 320 / message 5000）
  - セキュリティヘッダー（X-Frame-Options, HSTS, X-Content-Type-Options, Referrer-Policy, Permissions-Policy）
  - CSP 本適用（Report-Only で検証後）
  - Honeypot スパム対策
- **Honeypot 誤爆問題の解決**: ブラウザ autofill が `name="website"` を埋める → `name="confirm_email_z"` + `autoComplete="new-password"` で回避
- **Playwright API テスト**: 正常送信 / バリデーション失敗 / レート制限の3ケース
- **GitHub Actions CI**: build 常時実行 + contact 関連変更時のみ test-api 実行
- **Favicon 追加**: app/icon.png + public/apple-touch-icon.png
- **本番確認**: Vercel デプロイ、CSP・レート制限動作確認済み

### 技術メモ

- Resend 初期化を遅延化（ビルド時に API キー不要に）
- ローカル開発時はメール送信スキップ（`[DEV]` ログ出力）
- IP 取得: x-forwarded-for → x-real-ip → 127.0.0.1 フォールバック
