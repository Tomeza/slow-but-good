# slow but good — プロジェクト構築指示書

## 概要

個人サイト「slow but good」を Next.js で構築する。
デザインモック（HTML）は完成済み。これを Next.js プロジェクトに移行する。

## デザインモック

同梱の `slow-but-good-v2.html` が確定デザイン。
フォント、配色、レイアウト、コピーはすべてこのファイルに準拠すること。

## 技術スタック

| 項目 | 選定 | 備考 |
|------|------|------|
| フレームワーク | Next.js 14.2.35 | CVE-2025-55183/55184 対応済み安定版 |
| React | 18.x（最新stable） | React 19 は使わない（RSC 関連 CVE 回避） |
| スタイリング | Tailwind CSS 3.x | モックの CSS を Tailwind に移行 |
| 記事管理 | MDX + next-mdx-remote | content/ 配下の MDX ファイルを Git 管理 |
| フォーム | Formspree または Vercel Functions | 問い合わせフォーム送信用 |
| ホスティング | Vercel | GitHub 連携で自動デプロイ |
| ソース管理 | GitHub（private repo） | |

## セキュリティ要件

- **Next.js は 14.2.35 を使用すること**（CVE 対応版）
- React 19 は使用しない（CVE-2025-55182 RCE の影響範囲）
- 依存パッケージは `npm audit` で確認し、既知の脆弱性がないことを確認
- 環境変数にシークレットを含める場合は `.env.local` を使用し、Git にコミットしない

## ディレクトリ構成

```
slow-but-good/
├── app/
│   ├── layout.tsx            # 共通レイアウト（フォント、メタデータ、フッター）
│   ├── page.tsx              # トップページ（1ページ構成）
│   ├── globals.css           # Tailwind + カスタムスタイル
│   └── writing/
│       └── [slug]/
│           └── page.tsx      # 個別記事ページ（将来用）
├── components/
│   ├── Hero.tsx              # ヒーローセクション
│   ├── About.tsx             # 自己紹介
│   ├── Tools.tsx             # ツール一覧
│   ├── Writing.tsx           # 記事一覧（将来用）
│   ├── ContactForm.tsx       # 問い合わせフォーム
│   ├── Footer.tsx            # フッター
│   ├── SectionLabel.tsx      # セクションラベル共通コンポーネント
│   ├── Divider.tsx           # 区切り線
│   └── ScrollReveal.tsx      # スクロールアニメーション
├── content/
│   └── writing/              # MDX 記事ファイル置き場
│       └── .gitkeep
├── lib/
│   └── mdx.ts               # MDX 読み込みユーティリティ
├── public/
│   └── og-image.png          # OGP 画像（後日作成）
├── tailwind.config.ts
├── next.config.mjs
├── package.json
└── tsconfig.json
```

## デザイン仕様

### フォント

- 英語見出し: **Fraunces**（Google Fonts、weight: 300, 400）
- 日本語本文: **Shippori Mincho**（Google Fonts、weight: 300, 400）
- next/font/google を使って読み込む

```tsx
// app/layout.tsx での読み込み例
import { Fraunces, Shippori_Mincho } from 'next/font/google'

const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['300', '400'],
  variable: '--font-display',
  display: 'swap',
})

const shipporiMincho = Shippori_Mincho({
  subsets: ['latin'],
  weight: ['300', '400'],
  variable: '--font-body',
  display: 'swap',
})
```

### 配色（Color B）

```css
--black: #1c1c1c;
--white: #f7f7f5;        /* 背景色 */
--accent: #2c5a8a;       /* for you のブルー */
--gray: #919191;          /* 本文テキスト */
--light-gray: #d8d8d6;   /* ラベル、区切り線 */
```

### レイアウト

- 左右パディング: 8vw（モバイル: 6vw）
- セクション上下パディング: 8rem（モバイル: 5rem）
- 各セクション間に `<Divider />` を配置
- max-width は設けない（左寄せ、右側は余白）

### アニメーション

- ヒーロー: CSS animation（fadeUp、時差あり）
- 各セクション: Intersection Observer でスクロール時に fadeUp
- 控えめに。duration: 0.8s、ease-out

## コンテンツ（確定済み）

### Hero

```
タイトル: slow but good
タグライン: Good things take time. I take more.
アクセント: for you.（小さく、左に短い横線付き、ブルー）
```

### About

```
名前: 早乙女 貴昭
会社名: 有限会社さおとめの事務所
本文: デザインを30年ほど。道具も環境も時代と一緒に変わりました。今はAIと暮らしています。
```

### Tools

```
グループ1:
  名前: InDesign / Illustrator / Photoshop
  説明: 紙とインクの世界。一番長い付き合いです。

グループ2:
  名前: Next.js / Supabase / Vercel
  説明: 現場で使えるアプリをつくります。私も使ってます。

グループ3:
  名前: Claude / ChatGPT
  説明: AIで、あなたの面倒を減らします。ついでに私のも。
```

### Writing

```
準備中。ゆっくりですが、書きます。
```

### Contact

```
導入文: お仕事のご相談、お気軽にどうぞ。
フォーム: Name / Email / Message / Send ボタン
```

### Footer

```
左: 有限会社さおとめの事務所
右: © 2026
```

## MDX 記事の仕様（将来用）

```mdx
---
title: "記事タイトル"
date: "2026-02-14"
tags: ["design", "ai"]
---

本文をここに書く。
```

- content/writing/ に配置
- ファイル名がスラッグになる（例: `first-post.mdx` → `/writing/first-post`）
- 記事一覧は Writing セクションに最新 3〜5 件表示
- 記事がない場合は「準備中。ゆっくりですが、書きます。」を表示

## Tailwind 設定メモ

```ts
// tailwind.config.ts
export default {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-display)', 'serif'],
        body: ['var(--font-body)', 'serif'],
      },
      colors: {
        bg: '#f7f7f5',
        fg: '#1c1c1c',
        accent: '#2c5a8a',
        muted: '#919191',
        border: '#d8d8d6',
      },
    },
  },
}
```

## デプロイ手順

1. GitHub に private repo 作成
2. `npx create-next-app@14.2.35 slow-but-good --typescript --tailwind --app --src-dir=false`
3. 上記構成に従いコンポーネント実装
4. Vercel にインポート → GitHub 連携
5. 独自ドメイン設定（後日）

## 注意事項

- デザインモック（HTML）の見た目を忠実に再現すること
- フォントの太さ、余白、色は仕様通りに
- 過剰な装飾やアニメーションは追加しない
- モバイル対応: 640px 以下でパディング調整、フッター縦積み
- `scroll` インジケーターはモバイルでは非表示

## SEO 要件

### メタタグ（トップページ）

```tsx
// app/layout.tsx
export const metadata = {
  title: 'slow but good — 早乙女貴昭',
  description: 'デザインを30年ほど。道具も環境も時代と一緒に変わりました。今はAIと暮らしています。',
  metadataBase: new URL('https://ドメイン未定'),
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
```

### 記事ごとのメタタグ（Writing）

MDX の frontmatter から動的に生成する。

```tsx
// app/writing/[slug]/page.tsx
export async function generateMetadata({ params }) {
  const post = await getPost(params.slug)
  return {
    title: `${post.title} — slow but good`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      images: [{ url: post.ogImage || '/og-image.png' }],
    },
  }
}
```

### 構造化データ（JSON-LD）

トップページの `<head>` に挿入。

```tsx
// components/JsonLd.tsx
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: '早乙女貴昭',
  jobTitle: 'デザイナー',
  url: 'https://ドメイン未定',
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

// layout.tsx 内で
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
/>
```

記事ページには `BlogPosting` 型の JSON-LD も追加する。

```json
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "記事タイトル",
  "datePublished": "2026-02-15",
  "author": {
    "@type": "Person",
    "name": "早乙女貴昭"
  }
}
```

### sitemap.xml

Next.js App Router の `app/sitemap.ts` で自動生成。

```tsx
// app/sitemap.ts
export default async function sitemap() {
  const posts = await getAllPosts()

  const postUrls = posts.map((post) => ({
    url: `https://ドメイン未定/writing/${post.slug}`,
    lastModified: post.date,
  }))

  return [
    { url: 'https://ドメイン未定', lastModified: new Date() },
    ...postUrls,
  ]
}
```

### robots.txt

```tsx
// app/robots.ts
export default function robots() {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: 'https://ドメイン未定/sitemap.xml',
  }
}
```

### canonical URL

Next.js App Router の `metadataBase` 設定で自動付与される。
追加設定は不要。

### OGP 画像

- サイズ: 1200 x 630px
- 内容: 「slow but good」のタイトル + タグライン
- フォント: Fraunces
- 配色: Color B（#f7f7f5 背景 + #1c1c1c テキスト + #2c5a8a アクセント）
- 配置: `public/og-image.png`
- ※ 後日作成でよい。仮画像で先に進める

### Core Web Vitals 最適化

- フォント: `next/font/google` で読み込み（外部リクエスト削減）
- 画像: `next/image` コンポーネント使用（将来画像を追加する場合）
- CSS: Tailwind CSS の purge で未使用 CSS 除去（自動）
- Vercel: Edge Network + 自動 CDN で配信最適化（自動）
