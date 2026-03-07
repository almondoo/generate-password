'use client';

import TwoModeConverterPage from '@/components/TwoModeConverterPage';
import { Binary } from 'lucide-react';
import { hexToText, textToHex } from './convertHexText';

const config = {
  icon: Binary,
  title: 'HEX / テキスト変換',
  id: 'hex-text',
  modeA: { label: 'テキスト → HEX', inputLabel: 'テキスト', outputLabel: 'HEX', placeholder: 'テキストを入力...', buttonLabel: '変換', convert: textToHex },
  modeB: { label: 'HEX → テキスト', inputLabel: 'HEX', outputLabel: 'テキスト', placeholder: '41 42 43 形式で入力...', buttonLabel: '変換', convert: hexToText },
};

const HexTextPage = () => <TwoModeConverterPage config={config} />;
export default HexTextPage;
