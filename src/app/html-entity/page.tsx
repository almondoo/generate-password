'use client';

import TwoModeConverterPage from '@/components/TwoModeConverterPage';
import { Code } from 'lucide-react';
import { escapeHtml, unescapeHtml } from './convertHtmlEntity';

const config = {
  icon: Code,
  title: 'HTMLエンティティ変換',
  id: 'html-entity',
  modeA: { label: 'エスケープ', inputLabel: 'テキスト', outputLabel: 'HTMLエンティティ', placeholder: 'エスケープするテキストを入力...', buttonLabel: 'エスケープ', convert: escapeHtml },
  modeB: { label: 'アンエスケープ', inputLabel: 'HTMLエンティティ', outputLabel: 'テキスト', placeholder: 'アンエスケープするHTMLエンティティを入力...', buttonLabel: 'アンエスケープ', convert: unescapeHtml },
};

const HtmlEntityPage = () => <TwoModeConverterPage config={config} />;
export default HtmlEntityPage;
