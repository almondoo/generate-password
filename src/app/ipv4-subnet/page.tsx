'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Network } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useCallback, useState } from 'react';
import type { SubnetResult } from './calcSubnet';
import { calcSubnet } from './calcSubnet';

const Ipv4SubnetPage = () => {
  const [cidr, setCidr] = useState('');
  const [result, setResult] = useState<SubnetResult | null>(null);
  const [error, setError] = useState('');

  const handleCalc = useCallback(() => {
    setError('');
    try {
      setResult(calcSubnet(cidr));
    } catch {
      setError('無効なCIDR表記です。例: 192.168.1.0/24');
      setResult(null);
    }
  }, [cidr]);

  const fields = result ? [
    { label: 'ネットワークアドレス', value: result.networkAddress },
    { label: 'ブロードキャストアドレス', value: result.broadcastAddress },
    { label: 'サブネットマスク', value: result.subnetMask },
    { label: 'ホスト範囲', value: `${result.hostMin} - ${result.hostMax}` },
    { label: 'ホスト数', value: result.hostCount.toLocaleString() },
  ] : [];

  return (
    <div className="space-y-6 py-6">
      <Card>
        <CardHeader className="text-center">
          <Network className="mx-auto h-8 w-8 text-muted-foreground" />
          <CardTitle className="text-xl">IPv4サブネット計算</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="cidr-input" className="text-sm font-medium">CIDR表記</label>
            <Input
              id="cidr-input"
              value={cidr}
              onChange={(e) => setCidr(e.target.value)}
              placeholder="192.168.1.0/24"
              className="font-mono"
            />
          </div>

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button type="button" className="w-full" onClick={handleCalc}>
              計算
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
                {fields.map(({ label, value }) => (
                  <div key={label} className="flex justify-between rounded border p-2 text-sm">
                    <span className="text-muted-foreground">{label}</span>
                    <span className="font-mono font-medium">{value}</span>
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

export default Ipv4SubnetPage;
