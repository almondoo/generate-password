'use client';

import ToolPageLayout from '@/components/ToolPageLayout';
import { Textarea } from '@/components/ui/textarea';
import { CaseSensitive } from 'lucide-react';
import { useMemo, useState } from 'react';
import { countChars } from './countChars';

const CharCountPage = () => {
  const [text, setText] = useState('');
  const result = useMemo(() => countChars(text), [text]);

  return (
    <ToolPageLayout icon={CaseSensitive} title="文字数カウント">
      <div className="space-y-2">
        <label htmlFor="char-count-input" className="text-sm font-medium">
          テキスト
        </label>
        <Textarea
          id="char-count-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="テキストを入力..."
          rows={8}
          className="font-mono"
        />
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <div className="rounded-md border p-3 text-center">
          <p className="text-2xl font-bold">{result.chars}</p>
          <p className="text-sm text-muted-foreground">文字数</p>
        </div>
        <div className="rounded-md border p-3 text-center">
          <p className="text-2xl font-bold">{result.words}</p>
          <p className="text-sm text-muted-foreground">単語数</p>
        </div>
        <div className="rounded-md border p-3 text-center">
          <p className="text-2xl font-bold">{result.lines}</p>
          <p className="text-sm text-muted-foreground">行数</p>
        </div>
        <div className="rounded-md border p-3 text-center">
          <p className="text-2xl font-bold">{result.bytes}</p>
          <p className="text-sm text-muted-foreground">バイト数</p>
        </div>
      </div>
    </ToolPageLayout>
  );
};

export default CharCountPage;
