# now.md

## Current Status

| 項目 | 状態 |
|------|------|
| state | ✅ 本番運用中 |
| branch | main |
| domain | www.saotomeno.com |
| deploy | Production |
| pending | なし |

## Project Overview

- 個人サイトを本番運用中
- Next.js ベースで構築
- main ブランチへの更新で本番反映される運用
- お問い合わせ導線を設置済み
- note と連携しながら情報発信を継続中

## Tech Stack

- Next.js
- App Router
- Vercel
- 独自ドメイン運用
- フォーム送信基盤あり

## Public Content

### Writing
- /writing/ai-checklist — 「AIで作ったもの、本番にする前に。」

### note
- 「動いた」と「使える」は違う。
- 「そのAIアプリ、半年もちますか？」

## SEO / Site Basics

- canonical 設定済み
- sitemap / robots 対応済み
- 構造化データを設定済み
- OGP は基本設定済み

## Remaining Tasks

| 優先度 | タスク | 備考 |
|--------|--------|------|
| P1 | OGP画像作成 | SNS共有用ビジュアル整備 |
| P2 | Writing記事追加 | サイト側の記事を拡充 |
| P2 | noteからサイトへの導線整理 | 相互送客を強化 |
| P3 | 表示確認 | フォントや細部の見え方を確認 |

## Deploy Memo

```bash
git add .
git commit -m "update"
git push