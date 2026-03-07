import { Button } from '@/components/ui/button';
import { Check, Copy } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

export const CopyButton = ({
  copied,
  onClick,
}: {
  copied: boolean;
  onClick: () => void;
}) => (
  <Button
    variant="ghost"
    size="icon"
    className="h-8 w-8"
    onClick={onClick}
    aria-label={copied ? 'コピー済み' : 'コピー'}
  >
    <AnimatePresence mode="wait" initial={false}>
      {copied ? (
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
);
