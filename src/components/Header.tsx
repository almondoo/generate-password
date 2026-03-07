import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
import Link from 'next/link';

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
      { label: 'YAML ↔ JSON', href: '/yaml-json' },
      { label: 'CSV ↔ JSON', href: '/csv-json' },
      { label: 'TOML ↔ JSON', href: '/toml-json' },
      { label: 'XML ↔ JSON', href: '/xml-json' },
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
  return (
    <header className="space-y-2">
      <Link href="/" className="text-lg font-semibold">
        Generator Tools
      </Link>
      <nav aria-label="メインナビゲーション" className="flex items-center gap-1">
        {navCategories.map((category) => (
          <DropdownMenu key={category.label} modal={false}>
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
        ))}
      </nav>
    </header>
  );
};

export default Header;
