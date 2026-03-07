'use client';

import { CopyButton } from '@/components/CopyButton';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard';
import { KeyRound } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useCallback, useState } from 'react';
import { type DecodedJwt, decodeJwt } from './decodeJwt';

const Home = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<DecodedJwt | null>(null);
  const [error, setError] = useState('');
  const { copiedKey, copy } = useCopyToClipboard();

  const handleDecode = useCallback(() => {
    setError('');
    try {
      setResult(decodeJwt(input.trim()));
    } catch (e) {
      setError(e instanceof Error ? e.message : 'デコードに失敗しました。');
      setResult(null);
    }
  }, [input]);

  return (
    <div className="space-y-6 py-6">
      <Card>
        <CardHeader className="text-center">
          <KeyRound className="mx-auto h-8 w-8 text-muted-foreground" />
          <CardTitle className="text-xl">JWTデコード</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="jwt-input" className="text-sm font-medium">
              JWT
            </label>
            <Textarea
              id="jwt-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="JWTを貼り付け..."
              rows={5}
              className="font-mono"
            />
          </div>

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button type="button" className="w-full" onClick={handleDecode}>
              デコード
            </Button>
          </motion.div>

          {error && <p className="text-sm text-destructive">{error}</p>}

          <AnimatePresence>
            {result && (
              <motion.div
                className="space-y-4"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
              >
                <SectionCard
                  label="Header"
                  value={result.header}
                  copied={copiedKey === 'header'}
                  onCopy={() => copy(result.header, 'header')}
                  mono
                />
                <SectionCard
                  label="Payload"
                  value={result.payload}
                  copied={copiedKey === 'payload'}
                  onCopy={() => copy(result.payload, 'payload')}
                  mono
                />
                <SectionCard
                  label="Signature"
                  value={result.signature}
                  copied={copiedKey === 'signature'}
                  onCopy={() => copy(result.signature, 'signature')}
                  mono={false}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </div>
  );
};

const SectionCard = ({
  label,
  value,
  copied,
  onCopy,
  mono,
}: {
  label: string;
  value: string;
  copied: boolean;
  onCopy: () => void;
  mono: boolean;
}) => (
  <Card>
    <CardHeader className="pb-2">
      <div className="flex items-center justify-between">
        <CardTitle className="text-sm">{label}</CardTitle>
        <CopyButton copied={copied} onClick={onCopy} />
      </div>
    </CardHeader>
    <CardContent>
      {mono ? (
        <Textarea
          value={value}
          readOnly
          rows={Math.min(value.split('\n').length, 10)}
          className="font-mono"
        />
      ) : (
        <p className="break-all text-sm text-muted-foreground">{value}</p>
      )}
    </CardContent>
  </Card>
);

export default Home;
