'use client';

import { CopyButton } from '@/components/CopyButton';
import { Button } from '@/components/ui/button';
import ToolPageLayout from '@/components/ToolPageLayout';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard';
import { FileText } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useCallback, useState } from 'react';
import { generateLoremIpsum } from './generateLoremIpsum';

const LoremIpsumPage = () => {
  const [paragraphs, setParagraphs] = useState(3);
  const [output, setOutput] = useState('');
  const { copiedKey, copy } = useCopyToClipboard();

  const handleGenerate = useCallback(() => {
    setOutput(generateLoremIpsum(paragraphs));
  }, [paragraphs]);

  return (
    <ToolPageLayout icon={FileText} title="Lorem Ipsum生成">
      <div className="space-y-2">
        <label htmlFor="lorem-paragraphs" className="text-sm font-medium">
          段落数
        </label>
        <Input
          id="lorem-paragraphs"
          type="number"
          min={1}
          max={50}
          value={paragraphs}
          onChange={(e) => setParagraphs(Number(e.target.value))}
        />
      </div>

      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        <Button type="button" className="w-full" onClick={handleGenerate}>
          生成
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
              <label htmlFor="lorem-output" className="text-sm font-medium">
                生成結果
              </label>
              <CopyButton copied={copiedKey !== null} onClick={() => copy(output)} />
            </div>
            <Textarea
              id="lorem-output"
              value={output}
              readOnly
              rows={10}
              className="font-mono"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </ToolPageLayout>
  );
};

export default LoremIpsumPage;
