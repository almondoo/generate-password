# MUI → shadcn/ui 移行 + リデザイン 設計

## 概要

MUI v7 + Emotion を shadcn/ui (New York) + Tailwind CSS に完全置換し、モダンミニマルなデザインにリデザインする。

## タスク一覧

### Task 1: CLAUDE.md 追記
質問がある場合はAskUserQuestionツールを使用する旨を追記。

### Task 2: MUI → shadcn/ui + リデザイン

## デザイン方針

- モダンミニマル: 余白を活かしたクリーンなレイアウト
- ダークモード対応（shadcn/ui テーマシステム）
- 中央寄せカードレイアウト（max-w-2xl）
- ヘッダー: シンプルナビバー（subtle border）、モバイルはSheet

## コンポーネント対応表

| MUI | shadcn/ui + Tailwind |
|---|---|
| Button | Button |
| Card | Card |
| TextField | Input |
| Checkbox | Checkbox |
| Radio/RadioGroup | RadioGroup |
| FormLabel/InputLabel | Label |
| AppBar + Toolbar | カスタムヘッダー (Tailwind) |
| Drawer | Sheet |
| Typography | HTML + Tailwind |
| Box/Stack | div + Tailwind flex/grid |
| KeyIcon/FingerprintIcon/MenuIcon | lucide-react (Key/Fingerprint/Menu) |
| CssBaseline | Tailwind preflight |
| react-hot-toast | sonner |

## パッケージ変更

削除: @mui/material, @mui/icons-material, @emotion/react, @emotion/styled, @emotion/cache, react-hot-toast
追加: shadcn/ui init 自動追加, lucide-react, sonner

## 影響ファイル

- CLAUDE.md — AskUserQuestion使用の追記 + 技術スタック更新
- layout.tsx — ThemeRegistry削除、globals.css import、シンプルなdiv構成
- page.tsx — MUI → shadcn/ui コンポーネント置換 + リデザイン
- uuid/page.tsx — 同上
- Header.tsx — AppBar → カスタムナビ、Drawer → Sheet
- ThemeRegistry/ — 全削除
- RadioButtonGroup/ — 削除（shadcn RadioGroup使用）

## レイアウト

```
┌─────────────────────────────────┐
│  [Logo] パスワード | UUID       │  シンプルナビ + モバイル:Sheet
├─────────────────────────────────┤
│                                 │
│    ┌───────────────────────┐    │
│    │   [Icon]              │    │  Card (rounded, shadow)
│    │   オプション...       │    │
│    │   [生成ボタン]        │    │
│    └───────────────────────┘    │
│                                 │
│    ┌───────────────────────┐    │
│    │   結果一覧            │    │  Card (リスト形式)
│    │   uuid-1  [コピー]    │    │  各行にコピーアイコン
│    │   uuid-2  [コピー]    │    │
│    └───────────────────────┘    │
│                                 │
└─────────────────────────────────┘
```

## フォーム管理

react-hook-form を継続。Controller でshadcn/uiコンポーネントを制御。
