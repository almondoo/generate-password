'use client';

import TwoModeConverterPage from '@/components/TwoModeConverterPage';
import { Braces } from 'lucide-react';
import { formatJson, minifyJson } from './formatJson';

const config = {
  icon: Braces,
  title: 'JSON整形 / Minify',
  id: 'json',
  modeA: { label: '整形', inputLabel: 'JSON（未整形）', outputLabel: 'JSON（整形済み）', placeholder: '整形するJSONを入力...', buttonLabel: '整形', convert: formatJson },
  modeB: { label: '圧縮', inputLabel: 'JSON（整形済み）', outputLabel: 'JSON（圧縮済み）', placeholder: '圧縮するJSONを入力...', buttonLabel: '圧縮', convert: minifyJson },
  errorMessage: '変換に失敗しました。入力値が正しいJSONか確認してください。',
};

const JsonPage = () => <TwoModeConverterPage config={config} />;
export default JsonPage;
