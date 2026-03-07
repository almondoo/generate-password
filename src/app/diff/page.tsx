'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { diffLines } from 'diff';
import { GitCompareArrows } from 'lucide-react';
import { motion } from 'motion/react';
import { useCallback, useState } from 'react';

interface DiffPart {
  value: string;
  added?: boolean;
  removed?: boolean;
}

const DiffPage = () => {
  const [left, setLeft] = useState('');
  const [right, setRight] = useState('');
  const [result, setResult] = useState<DiffPart[]>([]);

  const handleDiff = useCallback(() => {
    setResult(diffLines(left, right));
  }, [left, right]);

  return (
    <div className="space-y-6 py-6">
      <Card>
        <CardHeader className="text-center">
          <GitCompareArrows className="mx-auto h-8 w-8 text-muted-foreground" />
          <CardTitle className="text-xl">Diff比較</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="diff-left" className="text-sm font-medium">
                テキスト1
              </label>
              <Textarea
                id="diff-left"
                value={left}
                onChange={(e) => setLeft(e.target.value)}
                placeholder="テキスト1を入力..."
                rows={8}
                className="font-mono"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="diff-right" className="text-sm font-medium">
                テキスト2
              </label>
              <Textarea
                id="diff-right"
                value={right}
                onChange={(e) => setRight(e.target.value)}
                placeholder="テキスト2を入力..."
                rows={8}
                className="font-mono"
              />
            </div>
          </div>

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button type="button" className="w-full" onClick={handleDiff}>
              比較
            </Button>
          </motion.div>

          {result.length > 0 && (
            <div className="rounded-md border p-4 font-mono text-sm whitespace-pre-wrap">
              {result.map((part, i) => (
                <span
                  key={i}
                  className={
                    part.added
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                      : part.removed
                        ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                        : ''
                  }
                >
                  {part.value}
                </span>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DiffPage;
