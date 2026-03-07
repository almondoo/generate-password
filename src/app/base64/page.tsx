'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeftRight, Check, Copy } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useCallback, useRef, useState } from 'react';
import { toast } from 'sonner';
import { decodeBase64, encodeBase64 } from './convertBase64';

type Mode = 'encode' | 'decode';

const Home = () => {
  const [mode, setMode] = useState<Mode>('encode');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const copiedTimer = useRef<ReturnType<typeof setTimeout>>(null);

  const handleConvert = useCallback(() => {
    setError('');
    try {
      if (mode === 'encode') {
        setOutput(encodeBase64(input));
      } else {
        setOutput(decodeBase64(input));
      }
    } catch {
      setError('変換に失敗しました。入力値を確認してください。');
      setOutput('');
    }
  }, [mode, input]);

  const handleCopy = useCallback(() => {
    navigator.clipboard
      .writeText(output)
      .then(() => {
        toast.success('コピーしました！');
        setCopied(true);
        if (copiedTimer.current) clearTimeout(copiedTimer.current);
        copiedTimer.current = setTimeout(() => setCopied(false), 2000);
      })
      .catch(() => toast.error('コピーに失敗しました！'));
  }, [output]);

  const toggleMode = useCallback(() => {
    setMode((prev) => (prev === 'encode' ? 'decode' : 'encode'));
    setInput(output);
    setOutput('');
    setError('');
  }, [output]);

  return (
    <div className="space-y-6 py-6">
      <Card>
        <CardHeader className="text-center">
          <ArrowLeftRight className="mx-auto h-8 w-8 text-muted-foreground" />
          <CardTitle className="text-xl">Base64 エンコード/デコード</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-2">
            <Button
              variant={mode === 'encode' ? 'default' : 'outline'}
              onClick={() => { setMode('encode'); setError(''); }}
            >
              エンコード
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMode}
              aria-label="入出力を入れ替える"
            >
              <ArrowLeftRight className="h-4 w-4" />
            </Button>
            <Button
              variant={mode === 'decode' ? 'default' : 'outline'}
              onClick={() => { setMode('decode'); setError(''); }}
            >
              デコード
            </Button>
          </div>

          <div className="space-y-2">
            <label htmlFor="base64-input" className="text-sm font-medium">
              {mode === 'encode' ? 'テキスト' : 'Base64'}
            </label>
            <Textarea
              id="base64-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={mode === 'encode' ? 'エンコードするテキストを入力...' : 'デコードするBase64を入力...'}
              rows={5}
              className="font-mono"
            />
          </div>

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button type="button" className="w-full" onClick={handleConvert}>
              {mode === 'encode' ? 'エンコード' : 'デコード'}
            </Button>
          </motion.div>

          {error && (
            <p className="text-sm text-destructive">{error}</p>
          )}

          <AnimatePresence>
            {output && (
              <motion.div
                className="space-y-2"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center justify-between">
                  <label htmlFor="base64-output" className="text-sm font-medium">
                    {mode === 'encode' ? 'Base64' : 'テキスト'}
                  </label>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={handleCopy}
                    aria-label={copied ? 'コピー済み' : 'コピー'}
                  >
                    <AnimatePresence mode="wait" initial={false}>
                      {copied ? (
                        <motion.span
                          key="check"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                          transition={{ duration: 0.15 }}
                        >
                          <Check className="h-4 w-4 text-green-500" />
                        </motion.span>
                      ) : (
                        <motion.span
                          key="copy"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                          transition={{ duration: 0.15 }}
                        >
                          <Copy className="h-4 w-4" />
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </Button>
                </div>
                <Textarea
                  id="base64-output"
                  value={output}
                  readOnly
                  rows={5}
                  className="font-mono"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </div>
  );
};

export default Home;
