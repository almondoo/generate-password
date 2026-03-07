'use client';

import { CopyButton } from '@/components/CopyButton';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard';
import { Globe } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useCallback, useState } from 'react';
import type { IpResult } from './convertIp';
import { convertIp } from './convertIp';

const IpConvertPage = () => {
  const [ip, setIp] = useState('');
  const [result, setResult] = useState<IpResult | null>(null);
  const [error, setError] = useState('');
  const { copiedKey, copy } = useCopyToClipboard();

  const handleConvert = useCallback(() => {
    setError('');
    try {
      setResult(convertIp(ip));
    } catch {
      setError('無効なIPv4アドレスです。');
      setResult(null);
    }
  }, [ip]);

  const fields = result ? [
    { label: '10進数', value: result.decimal, key: 'decimal' },
    { label: '2進数', value: result.binary, key: 'binary' },
    { label: '16進数', value: result.hex, key: 'hex' },
    { label: 'IPv6マッピング', value: result.ipv6Mapped, key: 'ipv6' },
  ] : [];

  return (
    <div className="space-y-6 py-6">
      <Card>
        <CardHeader className="text-center">
          <Globe className="mx-auto h-8 w-8 text-muted-foreground" />
          <CardTitle className="text-xl">IPアドレス変換</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="ip-input" className="text-sm font-medium">IPv4アドレス</label>
            <Input
              id="ip-input"
              value={ip}
              onChange={(e) => setIp(e.target.value)}
              placeholder="192.168.1.1"
              className="font-mono"
            />
          </div>

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button type="button" className="w-full" onClick={handleConvert}>
              変換
            </Button>
          </motion.div>

          {error && <p className="text-sm text-destructive">{error}</p>}

          <AnimatePresence>
            {result && (
              <motion.div
                className="space-y-2"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
              >
                {fields.map(({ label, value, key }) => (
                  <div key={key} className="flex items-center justify-between rounded border p-2 text-sm">
                    <div>
                      <span className="text-muted-foreground">{label}: </span>
                      <span className="font-mono font-medium">{value}</span>
                    </div>
                    <CopyButton copied={copiedKey === key} onClick={() => copy(value, key)} />
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </div>
  );
};

export default IpConvertPage;
