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
import { ArrowDownAZ } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useCallback, useState } from 'react';
import { type SortMode, sortText } from './sortText';

const TextSortPage = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<SortMode>('asc');
  const { copiedKey, copy } = useCopyToClipboard();

  const handleSort = useCallback(() => {
    setOutput(sortText(input, mode));
  }, [input, mode]);

  return (
    <div className="space-y-6 py-6">
      <Card>
        <CardHeader className="text-center">
          <ArrowDownAZ className="mx-auto h-8 w-8 text-muted-foreground" />
          <CardTitle className="text-xl">テキストソート</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="sort-input" className="text-sm font-medium">
              テキスト（行単位）
            </label>
            <Textarea
              id="sort-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="ソートするテキストを入力（1行1項目）..."
              rows={8}
              className="font-mono"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {([['asc', '昇順'], ['desc', '降順'], ['unique', '重複除去'], ['shuffle', 'シャッフル']] as const).map(([value, label]) => (
              <Button
                key={value}
                variant={mode === value ? 'default' : 'outline'}
                onClick={() => setMode(value)}
              >
                {label}
              </Button>
            ))}
          </div>

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button type="button" className="w-full" onClick={handleSort}>
              ソート実行
            </Button>
          </motion.div>

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
                  <label htmlFor="sort-output" className="text-sm font-medium">
                    結果
                  </label>
                  <CopyButton copied={copiedKey !== null} onClick={() => copy(output)} />
                </div>
                <Textarea
                  id="sort-output"
                  value={output}
                  readOnly
                  rows={8}
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

export default TextSortPage;
