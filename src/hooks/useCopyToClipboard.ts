import { useCallback, useRef, useState } from 'react';
import { toast } from 'sonner';

export function useCopyToClipboard() {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>(null);

  const copy = useCallback((text: string, key = '') => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        toast.success('コピーしました！');
        setCopiedKey(key);
        if (timer.current) clearTimeout(timer.current);
        timer.current = setTimeout(() => setCopiedKey(null), 2000);
      })
      .catch(() => toast.error('コピーに失敗しました！'));
  }, []);

  return { copiedKey, copy };
}
