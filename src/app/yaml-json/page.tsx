'use client';

import TwoModeConverterPage from '@/components/TwoModeConverterPage';
import { FileText } from 'lucide-react';
import { yamlToJson, jsonToYaml } from './convertYamlJson';

const config = {
  icon: FileText,
  title: 'YAML / JSON 変換',
  id: 'yaml-json',
  modeA: { label: 'YAML → JSON', inputLabel: 'YAML', outputLabel: 'JSON', placeholder: 'YAMLを入力...', buttonLabel: '変換', convert: yamlToJson },
  modeB: { label: 'JSON → YAML', inputLabel: 'JSON', outputLabel: 'YAML', placeholder: 'JSONを入力...', buttonLabel: '変換', convert: jsonToYaml },
};

const YamlJsonPage = () => <TwoModeConverterPage config={config} />;
export default YamlJsonPage;
