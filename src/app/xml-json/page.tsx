'use client';

import TwoModeConverterPage from '@/components/TwoModeConverterPage';
import { FileCode } from 'lucide-react';
import { xmlToJson, jsonToXml } from './convertXmlJson';

const config = {
  icon: FileCode,
  title: 'XML / JSON 変換',
  id: 'xml-json',
  modeA: { label: 'XML → JSON', inputLabel: 'XML', outputLabel: 'JSON', placeholder: 'XMLを入力...', buttonLabel: '変換', convert: xmlToJson },
  modeB: { label: 'JSON → XML', inputLabel: 'JSON', outputLabel: 'XML', placeholder: 'JSONを入力...', buttonLabel: '変換', convert: jsonToXml },
};

const XmlJsonPage = () => <TwoModeConverterPage config={config} />;
export default XmlJsonPage;
