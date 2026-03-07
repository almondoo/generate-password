# CLAUDE.md

## プロジェクト概要

パスワード生成Webアプリ。Docker上でNext.js（App Router）を動かす構成。

## 技術スタック

- Next.js 16 (App Router) / React 19 / TypeScript 5.9
- shadcn/ui (New York) + Tailwind CSS v4
- react-hook-form / pnpm / Docker Compose
- ESLint v10 + typescript-eslint（flat config）
- vitest + @testing-library/react

## コマンド

すべてのコマンドはDockerコンテナ内で実行する。`docker compose exec node` を経由すること。利用可能なコマンドは `package.json` の `scripts` と `Makefile` を参照すること。

## 実装後の確認

実装後は必ず以下を順番に実行し、すべてパスすることを確認する。

```bash
docker compose exec node pnpm run lint
docker compose exec node pnpm run test
docker compose exec node pnpm run build
```
