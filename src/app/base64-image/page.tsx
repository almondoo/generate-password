'use client';

import { CopyButton } from '@/components/CopyButton';
import { Button } from '@/components/ui/button';
import ToolPageLayout from '@/components/ToolPageLayout';
import { Textarea } from '@/components/ui/textarea';
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard';
import { ImageIcon } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useCallback, useState } from 'react';

const Base64ImagePage = () => {
  const [base64Output, setBase64Output] = useState('');
  const [previewInput, setPreviewInput] = useState('');
  const [previewSrc, setPreviewSrc] = useState('');
  const { copiedKey, copy } = useCopyToClipboard();

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setBase64Output(reader.result as string);
    };
    reader.readAsDataURL(file);
  }, []);

  const handlePreview = useCallback(() => {
    const src = previewInput.startsWith('data:') ? previewInput : `data:image/png;base64,${previewInput}`;
    setPreviewSrc(src);
  }, [previewInput]);

  return (
    <ToolPageLayout icon={ImageIcon} title="Base64画像変換" contentClassName="space-y-6">
      <div className="space-y-4">
        <h3 className="text-sm font-medium">画像 → Base64</h3>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="block w-full text-sm file:mr-4 file:rounded file:border-0 file:bg-primary file:px-4 file:py-2 file:text-sm file:font-medium file:text-primary-foreground hover:file:bg-primary/90"
        />
        <AnimatePresence>
          {base64Output && (
            <motion.div
              className="space-y-2"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center justify-between">
                <label htmlFor="b64-output" className="text-sm font-medium">
                  Base64出力
                </label>
                <CopyButton copied={copiedKey !== null} onClick={() => copy(base64Output)} />
              </div>
              <Textarea
                id="b64-output"
                value={base64Output}
                readOnly
                rows={4}
                className="font-mono text-xs"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <hr />

      <div className="space-y-4">
        <h3 className="text-sm font-medium">Base64 → 画像プレビュー</h3>
        <Textarea
          value={previewInput}
          onChange={(e) => setPreviewInput(e.target.value)}
          placeholder="Base64文字列を貼り付け..."
          rows={4}
          className="font-mono text-xs"
        />
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button type="button" className="w-full" onClick={handlePreview}>
            プレビュー
          </Button>
        </motion.div>
        {previewSrc && (
          <div className="flex justify-center">
            <img src={previewSrc} alt="プレビュー" className="max-h-64 rounded border" />
          </div>
        )}
      </div>
    </ToolPageLayout>
  );
};

export default Base64ImagePage;
