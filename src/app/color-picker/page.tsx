'use client';

import { CopyButton } from '@/components/CopyButton';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
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
    <div className="space-y-6 py-6">
      <Card>
        <CardHeader className="text-center">
          <Palette className="mx-auto h-8 w-8 text-muted-foreground" />
          <CardTitle className="text-xl">カラーピッカー</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
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
        </CardContent>
      </Card>
    </div>
  );
};

export default ColorPickerPage;
