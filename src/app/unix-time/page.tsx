'use client';

import { CopyButton } from '@/components/CopyButton';
import { Button } from '@/components/ui/button';
import ToolPageLayout from '@/components/ToolPageLayout';
import { Input } from '@/components/ui/input';
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard';
import { Clock } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useCallback, useState } from 'react';
import { dateToTimestamp, timestampToDate } from './convertUnixTime';

const Home = () => {
  const [timestampInput, setTimestampInput] = useState('');
  const [dateResult, setDateResult] = useState<{ iso: string; local: string } | null>(null);
  const [dateInput, setDateInput] = useState('');
  const [tsResult, setTsResult] = useState<{ seconds: number; milliseconds: number } | null>(null);
  const { copiedKey, copy } = useCopyToClipboard();

  const handleTimestampConvert = useCallback(() => {
    const num = Number(timestampInput);
    if (Number.isNaN(num)) return;
    setDateResult(timestampToDate(num));
  }, [timestampInput]);

  const handleDateConvert = useCallback(() => {
    if (!dateInput) return;
    setTsResult(dateToTimestamp(dateInput));
  }, [dateInput]);

  const handleNow = useCallback(() => {
    const now = Date.now();
    const seconds = Math.floor(now / 1000);
    setTimestampInput(String(seconds));
    setDateResult(timestampToDate(seconds));
    const date = new Date(now);
    const local = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}T${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}`;
    setDateInput(local);
    setTsResult({ seconds, milliseconds: now });
  }, []);

  return (
    <ToolPageLayout icon={Clock} title="Unix時間変換" contentClassName="space-y-6">
      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        <Button type="button" className="w-full" onClick={handleNow}>
          現在時刻
        </Button>
      </motion.div>

      <div className="space-y-4">
        <h3 className="text-sm font-semibold">タイムスタンプ → 日時</h3>
        <div className="flex gap-2">
          <Input
            type="number"
            value={timestampInput}
            onChange={(e) => setTimestampInput(e.target.value)}
            placeholder="例: 1700000000"
            className="font-mono"
          />
          <Button onClick={handleTimestampConvert}>変換</Button>
        </div>
        <AnimatePresence>
          {dateResult && (
            <motion.div
              className="space-y-2 rounded-md border p-3"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">ISO 8601</span>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sm">{dateResult.iso}</span>
                  <CopyButton copied={copiedKey === 'iso'} onClick={() => copy(dateResult.iso, 'iso')} />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">ローカル日時</span>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sm">{dateResult.local}</span>
                  <CopyButton copied={copiedKey === 'local'} onClick={() => copy(dateResult.local, 'local')} />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <hr />

      <div className="space-y-4">
        <h3 className="text-sm font-semibold">日時 → タイムスタンプ</h3>
        <div className="flex gap-2">
          <Input
            type="datetime-local"
            value={dateInput}
            onChange={(e) => setDateInput(e.target.value)}
            step="1"
            className="font-mono"
          />
          <Button onClick={handleDateConvert}>変換</Button>
        </div>
        <AnimatePresence>
          {tsResult && (
            <motion.div
              className="space-y-2 rounded-md border p-3"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">秒</span>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sm">{tsResult.seconds}</span>
                  <CopyButton copied={copiedKey === 'seconds'} onClick={() => copy(String(tsResult.seconds), 'seconds')} />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">ミリ秒</span>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sm">{tsResult.milliseconds}</span>
                  <CopyButton copied={copiedKey === 'milliseconds'} onClick={() => copy(String(tsResult.milliseconds), 'milliseconds')} />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ToolPageLayout>
  );
};

export default Home;
