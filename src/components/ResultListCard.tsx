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
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -12, scale: 0.98 }}
        transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <Card className="shadow-md">
          <CardContent className="pt-6">
            {notice}
            <motion.div
              className="space-y-2"
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.04 } } }}
            >
              {results.map((v, i) => (
                <motion.div
                  key={`${v}-${i}`}
                  className="flex cursor-pointer items-center gap-2 rounded-md border bg-muted/50 px-3 py-2 transition-colors hover:bg-accent"
                  variants={{
                    hidden: { opacity: 0, x: -12 },
                    visible: { opacity: 1, x: 0 },
                  }}
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
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
                          initial={{ scale: 0, rotate: -90 }}
                          animate={{ scale: 1, rotate: 0 }}
                          exit={{ scale: 0, rotate: 90 }}
                          transition={{ duration: 0.2, type: 'spring', stiffness: 300 }}
                        >
                          <Check className="h-4 w-4 text-primary" />
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
