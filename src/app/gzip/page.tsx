'use client';

import TwoModeConverterPage from '@/components/TwoModeConverterPage';
import { FileArchive } from 'lucide-react';
import { compressGzip, decompressGzip } from './convertGzip';

const config = {
  icon: FileArchive,
  title: 'GZIP圧縮 / 展開',
  id: 'gzip',
  modeA: { label: '圧縮', inputLabel: 'テキスト', outputLabel: 'Base64 (GZIP)', placeholder: '圧縮するテキストを入力...', buttonLabel: '圧縮', convert: compressGzip },
  modeB: { label: '展開', inputLabel: 'Base64 (GZIP)', outputLabel: 'テキスト', placeholder: 'Base64エンコードされたGZIPデータを入力...', buttonLabel: '展開', convert: decompressGzip },
};

const GzipPage = () => <TwoModeConverterPage config={config} />;
export default GzipPage;
