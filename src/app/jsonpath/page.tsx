'use client';

import { CopyButton } from '@/components/CopyButton';
import ToolPageLayout from '@/components/ToolPageLayout';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard';
import { Search } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useMemo, useState } from 'react';
import { queryJsonPath } from './queryJsonPath';

const JsonPathPage = () => {
  const [json, setJson] = useState('');
  const [path, setPath] = useState('$');
  const { copiedKey, copy } = useCopyToClipboard();

  const { result, error } = useMemo(() => {
    if (!json.trim() || !path.trim()) return { result: '', error: '' };
    try {
      return { result: queryJsonPath(json, path), error: '' };
    } catch (e) {
      return { result: '', error: e instanceof Error ? e.message : '無効な入力です。' };
    }
  }, [json, path]);

  return (
    <ToolPageLayout icon={Search} title="JSONPathテスト">
      <div className="space-y-2">
        <label htmlFor="jsonpath-json" className="text-sm font-medium">JSON</label>
        <Textarea
          id="jsonpath-json"
          value={json}
          onChange={(e) => setJson(e.target.value)}
          placeholder="JSONを入力..."
          rows={8}
          className="font-mono"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="jsonpath-query" className="text-sm font-medium">JSONPathクエリ</label>
        <Input
          id="jsonpath-query"
          value={path}
          onChange={(e) => setPath(e.target.value)}
          placeholder="$.store.book[*].title"
          className="font-mono"
        />
      </div>

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
            <div className="flex items-center justify-between">
              <label htmlFor="jsonpath-result" className="text-sm font-medium">結果</label>
              <CopyButton copied={copiedKey !== null} onClick={() => copy(result)} />
            </div>
            <Textarea id="jsonpath-result" value={result} readOnly rows={8} className="font-mono" />
          </motion.div>
        )}
      </AnimatePresence>
    </ToolPageLayout>
  );
};

export default JsonPathPage;
