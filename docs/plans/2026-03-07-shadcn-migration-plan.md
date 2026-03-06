# MUI → shadcn/ui 移行 + リデザイン Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** MUI v7 + Emotion を shadcn/ui (New York) に完全置換し、モダンミニマルなデザインにリデザインする

**Architecture:** shadcn/ui コンポーネントを `src/components/ui/` に配置。react-hook-form の Controller で shadcn コンポーネントを制御。Tailwind CSS v4（設定済み）でレイアウト。sonner で toast 通知。

**Tech Stack:** Next.js 16, React 19, TypeScript 5.9, shadcn/ui (New York), Tailwind CSS v4, react-hook-form, lucide-react, sonner

---

### Task 1: CLAUDE.md 更新

**Files:**
- Modify: `CLAUDE.md`

**Step 1: CLAUDE.md に AskUserQuestion の記述と技術スタック更新を追記**

変更内容:
1. 技術スタックの `MUI v7 (Material UI) + Emotion` を `shadcn/ui (New York) + Tailwind CSS v4` に変更
2. `react-hot-toast` → `sonner`
3. Tailwind CSS v4 を追加
4. アーキテクチャの `ThemeRegistry/` を `ui/` に変更
5. フォームの説明を更新
6. 以下を追記:

```markdown
## コミュニケーション

- 質問がある場合は AskUserQuestion ツールを使用する
```

**Step 2: コミット**

```bash
git add CLAUDE.md
git commit -m "docs: CLAUDE.mdの技術スタック更新とAskUserQuestion記述追加"
```

---

### Task 2: shadcn/ui 初期化 + コンポーネント追加

**Files:**
- Create: `next/components.json`
- Create: `next/src/lib/utils.ts`
- Create: `next/src/components/ui/button.tsx`
- Create: `next/src/components/ui/card.tsx`
- Create: `next/src/components/ui/input.tsx`
- Create: `next/src/components/ui/checkbox.tsx`
- Create: `next/src/components/ui/radio-group.tsx`
- Create: `next/src/components/ui/label.tsx`
- Create: `next/src/components/ui/sheet.tsx`
- Create: `next/src/components/ui/sonner.tsx`

**Step 1: shadcn/ui を初期化**

Dockerコンテナ内で実行:
```bash
docker compose run --rm node sh -c "cd /var/www/src && npx shadcn@latest init -d --style new-york --base-color zinc --css-variables"
```

もし対話的になる場合は手動で `components.json` を作成:

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "",
    "css": "src/app/globals.css",
    "baseColor": "zinc",
    "cssVariables": true
  },
  "iconLibrary": "lucide",
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  }
}
```

**Step 2: 必要なコンポーネントを追加**

```bash
docker compose run --rm node sh -c "cd /var/www/src && npx shadcn@latest add button card input checkbox radio-group label sheet sonner -y"
```

**Step 3: sonner パッケージをインストール**

```bash
docker compose run --rm node sh -c "cd /var/www/src && pnpm add sonner lucide-react"
```

**Step 4: コミット**

```bash
git add next/components.json next/src/lib/ next/src/components/ui/ next/src/app/globals.css next/package.json next/pnpm-lock.yaml
git commit -m "feat: shadcn/ui初期化とコンポーネント追加"
```

---

### Task 3: MUI + Emotion パッケージ削除

**Files:**
- Modify: `next/package.json`
- Delete: `next/src/components/ThemeRegistry/EmotionCache.tsx`
- Delete: `next/src/components/ThemeRegistry/ThemeRegistry.tsx`
- Delete: `next/src/components/ThemeRegistry/theme.ts`
- Delete: `next/src/components/RadioButtonGroup/index.tsx`

**Step 1: MUI + Emotion + react-hot-toast を削除**

```bash
docker compose run --rm node sh -c "cd /var/www/src && pnpm remove @mui/material @mui/icons-material @emotion/react @emotion/styled @emotion/cache react-hot-toast"
```

**Step 2: ThemeRegistry ディレクトリと RadioButtonGroup を削除**

```bash
rm -rf next/src/components/ThemeRegistry next/src/components/RadioButtonGroup
```

**Step 3: コミット**

```bash
git add -A next/src/components/ThemeRegistry next/src/components/RadioButtonGroup next/package.json next/pnpm-lock.yaml
git commit -m "refactor: MUI/Emotion/ThemeRegistry/RadioButtonGroupを削除"
```

---

### Task 4: layout.tsx リデザイン

**Files:**
- Modify: `next/src/app/layout.tsx`

**Step 1: layout.tsx を書き換え**

```tsx
import Header from '@/components/Header';
import type { Metadata } from 'next';
import { ReactNode } from 'react';
import { Toaster } from 'sonner';
import './globals.css';

export const metadata: Metadata = {
  title: 'Generator Tools',
  description: 'パスワード・UUIDを生成する',
};

interface Props {
  children: ReactNode;
}

const RootLayout = ({ children }: Props) => {
  return (
    <html lang="ja">
      <body className="min-h-screen bg-background text-foreground antialiased">
        <Header />
        <main className="mx-auto w-full max-w-2xl px-4 pt-20 pb-10">
          {children}
        </main>
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
};

export default RootLayout;
```

**Step 2: コミット**

```bash
git add next/src/app/layout.tsx
git commit -m "refactor: layout.tsxをshadcn/ui + Tailwindに移行"
```

---

### Task 5: Header リデザイン

**Files:**
- Modify: `next/src/components/Header.tsx`

**Step 1: Header.tsx を shadcn Sheet + Tailwind に書き換え**

```tsx
'use client';

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

const navItems = [
  { label: 'パスワード', href: '/' },
  { label: 'UUID', href: '/uuid' },
];

const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-14 max-w-2xl items-center justify-between px-4">
        <Link href="/" className="text-lg font-semibold">
          Generator Tools
        </Link>

        {/* Desktop nav */}
        <nav className="hidden gap-1 sm:flex">
          {navItems.map((item) => (
            <Button key={item.label} variant="ghost" size="sm" asChild>
              <Link href={item.href}>{item.label}</Link>
            </Button>
          ))}
        </nav>

        {/* Mobile nav */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="sm:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">メニューを開く</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <SheetHeader>
              <SheetTitle>Generator Tools</SheetTitle>
            </SheetHeader>
            <nav className="mt-6 flex flex-col gap-2">
              {navItems.map((item) => (
                <Button
                  key={item.label}
                  variant="ghost"
                  className="justify-start"
                  asChild
                  onClick={() => setOpen(false)}
                >
                  <Link href={item.href}>{item.label}</Link>
                </Button>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Header;
```

**Step 2: コミット**

```bash
git add next/src/components/Header.tsx
git commit -m "refactor: HeaderをshadcnのSheet + Tailwindに移行"
```

---

### Task 6: パスワード生成ページ リデザイン

**Files:**
- Modify: `next/src/app/page.tsx`

**Step 1: page.tsx を shadcn/ui コンポーネントで書き換え**

```tsx
'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Copy, Key } from 'lucide-react';
import { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { PasswordInputs, SYMBOL } from './generatePassword';
import useGeneratePassword from './useGeneratePassword';

const levels = [
  { label: '英字', value: '1' },
  { label: '英数字', value: '2' },
  { label: '英数字記号', value: '3' },
  { label: 'カスタム', value: '4' },
];

const CUSTOM_NUMBER = '4';
const symbols = SYMBOL;

const Home = () => {
  const [stringLength, setStringLength] = useState<number>(0);
  const { generatedPasswords, handleGenerate } = useGeneratePassword();
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<PasswordInputs>({
    defaultValues: {
      level: '1',
      custom: {
        number: false,
        duplication: false,
        upperCaseOnly: false,
        lowerCaseOnly: false,
      },
      symbols: [],
      length: 12,
      generatedNumber: 10,
    },
  });

  const watchData = watch();

  const onSubmit: SubmitHandler<PasswordInputs> = (data: PasswordInputs) => {
    setStringLength(Number(data.length));
    handleGenerate(data);
  };

  const handleCopy = (value: string) => {
    navigator.clipboard
      .writeText(value)
      .then(() => toast.success('コピーしました！'))
      .catch(() => toast.error('コピーに失敗しました！'));
  };

  return (
    <div className="space-y-6 py-6">
      <Card>
        <CardHeader className="text-center">
          <Key className="mx-auto h-8 w-8 text-muted-foreground" />
          <CardTitle className="text-xl">パスワード生成</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* レベル */}
            <div className="space-y-2">
              <Label className="text-base font-semibold">レベル</Label>
              <Controller
                name="level"
                control={control}
                render={({ field }) => (
                  <RadioGroup
                    value={field.value}
                    onValueChange={field.onChange}
                    className="flex flex-wrap gap-3"
                  >
                    {levels.map((radio) => (
                      <div key={radio.value} className="flex items-center gap-2">
                        <RadioGroupItem value={radio.value} id={`level-${radio.value}`} />
                        <Label htmlFor={`level-${radio.value}`} className="font-normal">
                          {radio.label}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                )}
              />
            </div>

            {/* カスタム */}
            <div className="space-y-2">
              <Label className="text-base font-semibold">カスタム</Label>
              <Controller
                name="custom"
                control={control}
                render={({ field }) => (
                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="custom-number"
                        checked={field.value.number}
                        onCheckedChange={(checked) =>
                          field.onChange({ ...field.value, number: !!checked })
                        }
                        disabled={watchData.level !== CUSTOM_NUMBER}
                      />
                      <Label htmlFor="custom-number" className="font-normal">数字を含めるか</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="custom-duplication"
                        checked={field.value.duplication}
                        onCheckedChange={(checked) =>
                          field.onChange({ ...field.value, duplication: !!checked })
                        }
                      />
                      <Label htmlFor="custom-duplication" className="font-normal">文字の重複を含めない</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="custom-upper"
                        checked={field.value.upperCaseOnly}
                        onCheckedChange={(checked) =>
                          field.onChange({ ...field.value, upperCaseOnly: !!checked })
                        }
                        disabled={field.value.lowerCaseOnly}
                      />
                      <Label htmlFor="custom-upper" className="font-normal">大文字のみ</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="custom-lower"
                        checked={field.value.lowerCaseOnly}
                        onCheckedChange={(checked) =>
                          field.onChange({ ...field.value, lowerCaseOnly: !!checked })
                        }
                        disabled={field.value.upperCaseOnly}
                      />
                      <Label htmlFor="custom-lower" className="font-normal">小文字のみ</Label>
                    </div>
                  </div>
                )}
              />
            </div>

            {/* 記号 */}
            <div className="space-y-2">
              <Label className="text-base font-semibold">記号</Label>
              <Controller
                name="symbols"
                control={control}
                render={({ field }) => (
                  <div className="flex flex-wrap gap-3">
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="symbols-all"
                        checked={field.value.length === symbols.length}
                        onCheckedChange={(checked) =>
                          field.onChange(checked ? symbols.split('') : [])
                        }
                        disabled={watchData.level !== CUSTOM_NUMBER}
                      />
                      <Label htmlFor="symbols-all" className="font-normal">全て</Label>
                    </div>
                    {symbols.split('').map((symbol, i) => (
                      <div key={symbol} className="flex items-center gap-1">
                        <Checkbox
                          id={`symbol-${i}`}
                          checked={field.value.includes(symbol)}
                          onCheckedChange={(checked) => {
                            const values = checked
                              ? [...field.value, symbol]
                              : field.value.filter((v) => v !== symbol);
                            field.onChange(values);
                          }}
                          disabled={watchData.level !== CUSTOM_NUMBER}
                        />
                        <Label htmlFor={`symbol-${i}`} className="font-normal font-mono">
                          {symbol}
                        </Label>
                      </div>
                    ))}
                  </div>
                )}
              />
            </div>

            {/* パスワードの長さ */}
            <div className="space-y-2">
              <Label htmlFor="lengthField" className="text-base font-semibold">
                パスワードの長さ
              </Label>
              <Controller
                name="length"
                control={control}
                rules={{
                  required: '数字を入力してください。',
                  min: { value: 1, message: '1以上を指定してください。' },
                  max: { value: 100, message: '100以下を指定してください。' },
                }}
                render={({ field }) => (
                  <Input {...field} id="lengthField" type="number" className="max-w-32" />
                )}
              />
              {errors.length?.message && (
                <p className="text-sm text-destructive">{errors.length.message}</p>
              )}
            </div>

            {/* 生成数 */}
            <div className="space-y-2">
              <Label htmlFor="generatedNumberField" className="text-base font-semibold">
                生成数
              </Label>
              <Controller
                name="generatedNumber"
                control={control}
                rules={{
                  required: '数字を入力してください。',
                  min: { value: 1, message: '1以上を指定してください。' },
                  max: { value: 100, message: '100以下を指定してください。' },
                }}
                render={({ field }) => (
                  <Input {...field} id="generatedNumberField" type="number" className="max-w-32" />
                )}
              />
              {errors.generatedNumber?.message && (
                <p className="text-sm text-destructive">{errors.generatedNumber.message}</p>
              )}
            </div>

            <Button type="submit" className="w-full">
              パスワード生成
            </Button>
          </form>
        </CardContent>
      </Card>

      {generatedPasswords.length > 0 && (
        <Card>
          <CardContent className="pt-6">
            {generatedPasswords[0].length !== stringLength && (
              <p className="mb-4 text-sm text-muted-foreground">
                重複を含めないので
                <span className="font-bold">{generatedPasswords[0].length}文字</span>
                になりました
              </p>
            )}
            <div className="space-y-2">
              {generatedPasswords.map((v, i) => (
                <div
                  key={`${v}-${i}`}
                  className="flex items-center gap-2 rounded-md border bg-muted/50 px-3 py-2"
                >
                  <code className="flex-1 truncate font-mono text-sm">{v}</code>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 shrink-0"
                    onClick={() => handleCopy(v)}
                  >
                    <Copy className="h-4 w-4" />
                    <span className="sr-only">コピー</span>
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Home;
```

**Step 2: コミット**

```bash
git add next/src/app/page.tsx
git commit -m "refactor: パスワード生成ページをshadcn/uiでリデザイン"
```

---

### Task 7: UUID生成ページ リデザイン

**Files:**
- Modify: `next/src/app/uuid/page.tsx`

**Step 1: uuid/page.tsx を shadcn/ui コンポーネントで書き換え**

```tsx
'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Copy, Fingerprint } from 'lucide-react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { UuidInputs } from './generateUuid';
import useGenerateUuid from './useGenerateUuid';

const Home = () => {
  const { generatedUuids, handleGenerate } = useGenerateUuid();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UuidInputs>({
    defaultValues: {
      generatedNumber: 10,
      uppercase: false,
      hyphen: true,
      braces: false,
    },
  });

  const onSubmit: SubmitHandler<UuidInputs> = (data: UuidInputs) => {
    handleGenerate(data);
  };

  const handleCopy = (value: string) => {
    navigator.clipboard
      .writeText(value)
      .then(() => toast.success('コピーしました！'))
      .catch(() => toast.error('コピーに失敗しました！'));
  };

  return (
    <div className="space-y-6 py-6">
      <Card>
        <CardHeader className="text-center">
          <Fingerprint className="mx-auto h-8 w-8 text-muted-foreground" />
          <CardTitle className="text-xl">UUID v4 生成</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* ケース */}
            <div className="space-y-2">
              <Label className="text-base font-semibold">ケース</Label>
              <Controller
                name="uppercase"
                control={control}
                render={({ field }) => (
                  <RadioGroup
                    value={field.value ? 'upper' : 'lower'}
                    onValueChange={(v) => field.onChange(v === 'upper')}
                    className="flex gap-3"
                  >
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="lower" id="case-lower" />
                      <Label htmlFor="case-lower" className="font-normal">小文字</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="upper" id="case-upper" />
                      <Label htmlFor="case-upper" className="font-normal">大文字</Label>
                    </div>
                  </RadioGroup>
                )}
              />
            </div>

            {/* オプション */}
            <div className="space-y-2">
              <Label className="text-base font-semibold">オプション</Label>
              <div className="flex flex-wrap gap-4">
                <Controller
                  name="hyphen"
                  control={control}
                  render={({ field }) => (
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="opt-hyphen"
                        checked={field.value}
                        onCheckedChange={(checked) => field.onChange(!!checked)}
                      />
                      <Label htmlFor="opt-hyphen" className="font-normal">ハイフンを含める</Label>
                    </div>
                  )}
                />
                <Controller
                  name="braces"
                  control={control}
                  render={({ field }) => (
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="opt-braces"
                        checked={field.value}
                        onCheckedChange={(checked) => field.onChange(!!checked)}
                      />
                      <Label htmlFor="opt-braces" className="font-normal">{'括弧で囲む {...}'}</Label>
                    </div>
                  )}
                />
              </div>
            </div>

            {/* 生成数 */}
            <div className="space-y-2">
              <Label htmlFor="generatedNumberField" className="text-base font-semibold">
                生成数
              </Label>
              <Controller
                name="generatedNumber"
                control={control}
                rules={{
                  required: '数字を入力してください。',
                  min: { value: 1, message: '1以上を指定してください。' },
                  max: { value: 100, message: '100以下を指定してください。' },
                }}
                render={({ field }) => (
                  <Input {...field} id="generatedNumberField" type="number" className="max-w-32" />
                )}
              />
              {errors.generatedNumber?.message && (
                <p className="text-sm text-destructive">{errors.generatedNumber.message}</p>
              )}
            </div>

            <Button type="submit" className="w-full">
              UUID生成
            </Button>
          </form>
        </CardContent>
      </Card>

      {generatedUuids.length > 0 && (
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-2">
              {generatedUuids.map((v, i) => (
                <div
                  key={`${v}-${i}`}
                  className="flex items-center gap-2 rounded-md border bg-muted/50 px-3 py-2"
                >
                  <code className="flex-1 truncate font-mono text-sm">{v}</code>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 shrink-0"
                    onClick={() => handleCopy(v)}
                  >
                    <Copy className="h-4 w-4" />
                    <span className="sr-only">コピー</span>
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Home;
```

**Step 2: コミット**

```bash
git add next/src/app/uuid/page.tsx
git commit -m "refactor: UUID生成ページをshadcn/uiでリデザイン"
```

---

### Task 8: 全体検証

**Step 1: テスト実行**

```bash
docker compose run --rm node sh -c "cd /var/www/src && pnpm test"
```
Expected: ALL PASS（ロジックテストは変更なし）

**Step 2: lint実行**

```bash
docker compose run --rm node sh -c "cd /var/www/src && pnpm lint"
```
Expected: エラーなし

**Step 3: ビルド確認**

```bash
docker compose run --rm node sh -c "cd /var/www/src && pnpm build"
```
Expected: ビルド成功、`/`, `/uuid` がルートに含まれる
