# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## プロジェクト概要

パスワード生成Webアプリ。Docker上でNext.js（App Router）を動かす構成。

## 技術スタック

- Next.js 16 (App Router) / React 19 / TypeScript 5.9
- shadcn/ui (New York) + Tailwind CSS v4
- react-hook-form（フォーム管理）
- pnpm（パッケージマネージャ）
- Docker Compose（開発環境）
- ESLint v10 + typescript-eslint（flat config: `eslint.config.mjs`）
- vitest + @testing-library/react（テスト）

## コマンド

すべてのコマンドはDockerコンテナ内で実行する。

```bash
# Docker操作（ホスト側）
make start-up          # 初回セットアップ（build + up）
make up / make down    # コンテナ起動/停止
make node              # コンテナ内シェルに入る

# 開発（コンテナ内、またはホストから docker compose run --rm node sh -c "..."）
pnpm dev               # 開発サーバー起動（localhost:3000）
pnpm build             # プロダクションビルド
pnpm lint              # ESLint実行
pnpm test              # テスト実行（vitest）
pnpm test:coverage     # カバレッジ付きテスト
```

## アーキテクチャ

```
next/
├── src/app/
│   ├── page.tsx                    # メインページ（フォームUI + パスワード表示）
│   ├── generatePassword.ts         # パスワード生成ロジック（純粋関数）
│   ├── useGeneratePassword.ts      # React Hook（generatePasswordsのラッパー）
│   └── __tests__/                  # ユニットテスト
├── src/components/
│   ├── Header.tsx                  # ヘッダー（Drawer付き）
│   └── ui/                         # shadcn/ui コンポーネント
├── eslint.config.mjs               # ESLint flat config
└── vitest.config.ts                # vitest設定
```

### パスワード生成ロジック（`generatePassword.ts`）

- `buildCharset()`: level（1-4）とカスタムオプションから使用文字セットを構築
- `generatePassword()`: 1つのパスワードを生成。`crypto.getRandomValues()` + rejection samplingで暗号学的に安全な乱数を使用。重複なし生成はFisher-Yatesシャッフル
- `generatePasswords()`: 複数パスワードを一括生成
- `PasswordInputs`: フォーム入力の型定義（`page.tsx`もこの型を使用）

### フォーム（`page.tsx`）

react-hook-formの`Controller`でshadcn/uiコンポーネントを制御。レベル選択（英字/英数字/英数字記号/カスタム）、カスタムオプション（大文字のみ、小文字のみ、重複なし、記号選択）、パスワード長、生成数を指定可能。

## コミュニケーション

- 質問がある場合は AskUserQuestion ツールを使用する
