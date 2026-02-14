# Progress Report — slow but good

作成日: 2026-02-15

## ディレクトリ構成

```
slow-but-good/
├── app/
│   ├── globals.css              # Tailwind + カスタムアニメーション
│   ├── layout.tsx               # 共通レイアウト（フォント、メタデータ、JSON-LD）
│   ├── page.tsx                 # トップページ
│   ├── robots.ts                # robots.txt 自動生成
│   ├── sitemap.ts               # sitemap.xml 自動生成
│   └── writing/
│       └── [slug]/
│           └── page.tsx         # 個別記事ページ（将来用）
├── components/
│   ├── About.tsx                # 自己紹介セクション
│   ├── ContactForm.tsx          # 問い合わせフォーム（Client Component）
│   ├── Divider.tsx              # 区切り線
│   ├── Footer.tsx               # フッター
│   ├── Hero.tsx                 # ヒーローセクション
│   ├── ScrollReveal.tsx         # スクロールアニメーション（Client Component）
│   ├── SectionLabel.tsx         # セクションラベル共通
│   ├── Tools.tsx                # ツール一覧
│   └── Writing.tsx              # 記事一覧（プレースホルダー）
├── content/
│   └── writing/
│       └── .gitkeep             # MDX 記事置き場（空）
├── docs/
│   ├── now.md                   # 作業ログ
│   ├── progress-report.md       # 本ファイル
│   ├── slow-but-good-instructions.md  # 指示書
│   └── slow-but-good-v2.html   # デザインモック
├── lib/
│   └── mdx.ts                  # MDX 読み込みユーティリティ
├── public/                      # 静的ファイル（現在空）
├── .eslintrc.json
├── .gitignore
├── CLAUDE.md
├── next-env.d.ts
├── next.config.mjs
├── package.json
├── package-lock.json
├── postcss.config.mjs
├── tailwind.config.ts
└── tsconfig.json
```

## 作成済みファイル一覧（29ファイル）

| ファイル | 役割 |
|---------|------|
| `app/globals.css` | Tailwind ディレクティブ、アニメーション、フォーム入力スタイル |
| `app/layout.tsx` | Fraunces / Shippori Mincho 読み込み、メタデータ、JSON-LD（Person） |
| `app/page.tsx` | トップページ（全コンポーネント統合） |
| `app/robots.ts` | robots.txt 生成 |
| `app/sitemap.ts` | sitemap.xml 生成 |
| `app/writing/[slug]/page.tsx` | MDX 記事ページ + BlogPosting JSON-LD |
| `components/About.tsx` | 名前・会社名・本文 |
| `components/ContactForm.tsx` | Name / Email / Message / Send フォーム |
| `components/Divider.tsx` | セクション間の区切り線 |
| `components/Footer.tsx` | 社名 + コピーライト |
| `components/Hero.tsx` | タイトル・タグライン・for you・scroll |
| `components/ScrollReveal.tsx` | Intersection Observer によるフェードイン |
| `components/SectionLabel.tsx` | 各セクションの見出しラベル |
| `components/Tools.tsx` | 3グループのツール一覧 |
| `components/Writing.tsx` | 記事プレースホルダー |
| `content/writing/.gitkeep` | MDX 記事ディレクトリ確保 |
| `lib/mdx.ts` | MDX ファイル読み込み・パース |
| `CLAUDE.md` | プロジェクト規約 |
| `docs/now.md` | 作業ログ |
| `docs/slow-but-good-instructions.md` | 指示書 |
| `docs/slow-but-good-v2.html` | デザインモック |
| `.eslintrc.json` | ESLint 設定 |
| `.gitignore` | Git 除外設定 |
| `next-env.d.ts` | Next.js 型定義（自動生成） |
| `next.config.mjs` | Next.js 設定 |
| `package.json` | 依存関係・スクリプト |
| `postcss.config.mjs` | PostCSS 設定 |
| `tailwind.config.ts` | Tailwind カスタム設定 |
| `tsconfig.json` | TypeScript 設定 |

## 指示書の各項目 完了状況

### 技術スタック

| 項目 | 状態 | 備考 |
|------|------|------|
| Next.js 14.2.35 | ✅ 完了 | |
| React 18.x | ✅ 完了 | 18.3.1 |
| Tailwind CSS 3.x | ✅ 完了 | 3.4.19 |
| MDX + next-mdx-remote | ✅ 完了 | 基盤のみ（記事なし） |
| フォーム送信 | ⚠️ 未実装 | 現在はフロントのみ（Formspree/Vercel Functions 未接続） |
| Vercel ホスティング | ⚠️ 未実施 | GitHub連携デプロイ未設定 |
| GitHub | ✅ 完了 | https://github.com/Tomeza/slow-but-good.git |

### セキュリティ要件

| 項目 | 状態 | 備考 |
|------|------|------|
| Next.js 14.2.35 固定 | ✅ 完了 | |
| React 19 不使用 | ✅ 完了 | React 18.3.1 使用 |
| npm audit | ⚠️ 要確認 | high severity 1件あり（要調査） |
| .env.local の Git 除外 | ✅ 完了 | .gitignore に記載済み |

### ディレクトリ構成

| 項目 | 状態 |
|------|------|
| app/layout.tsx | ✅ |
| app/page.tsx | ✅ |
| app/globals.css | ✅ |
| app/writing/[slug]/page.tsx | ✅ |
| components/Hero.tsx | ✅ |
| components/About.tsx | ✅ |
| components/Tools.tsx | ✅ |
| components/Writing.tsx | ✅ |
| components/ContactForm.tsx | ✅ |
| components/Footer.tsx | ✅ |
| components/SectionLabel.tsx | ✅ |
| components/Divider.tsx | ✅ |
| components/ScrollReveal.tsx | ✅ |
| content/writing/.gitkeep | ✅ |
| lib/mdx.ts | ✅ |
| public/og-image.png | ❌ 未作成 |
| tailwind.config.ts | ✅ |
| next.config.mjs | ✅ |

### デザイン仕様

| 項目 | 状態 | 備考 |
|------|------|------|
| Fraunces（英語見出し） | ✅ 完了 | weight 300, 400 |
| Shippori Mincho（日本語本文） | ✅ 完了 | weight 400, 500（300は利用不可のため変更） |
| 配色 Color B | ✅ 完了 | |
| レイアウト（左右 8vw / モバイル 6vw） | ✅ 完了 | |
| セクション間 Divider | ✅ 完了 | |
| アニメーション（fadeUp / scroll reveal） | ✅ 完了 | |
| モバイル対応（640px以下） | ✅ 完了 | |

### コンテンツ

| セクション | 状態 |
|-----------|------|
| Hero（タイトル・タグライン・for you） | ✅ |
| About（名前・会社名・本文） | ✅ |
| Tools（3グループ） | ✅ |
| Writing（プレースホルダー） | ✅ |
| Contact（導入文・フォーム） | ✅ |
| Footer（社名・©） | ✅ |

### SEO

| 項目 | 状態 | 備考 |
|------|------|------|
| メタタグ（title, description） | ✅ 完了 | |
| OGP（Open Graph） | ✅ 完了 | |
| Twitter Card | ✅ 完了 | |
| JSON-LD（Person） | ✅ 完了 | |
| JSON-LD（BlogPosting） | ✅ 完了 | 記事ページに実装済み |
| sitemap.xml | ✅ 完了 | |
| robots.txt | ✅ 完了 | |
| canonical URL | ⚠️ 部分的 | metadataBase 未設定（ドメイン未定） |
| OGP 画像 | ❌ 未作成 | public/og-image.png |

## npm run build 結果

```
✓ Compiled successfully
✓ Generating static pages (6/6)

Route (app)                              Size     First Load JS
┌ ○ /                                    1.07 kB        88.3 kB
├ ○ /_not-found                          875 B          88.1 kB
├ ○ /robots.txt                          0 B                0 B
├ ○ /sitemap.xml                         0 B                0 B
└ ● /writing/[slug]                      136 B          87.4 kB
+ First Load JS shared by all            87.3 kB

○  (Static)  prerendered as static content
●  (SSG)     prerendered as static HTML
```

**ビルド: 成功** ✅

**警告:**
- `metadataBase` 未設定（OGP画像のURL解決に localhost:3000 が使用される）

## 未実装・未完了の項目

| 項目 | 優先度 | 備考 |
|------|--------|------|
| Vercel デプロイ（GitHub連携） | 高 | 本番公開に必須 |
| metadataBase のドメイン設定 | 高 | ドメイン確定後に設定 |
| フォーム送信機能（Formspree / Vercel Functions） | 高 | 現在はUI のみ |
| OGP 画像作成（`public/og-image.png`） | 中 | 1200x630px |
| npm audit の high severity 解消 | 中 | 要調査 |
| 独自ドメイン設定 | 中 | Vercel で設定 |
| Shippori Mincho weight 300 の代替検討 | 低 | 400で視覚的に問題なければ不要 |
| MDX 記事の執筆 | 低 | content/writing/ に配置 |
