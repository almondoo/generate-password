'use client';

import TwoModeConverterPage from '@/components/TwoModeConverterPage';
import { Languages } from 'lucide-react';
import { textToUnicode, unicodeToText } from './convertUnicode';

const config = {
  icon: Languages,
  title: 'Unicode変換',
  id: 'unicode',
  modeA: { label: 'テキスト → Unicode', inputLabel: 'テキスト', outputLabel: 'Unicodeエスケープ', placeholder: 'テキストを入力...', buttonLabel: '変換', convert: textToUnicode },
  modeB: { label: 'Unicode → テキスト', inputLabel: 'Unicodeエスケープ', outputLabel: 'テキスト', placeholder: '\\u0041\\u0042 形式で入力...', buttonLabel: '変換', convert: unicodeToText },
};

const UnicodePage = () => <TwoModeConverterPage config={config} />;
export default UnicodePage;
