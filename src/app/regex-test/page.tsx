'use client';

import { Button } from '@/components/ui/button';
import ToolPageLayout from '@/components/ToolPageLayout';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Regex } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useMemo, useState } from 'react';
import { testRegex, type RegexMatch } from './testRegex';

const RegexTestPage = () => {
  const [pattern, setPattern] = useState('');
  const [flags, setFlags] = useState('g');
  const [text, setText] = useState('');
  const flagOptions = ['g', 'i', 'm'] as const;

  const { results, error } = useMemo<{ results: RegexMatch[]; error: string }>(() => {
    if (!pattern || !text) return { results: [], error: '' };
    try {
      return { results: testRegex(pattern, flags, text), error: '' };
    } catch (e) {
      return { results: [], error: e instanceof Error ? e.message : '無効な正規表現です。' };
    }
  }, [pattern, flags, text]);

  const toggleFlag = (flag: string) => {
    setFlags(prev => prev.includes(flag) ? prev.replace(flag, '') : prev + flag);
  };

  return (
    <ToolPageLayout icon={Regex} title="正規表現テスト">
      <div className="space-y-2">
        <label htmlFor="regex-pattern" className="text-sm font-medium">パターン</label>
        <Input
          id="regex-pattern"
          value={pattern}
          onChange={(e) => setPattern(e.target.value)}
          placeholder="正規表現パターンを入力..."
          className="font-mono"
        />
      </div>

      <div className="flex gap-2">
        {flagOptions.map(f => (
          <Button
            key={f}
            variant={flags.includes(f) ? 'default' : 'outline'}
            size="sm"
            onClick={() => toggleFlag(f)}
          >
            {f}
          </Button>
        ))}
      </div>

      <div className="space-y-2">
        <label htmlFor="regex-text" className="text-sm font-medium">テスト文字列</label>
        <Textarea
          id="regex-text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="テストする文字列を入力..."
          rows={5}
          className="font-mono"
        />
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <AnimatePresence>
        {results.length > 0 && (
          <motion.div
            className="space-y-2"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-sm font-medium">{results.length} 件マッチ</p>
            <div className="max-h-64 space-y-2 overflow-y-auto">
              {results.map((r, i) => (
                <div key={i} className="rounded border p-2 text-sm font-mono">
                  <p><span className="text-muted-foreground">マッチ:</span> <span className="text-primary font-bold">{r.match}</span> <span className="text-muted-foreground">(index: {r.index})</span></p>
                  {r.groups.length > 0 && (
                    <p><span className="text-muted-foreground">グループ:</span> {r.groups.map((g, j) => <span key={j} className="mr-2 inline-block rounded bg-muted px-1">${j + 1}: {g}</span>)}</p>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </ToolPageLayout>
  );
};

export default RegexTestPage;
