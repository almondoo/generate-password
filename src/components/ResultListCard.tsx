'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Check, Copy } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import type { ReactNode, RefObject } from 'react';

interface ResultListCardProps {
  results: string[];
  resultRef: RefObject<HTMLDivElement | null>;
  copiedIndex: number | null;
  onCopy: (value: string, index: number) => void;
  notice?: ReactNode;
}

const ResultListCard = ({
  results,
  resultRef,
  copiedIndex,
  onCopy,
  notice,
}: ResultListCardProps) => (
  <AnimatePresence>
    {results.length > 0 && (
      <motion.div
        ref={resultRef}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.3 }}
      >
        <Card>
          <CardContent className="pt-6">
            {notice}
            <motion.div
              className="space-y-2"
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.03 } } }}
            >
              {results.map((v, i) => (
                <motion.div
                  key={`${v}-${i}`}
                  className="flex cursor-pointer items-center gap-2 rounded-md border bg-muted/50 px-3 py-2 transition-colors hover:bg-muted"
                  variants={{
                    hidden: { opacity: 0, y: 8 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  onClick={() => onCopy(v, i)}
                >
                  <code className="flex-1 truncate font-mono text-sm">{v}</code>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 shrink-0"
                    onClick={() => onCopy(v, i)}
                    aria-label={copiedIndex === i ? 'コピー済み' : 'コピー'}
                  >
                    <AnimatePresence mode="wait" initial={false}>
                      {copiedIndex === i ? (
                        <motion.span
                          key="check"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                          transition={{ duration: 0.15 }}
                        >
                          <Check className="h-4 w-4 text-green-500" />
                        </motion.span>
                      ) : (
                        <motion.span
                          key="copy"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                          transition={{ duration: 0.15 }}
                        >
                          <Copy className="h-4 w-4" />
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </Button>
                </motion.div>
              ))}
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    )}
  </AnimatePresence>
);

export default ResultListCard;
