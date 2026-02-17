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
