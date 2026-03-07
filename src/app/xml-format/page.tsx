'use client';

import TwoModeConverterPage from '@/components/TwoModeConverterPage';
import { FileCode2 } from 'lucide-react';
import { formatXml, minifyXml } from './formatXml';

const config = {
  icon: FileCode2,
  title: 'XML整形 / 圧縮',
  id: 'xml-format',
  modeA: { label: '整形', inputLabel: 'XML', outputLabel: 'XML（整形済み）', placeholder: '整形するXMLを入力...', buttonLabel: '整形', convert: formatXml },
  modeB: { label: '圧縮', inputLabel: 'XML', outputLabel: 'XML（圧縮済み）', placeholder: '圧縮するXMLを入力...', buttonLabel: '圧縮', convert: minifyXml },
};

const XmlFormatPage = () => <TwoModeConverterPage config={config} />;
export default XmlFormatPage;
