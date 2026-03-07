'use client';

import { CopyButton } from '@/components/CopyButton';
import ToolPageLayout from '@/components/ToolPageLayout';
import { Input } from '@/components/ui/input';
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard';
import { Palette } from 'lucide-react';
import { useCallback, useState } from 'react';
import type { ColorResult } from './convertColor';
import { fromHex, fromHsl, fromRgb } from './convertColor';

const ColorConvertPage = () => {
  const [hexInput, setHexInput] = useState('#000000');
  const [rInput, setRInput] = useState('0');
  const [gInput, setGInput] = useState('0');
  const [bInput, setBInput] = useState('0');
  const [hInput, setHInput] = useState('0');
  const [sInput, setSInput] = useState('0');
  const [lInput, setLInput] = useState('0');
  const [error, setError] = useState('');
  const { copiedKey, copy } = useCopyToClipboard();

  const applyResult = useCallback((result: ColorResult, source: 'hex' | 'rgb' | 'hsl') => {
    setError('');
    if (source !== 'hex') setHexInput(result.hex);
    if (source !== 'rgb') {
      setRInput(String(result.rgb.r));
      setGInput(String(result.rgb.g));
      setBInput(String(result.rgb.b));
    }
    if (source !== 'hsl') {
      setHInput(String(result.hsl.h));
      setSInput(String(result.hsl.s));
      setLInput(String(result.hsl.l));
    }
  }, []);

  const onHexChange = useCallback((value: string) => {
    setHexInput(value);
    try { applyResult(fromHex(value), 'hex'); } catch { setError('無効なHEX値です。'); }
  }, [applyResult]);

  const onRgbChange = useCallback((r: string, g: string, b: string) => {
    setRInput(r); setGInput(g); setBInput(b);
    try { applyResult(fromRgb({ r: Number(r), g: Number(g), b: Number(b) }), 'rgb'); } catch { setError('無効なRGB値です。'); }
  }, [applyResult]);

  const onHslChange = useCallback((h: string, s: string, l: string) => {
    setHInput(h); setSInput(s); setLInput(l);
    try { applyResult(fromHsl({ h: Number(h), s: Number(s), l: Number(l) }), 'hsl'); } catch { setError('無効なHSL値です。'); }
  }, [applyResult]);

  return (
    <ToolPageLayout icon={Palette} title="色変換">
      <div className="flex justify-center">
        <div className="h-20 w-20 rounded-lg border" style={{ backgroundColor: hexInput }} />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label htmlFor="color-hex" className="text-sm font-medium">HEX</label>
          <CopyButton copied={copiedKey === 'hex'} onClick={() => copy(hexInput, 'hex')} />
        </div>
        <Input id="color-hex" value={hexInput} onChange={(e) => onHexChange(e.target.value)} className="font-mono" placeholder="#000000" />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium">RGB</label>
          <CopyButton copied={copiedKey === 'rgb'} onClick={() => copy(`rgb(${rInput}, ${gInput}, ${bInput})`, 'rgb')} />
        </div>
        <div className="flex gap-2">
          <Input value={rInput} onChange={(e) => onRgbChange(e.target.value, gInput, bInput)} className="font-mono" placeholder="R" type="number" min={0} max={255} />
          <Input value={gInput} onChange={(e) => onRgbChange(rInput, e.target.value, bInput)} className="font-mono" placeholder="G" type="number" min={0} max={255} />
          <Input value={bInput} onChange={(e) => onRgbChange(rInput, gInput, e.target.value)} className="font-mono" placeholder="B" type="number" min={0} max={255} />
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium">HSL</label>
          <CopyButton copied={copiedKey === 'hsl'} onClick={() => copy(`hsl(${hInput}, ${sInput}%, ${lInput}%)`, 'hsl')} />
        </div>
        <div className="flex gap-2">
          <Input value={hInput} onChange={(e) => onHslChange(e.target.value, sInput, lInput)} className="font-mono" placeholder="H" type="number" min={0} max={360} />
          <Input value={sInput} onChange={(e) => onHslChange(hInput, e.target.value, lInput)} className="font-mono" placeholder="S" type="number" min={0} max={100} />
          <Input value={lInput} onChange={(e) => onHslChange(hInput, sInput, e.target.value)} className="font-mono" placeholder="L" type="number" min={0} max={100} />
        </div>
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}
    </ToolPageLayout>
  );
};

export default ColorConvertPage;
