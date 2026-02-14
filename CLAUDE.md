# slow but good

個人サイト「slow but good」— 早乙女貴昭 / 有限会社さおとめの事務所

## 技術スタック

- Next.js 14.2.35（App Router）+ React 18
- Tailwind CSS 3.x
- MDX + next-mdx-remote（記事管理、将来用）
- Vercel デプロイ
- GitHub: https://github.com/Tomeza/slow-but-good.git

## セキュリティ

- React 19 は使用禁止（CVE-2025-55182 RCE 対象）
- Next.js は 14.2.35 固定（CVE 対応版）
- `npm audit` でクリーンであること

## デザイン仕様

- フォント: Fraunces（英語見出し）+ Shippori Mincho（日本語本文）
- 配色: bg #f7f7f5 / fg #1c1c1c / accent #2c5a8a / muted #919191 / border #d8d8d6
- デザインモック: `docs/slow-but-good-v2.html` が正（変更時はこのファイルと見比べること）
- ミニマルで洗練されたデザイン。過剰な装飾やアニメーションは追加しない

## コンテンツ（確定済み・変更不可）

変更する場合は必ず確認を取ること。

- サイト名: slow but good
- タグライン: Good things take time. I take more.
- アクセント: for you.
- About: 早乙女 貴昭 / 有限会社さおとめの事務所 / デザインを30年ほど。道具も環境も時代と一緒に変わりました。今はAIと暮らしています。
- Tools:
  - InDesign / Illustrator / Photoshop → 紙とインクの世界。一番長い付き合いです。
  - Next.js / Supabase / Vercel → 現場で使えるアプリをつくります。私も使ってます。
  - Claude / ChatGPT → AIで、あなたの面倒を減らします。ついでに私のも。
- Contact: お仕事のご相談、お気軽にどうぞ。
- Footer: 有限会社さおとめの事務所 / © 2026

## コマンド

```bash
npm run dev    # 開発サーバー起動
npm run build  # ビルド
npm run start  # プロダクションサーバー起動
```

## ディレクトリ構成

```
app/            # Next.js App Router
components/     # UIコンポーネント
content/        # MDX 記事（将来用）
lib/            # ユーティリティ
public/         # 静的ファイル
docs/           # デザインモック・指示書
```
