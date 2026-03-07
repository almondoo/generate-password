'use client';

import { CopyButton } from '@/components/CopyButton';
import ToolPageLayout from '@/components/ToolPageLayout';
import { Input } from '@/components/ui/input';
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard';
import { Binary } from 'lucide-react';
import { useCallback, useState } from 'react';
import { convertBase } from './convertBase';

const NumberBasePage = () => {
  const [dec, setDec] = useState('');
  const [bin, setBin] = useState('');
  const [oct, setOct] = useState('');
  const [hex, setHex] = useState('');
  const [error, setError] = useState('');
  const { copiedKey, copy } = useCopyToClipboard();

  const update = useCallback((value: string, base: number) => {
    setError('');
    if (value.trim() === '') {
      setDec(''); setBin(''); setOct(''); setHex('');
      return;
    }
    try {
      const result = convertBase(value, base);
      if (base !== 10) setDec(result.dec);
      if (base !== 2) setBin(result.bin);
      if (base !== 8) setOct(result.oct);
      if (base !== 16) setHex(result.hex);
    } catch {
      setError('無効な入力値です。');
    }
  }, []);

  const fields = [
    { label: '10進数', value: dec, setter: setDec, base: 10, id: 'dec' },
    { label: '2進数', value: bin, setter: setBin, base: 2, id: 'bin' },
    { label: '8進数', value: oct, setter: setOct, base: 8, id: 'oct' },
    { label: '16進数', value: hex, setter: setHex, base: 16, id: 'hex' },
  ] as const;

  return (
    <ToolPageLayout icon={Binary} title="数値基数変換">
      {fields.map(({ label, value, setter, base, id }) => (
        <div key={id} className="space-y-2">
          <div className="flex items-center justify-between">
            <label htmlFor={`base-${id}`} className="text-sm font-medium">{label}</label>
            <CopyButton copied={copiedKey === id} onClick={() => copy(value, id)} />
          </div>
          <Input
            id={`base-${id}`}
            value={value}
            onChange={(e) => { setter(e.target.value); update(e.target.value, base); }}
            placeholder={`${label}を入力...`}
            className="font-mono"
          />
        </div>
      ))}

      {error && <p className="text-sm text-destructive">{error}</p>}
    </ToolPageLayout>
  );
};

export default NumberBasePage;
