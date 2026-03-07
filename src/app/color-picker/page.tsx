'use client';

import { CopyButton } from '@/components/CopyButton';
import ToolPageLayout from '@/components/ToolPageLayout';
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard';
import { Palette } from 'lucide-react';
import { useState } from 'react';
import { convertColor } from './convertColor';

const ColorPickerPage = () => {
  const [hex, setHex] = useState('#000000');
  const colors = convertColor(hex);
  const { copiedKey, copy } = useCopyToClipboard();

  const colorEntries = [
    { label: 'HEX', value: colors.hex, field: 'hex' },
    { label: 'RGB', value: colors.rgb, field: 'rgb' },
    { label: 'HSL', value: colors.hsl, field: 'hsl' },
  ];

  return (
    <ToolPageLayout icon={Palette} title="カラーピッカー">
      <div className="flex items-center justify-center gap-4">
        <input
          type="color"
          value={hex}
          onChange={(e) => setHex(e.target.value)}
          className="h-16 w-16 cursor-pointer rounded border"
        />
        <div
          className="h-16 w-32 rounded border"
          style={{ backgroundColor: hex }}
        />
      </div>

      <div className="space-y-3">
        {colorEntries.map(({ label, value, field }) => (
          <div key={field} className="flex items-center justify-between rounded-md border p-3">
            <div>
              <p className="text-xs text-muted-foreground">{label}</p>
              <p className="font-mono text-sm">{value}</p>
            </div>
            <CopyButton copied={copiedKey === field} onClick={() => copy(value, field)} />
          </div>
        ))}
      </div>
    </ToolPageLayout>
  );
};

export default ColorPickerPage;
