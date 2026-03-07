'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Monitor } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useMemo, useState } from 'react';
import { parseUserAgent } from './parseUserAgent';

const UserAgentPage = () => {
  const [ua, setUa] = useState('');

  useEffect(() => {
    setUa(navigator.userAgent);
  }, []);

  const result = useMemo(() => {
    if (!ua.trim()) return null;
    return parseUserAgent(ua);
  }, [ua]);

  const fields = result ? [
    { label: 'ブラウザ', value: result.browser },
    { label: 'OS', value: result.os },
    { label: 'デバイス', value: result.device },
    { label: 'エンジン', value: result.engine },
  ] : [];

  return (
    <div className="space-y-6 py-6">
      <Card>
        <CardHeader className="text-center">
          <Monitor className="mx-auto h-8 w-8 text-muted-foreground" />
          <CardTitle className="text-xl">User-Agent解析</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="ua-input" className="text-sm font-medium">User-Agent文字列</label>
            <Textarea
              id="ua-input"
              value={ua}
              onChange={(e) => setUa(e.target.value)}
              placeholder="User-Agent文字列を入力..."
              rows={3}
              className="font-mono"
            />
          </div>

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

export default UserAgentPage;
