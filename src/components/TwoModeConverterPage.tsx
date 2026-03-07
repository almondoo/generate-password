'use client';

import { Button } from '@/components/ui/button';
import ToolPageLayout from '@/components/ToolPageLayout';
import { Textarea } from '@/components/ui/textarea';
import { CopyButton } from '@/components/CopyButton';
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard';
import { ArrowLeftRight } from 'lucide-react';
import type { ComponentType } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { useCallback, useState } from 'react';

interface ModeConfig {
  label: string;
  inputLabel: string;
  outputLabel: string;
  placeholder: string;
  buttonLabel: string;
  convert: (input: string) => string;
}

interface TwoModeConverterConfig {
  icon: ComponentType<{ className?: string }>;
  title: string;
  id: string;
  modeA: ModeConfig;
  modeB: ModeConfig;
  errorMessage?: string;
}

const TwoModeConverterPage = ({ config }: { config: TwoModeConverterConfig }) => {
  const [isA, setIsA] = useState(true);
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const { copiedKey, copy } = useCopyToClipboard();

  const mode = isA ? config.modeA : config.modeB;

  const handleConvert = useCallback(() => {
    setError('');
    try {
      setOutput(mode.convert(input));
    } catch {
      setError(config.errorMessage ?? '変換に失敗しました。入力値を確認してください。');
      setOutput('');
    }
  }, [mode, input, config.errorMessage]);

  const toggleMode = useCallback(() => {
    setIsA((prev) => !prev);
    setInput(output);
    setOutput('');
    setError('');
  }, [output]);

  return (
    <ToolPageLayout icon={config.icon} title={config.title}>
      <div className="flex items-center gap-2">
        <Button
          variant={isA ? 'default' : 'outline'}
          onClick={() => { setIsA(true); setError(''); }}
        >
          {config.modeA.label}
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleMode}
          aria-label="入出力を入れ替える"
        >
          <ArrowLeftRight className="h-4 w-4" />
        </Button>
        <Button
          variant={!isA ? 'default' : 'outline'}
          onClick={() => { setIsA(false); setError(''); }}
        >
          {config.modeB.label}
        </Button>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={isA ? 'a' : 'b'}
          className="space-y-4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.2 }}
        >
          <div className="space-y-2">
            <label htmlFor={`${config.id}-input`} className="text-sm font-medium">
              {mode.inputLabel}
            </label>
            <Textarea
              id={`${config.id}-input`}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={mode.placeholder}
              rows={5}
              className="font-mono"
            />
          </div>

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button type="button" className="w-full" onClick={handleConvert}>
              {mode.buttonLabel}
            </Button>
          </motion.div>

          {error && <p className="text-sm text-destructive">{error}</p>}

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
                  <label htmlFor={`${config.id}-output`} className="text-sm font-medium">
                    {mode.outputLabel}
                  </label>
                  <CopyButton copied={copiedKey !== null} onClick={() => copy(output)} />
                </div>
                <Textarea
                  id={`${config.id}-output`}
                  value={output}
                  readOnly
                  rows={5}
                  className="font-mono"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>
    </ToolPageLayout>
  );
};

export default TwoModeConverterPage;
