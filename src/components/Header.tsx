'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { ChevronDown, Menu, Wrench } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { useState } from 'react';

const navCategories = [
  {
    label: '生成',
    items: [
      { label: 'パスワード', href: '/' },
      { label: 'UUID', href: '/uuid' },
      { label: 'ULID', href: '/ulid' },
      { label: 'PIN', href: '/pin' },
      { label: 'トークン', href: '/token' },
      { label: 'パスフレーズ', href: '/passphrase' },
      { label: 'Lorem Ipsum', href: '/lorem-ipsum' },
    ],
  },
  {
    label: 'エンコード/デコード',
    items: [
      { label: 'Base64', href: '/base64' },
      { label: 'URLエンコード', href: '/url-encode' },
      { label: 'JWT', href: '/jwt' },
      { label: 'ハッシュ', href: '/hash' },
      { label: 'HTMLエンティティ', href: '/html-entity' },
      { label: 'Unicode', href: '/unicode' },
      { label: 'HEX/テキスト', href: '/hex-text' },
      { label: 'GZIP', href: '/gzip' },
    ],
  },
  {
    label: '変換/フォーマット',
    items: [
      { label: 'JSON整形', href: '/json' },
      { label: 'Unix時間変換', href: '/unix-time' },
      { label: 'JSON 変換', href: '/json-convert' },
      { label: 'SQL整形', href: '/sql-format' },
      { label: 'XML整形', href: '/xml-format' },
      { label: '数値基数変換', href: '/number-base' },
      { label: 'ケース変換', href: '/case-convert' },
      { label: '色変換', href: '/color-convert' },
    ],
  },
  {
    label: 'テスト/検証',
    items: [
      { label: '正規表現', href: '/regex-test' },
      { label: 'JSONPath', href: '/jsonpath' },
      { label: 'Cron式', href: '/cron' },
    ],
  },
  {
    label: 'テキスト',
    items: [
      { label: 'diff比較', href: '/diff' },
      { label: '文字数カウント', href: '/char-count' },
      { label: 'Markdown', href: '/markdown-preview' },
      { label: 'テキストソート', href: '/text-sort' },
      { label: 'テキスト置換', href: '/text-replace' },
    ],
  },
  {
    label: 'ネットワーク',
    items: [
      { label: 'IPv4サブネット', href: '/ipv4-subnet' },
      { label: 'IPアドレス変換', href: '/ip-convert' },
      { label: 'HTTPステータス', href: '/http-status' },
      { label: 'User-Agent', href: '/user-agent' },
    ],
  },
  {
    label: 'ツール',
    items: [
      { label: 'QRコード', href: '/qrcode' },
      { label: 'カラーピッカー', href: '/color-picker' },
      { label: 'Base64画像', href: '/base64-image' },
      { label: 'OGPプレビュー', href: '/ogp-preview' },
      { label: 'パーセント計算', href: '/percent-calc' },
    ],
  },
];

const Header = () => {
  const [sheetOpen, setSheetOpen] = useState(false);

  return (
    <motion.header
      className="space-y-3"
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      <div className="flex items-center justify-between">
        <Link href="/" className="group flex items-center gap-2.5 text-2xl font-bold tracking-tight">
          <Wrench className="h-6 w-6 text-primary transition-transform duration-200 group-hover:rotate-[-20deg]" />
          Generator Tools
        </Link>

        {/* モバイル: ハンバーガーメニュー */}
        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              aria-label="メニューを開く"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="overflow-y-auto">
            <SheetHeader>
              <SheetTitle>メニュー</SheetTitle>
            </SheetHeader>
            <nav aria-label="メインナビゲーション" className="px-4 pb-4">
              {navCategories.map((category) => (
                <div key={category.label} className="mb-4">
                  <p className="mb-1 text-xs font-medium text-muted-foreground">
                    {category.label}
                  </p>
                  <ul className="space-y-0.5">
                    {category.items.map((item) => (
                      <li key={item.label}>
                        <Link
                          href={item.href}
                          onClick={() => setSheetOpen(false)}
                          className="block rounded-md px-2 py-1.5 text-sm transition-colors hover:bg-accent"
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>

      {/* デスクトップ: ドロップダウンナビゲーション */}
      <nav
        aria-label="メインナビゲーション"
        className="hidden flex-wrap items-center gap-1 md:flex"
      >
        {navCategories.map((category, i) => (
          <motion.div
            key={category.label}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.05 * i }}
          >
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="group">
                  {category.label}
                  <ChevronDown
                    aria-hidden="true"
                    className="ml-1 h-3 w-3 transition-transform duration-200 group-data-[state=open]:rotate-180"
                  />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                {category.items.map((item) => (
                  <DropdownMenuItem key={item.label} asChild>
                    <Link href={item.href}>{item.label}</Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </motion.div>
        ))}
      </nav>
    </motion.header>
  );
};

export default Header;
