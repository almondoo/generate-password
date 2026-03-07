'use client';

import TwoModeConverterPage from '@/components/TwoModeConverterPage';
import { Table } from 'lucide-react';
import { csvToJson, jsonToCsv } from './convertCsvJson';

const config = {
  icon: Table,
  title: 'CSV / JSON 変換',
  id: 'csv-json',
  modeA: { label: 'CSV → JSON', inputLabel: 'CSV', outputLabel: 'JSON', placeholder: 'CSVを入力...', buttonLabel: '変換', convert: csvToJson },
  modeB: { label: 'JSON → CSV', inputLabel: 'JSON', outputLabel: 'CSV', placeholder: 'JSON配列を入力...', buttonLabel: '変換', convert: jsonToCsv },
};

const CsvJsonPage = () => <TwoModeConverterPage config={config} />;
export default CsvJsonPage;
