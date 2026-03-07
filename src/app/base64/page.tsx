'use client';

import TwoModeConverterPage from '@/components/TwoModeConverterPage';
import { ArrowLeftRight } from 'lucide-react';
import { decodeBase64, encodeBase64 } from './convertBase64';

const config = {
  icon: ArrowLeftRight,
  title: 'Base64 エンコード/デコード',
  id: 'base64',
  modeA: { label: 'エンコード', inputLabel: 'テキスト', outputLabel: 'Base64', placeholder: 'エンコードするテキストを入力...', buttonLabel: 'エンコード', convert: encodeBase64 },
  modeB: { label: 'デコード', inputLabel: 'Base64', outputLabel: 'テキスト', placeholder: 'デコードするBase64を入力...', buttonLabel: 'デコード', convert: decodeBase64 },
};

const Home = () => <TwoModeConverterPage config={config} />;
export default Home;
