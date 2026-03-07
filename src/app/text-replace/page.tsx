'use client';

import { CopyButton } from '@/components/CopyButton';
import { Button } from '@/components/ui/button';
import ToolPageLayout from '@/components/ToolPageLayout';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard';
import { Replace } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useCallback, useState } from 'react';
import { replaceText } from './replaceText';

const TextReplacePage = () => {
  const [input, setInput] = useState('');
  const [search, setSearch] = useState('');
  const [replacement, setReplacement] = useState('');
  const [useRegex, setUseRegex] = useState(false);
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const { copiedKey, copy } = useCopyToClipboard();

  const handleReplace = useCallback(() => {
    setError('');
    try {
      setOutput(replaceText(input, search, replacement, useRegex));
    } catch {
      setError('正規表現が不正です。');
      setOutput('');
    }
  }, [input, search, replacement, useRegex]);

  return (
    <ToolPageLayout icon={Replace} title="テキスト置換">
      <div className="space-y-2">
        <label htmlFor="replace-input" className="text-sm font-medium">
          テキスト
        </label>
        <Textarea
          id="replace-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="テキストを入力..."
          rows={6}
          className="font-mono"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="replace-search" className="text-sm font-medium">
            検索文字列
          </label>
          <Input
            id="replace-search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="検索..."
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="replace-replacement" className="text-sm font-medium">
            置換文字列
          </label>
          <Input
            id="replace-replacement"
            value={replacement}
            onChange={(e) => setReplacement(e.target.value)}
            placeholder="置換..."
          />
        </div>
      </div>

      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={useRegex}
          onChange={(e) => setUseRegex(e.target.checked)}
        />
        正規表現を使用
      </label>

      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        <Button type="button" className="w-full" onClick={handleReplace}>
          置換実行
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
              <label htmlFor="replace-output" className="text-sm font-medium">
                結果
              </label>
              <CopyButton copied={copiedKey !== null} onClick={() => copy(output)} />
            </div>
            <Textarea
              id="replace-output"
              value={output}
              readOnly
              rows={6}
              className="font-mono"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </ToolPageLayout>
  );
};

export default TextReplacePage;
