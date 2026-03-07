'use client';

import TwoModeConverterPage from '@/components/TwoModeConverterPage';
import { Database } from 'lucide-react';
import { formatSql, minifySql } from './formatSql';

const config = {
  icon: Database,
  title: 'SQL整形 / 圧縮',
  id: 'sql-format',
  modeA: { label: '整形', inputLabel: 'SQL', outputLabel: 'SQL（整形済み）', placeholder: '整形するSQLを入力...', buttonLabel: '整形', convert: formatSql },
  modeB: { label: '圧縮', inputLabel: 'SQL', outputLabel: 'SQL（圧縮済み）', placeholder: '圧縮するSQLを入力...', buttonLabel: '圧縮', convert: minifySql },
};

const SqlFormatPage = () => <TwoModeConverterPage config={config} />;
export default SqlFormatPage;
