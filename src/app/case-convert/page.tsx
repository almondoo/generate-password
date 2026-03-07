'use client';

import { CopyButton } from '@/components/CopyButton';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard';
import { CaseSensitive } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useMemo, useState } from 'react';
import { convertAllCases } from './convertCase';

const CaseConvertPage = () => {
  const [input, setInput] = useState('');
  const { copiedKey, copy } = useCopyToClipboard();

  const results = useMemo(() => {
    if (!input.trim()) return null;
    return convertAllCases(input);
  }, [input]);

  const cases = [
    { label: 'camelCase', key: 'camelCase' as const },
    { label: 'PascalCase', key: 'pascalCase' as const },
    { label: 'snake_case', key: 'snakeCase' as const },
    { label: 'UPPER_SNAKE_CASE', key: 'upperSnakeCase' as const },
    { label: 'kebab-case', key: 'kebabCase' as const },
  ];

  return (
    <div className="space-y-6 py-6">
      <Card>
        <CardHeader className="text-center">
          <CaseSensitive className="mx-auto h-8 w-8 text-muted-foreground" />
          <CardTitle className="text-xl">ケース変換</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="case-input" className="text-sm font-medium">入力テキスト</label>
            <Input
              id="case-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="変換するテキストを入力..."
              className="font-mono"
            />
          </div>

          <AnimatePresence>
            {results && (
              <motion.div
                className="space-y-3"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
              >
                {cases.map(({ label, key }) => (
                  <div key={key} className="space-y-1">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium">{label}</label>
                      <CopyButton copied={copiedKey === key} onClick={() => copy(results[key], key)} />
                    </div>
                    <Input value={results[key]} readOnly className="font-mono" />
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

export default CaseConvertPage;
