'use client';

import TwoModeConverterPage from '@/components/TwoModeConverterPage';
import { Link2 } from 'lucide-react';
import { decodeUrl, encodeUrl } from './convertUrl';

const config = {
  icon: Link2,
  title: 'URLエンコード/デコード',
  id: 'url-encode',
  modeA: { label: 'エンコード', inputLabel: 'テキスト', outputLabel: 'URLエンコード済み', placeholder: 'エンコードするテキストを入力...', buttonLabel: 'エンコード', convert: encodeUrl },
  modeB: { label: 'デコード', inputLabel: 'URLエンコード済み', outputLabel: 'テキスト', placeholder: 'デコードするURLエンコード済みテキストを入力...', buttonLabel: 'デコード', convert: decodeUrl },
};

const Home = () => <TwoModeConverterPage config={config} />;
export default Home;
