'use client';

import TwoModeConverterPage from '@/components/TwoModeConverterPage';
import { Settings } from 'lucide-react';
import { tomlToJson, jsonToToml } from './convertTomlJson';

const config = {
  icon: Settings,
  title: 'TOML / JSON 変換',
  id: 'toml-json',
  modeA: { label: 'TOML → JSON', inputLabel: 'TOML', outputLabel: 'JSON', placeholder: 'TOMLを入力...', buttonLabel: '変換', convert: tomlToJson },
  modeB: { label: 'JSON → TOML', inputLabel: 'JSON', outputLabel: 'TOML', placeholder: 'JSONを入力...', buttonLabel: '変換', convert: jsonToToml },
};

const TomlJsonPage = () => <TwoModeConverterPage config={config} />;
export default TomlJsonPage;
