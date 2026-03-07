import { useCallback, useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';

export default function useResultList(results: string[]) {
  const resultRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (results.length > 0) {
      resultRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [results]);

  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const copiedTimer = useRef<ReturnType<typeof setTimeout>>(null);

  const handleCopy = useCallback((value: string, index: number) => {
    navigator.clipboard
      .writeText(value)
      .then(() => {
        toast.success('コピーしました！');
        setCopiedIndex(index);
        if (copiedTimer.current) clearTimeout(copiedTimer.current);
        copiedTimer.current = setTimeout(() => setCopiedIndex(null), 2000);
      })
      .catch(() => toast.error('コピーに失敗しました！'));
  }, []);

  return { resultRef, copiedIndex, handleCopy };
}
