'use client';

import { CopyButton } from '@/components/CopyButton';
import { Button } from '@/components/ui/button';
import ToolPageLayout from '@/components/ToolPageLayout';
import { Input } from '@/components/ui/input';
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard';
import { ArrowLeftRight, Clock } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useCallback, useRef, useState, type RefObject } from 'react';
import {
  buildCron,
  DOM_OPTIONS,
  DOW_OPTIONS,
  HOUR_OPTIONS,
  MINUTE_OPTIONS,
  MONTH_OPTIONS,
  type CronSchedule,
} from './buildCron';
import { describeCron, getNextExecutions } from './parseCron';

type Mode = 'parse' | 'build';

const CronPage = () => {
  const [mode, setMode] = useState<Mode>('parse');

  // Parse mode
  const [expression, setExpression] = useState('');
  const [description, setDescription] = useState('');
  const [nextDates, setNextDates] = useState<Date[]>([]);
  const [error, setError] = useState('');

  // Build mode
  const [schedule, setSchedule] = useState<CronSchedule>({
    minute: '0',
    hour: '*',
    dayOfMonth: '*',
    month: '*',
    dayOfWeek: '*',
  });
  const [buildResult, setBuildResult] = useState('');
  const [buildDescription, setBuildDescription] = useState('');
  const [buildNextDates, setBuildNextDates] = useState<Date[]>([]);
  const [buildError, setBuildError] = useState('');
  const { copiedKey, copy } = useCopyToClipboard();
  const buildResultRef = useRef<HTMLDivElement>(null);

  const handleParse = useCallback(() => {
    setError('');
    setDescription('');
    setNextDates([]);
    if (!expression.trim()) return;
    try {
      setDescription(describeCron(expression));
      setNextDates(getNextExecutions(expression, 5));
    } catch (e) {
      setError(e instanceof Error ? e.message : '無効なCron式です。');
    }
  }, [expression]);

  const handleBuild = useCallback(() => {
    setBuildError('');
    setBuildDescription('');
    setBuildNextDates([]);
    const expr = buildCron(schedule);
    setBuildResult(expr);
    try {
      setBuildDescription(describeCron(expr));
      setBuildNextDates(getNextExecutions(expr, 5));
      setTimeout(() => buildResultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 100);
    } catch (e) {
      setBuildError(e instanceof Error ? e.message : 'Cron式の生成に失敗しました。');
    }
  }, [schedule]);

  const toggleMode = useCallback(() => {
    setMode((prev) => (prev === 'parse' ? 'build' : 'parse'));
    setError('');
    setBuildError('');
  }, []);

  const updateField = (field: keyof CronSchedule, value: string) => {
    setSchedule((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <ToolPageLayout icon={Clock} title={`Cron式 ${mode === 'parse' ? '解説' : 'ビルダー'}`}>
      <div className="flex items-center gap-2">
        <Button
          variant={mode === 'parse' ? 'default' : 'outline'}
          onClick={() => { setMode('parse'); setError(''); }}
        >
          解説
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleMode}
          aria-label="モード切替"
        >
          <ArrowLeftRight className="h-4 w-4" />
        </Button>
        <Button
          variant={mode === 'build' ? 'default' : 'outline'}
          onClick={() => { setMode('build'); setBuildError(''); }}
        >
          ビルダー
        </Button>
      </div>

      <AnimatePresence mode="wait">
        {mode === 'parse' ? (
          <motion.div
            key="parse"
            className="space-y-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.2 }}
          >
            <div className="space-y-2">
              <label htmlFor="cron-input" className="text-sm font-medium">Cron式</label>
              <Input
                id="cron-input"
                value={expression}
                onChange={(e) => setExpression(e.target.value)}
                placeholder="* * * * *"
                className="font-mono"
              />
            </div>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button type="button" className="w-full" onClick={handleParse}>
                解析
              </Button>
            </motion.div>

            {error && <p className="text-sm text-destructive">{error}</p>}

            <AnimatePresence>
              {description && (
                <motion.div
                  className="space-y-4"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="rounded border p-3">
                    <p className="text-sm font-medium text-muted-foreground">説明</p>
                    <p className="text-lg">{description}</p>
                  </div>
                  {nextDates.length > 0 && (
                    <div className="rounded border p-3">
                      <p className="text-sm font-medium text-muted-foreground mb-2">次回実行日時（5件）</p>
                      <ul className="space-y-1">
                        {nextDates.map((date, i) => (
                          <li key={i} className="font-mono text-sm">
                            {date.toLocaleString('ja-JP')}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div
            key="build"
            className="space-y-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            <SelectField label="分" options={MINUTE_OPTIONS} value={schedule.minute} customizable onChange={(v) => updateField('minute', v)} />
            <SelectField label="時" options={HOUR_OPTIONS} value={schedule.hour} customizable onChange={(v) => updateField('hour', v)} />
            <SelectField label="日" options={DOM_OPTIONS} value={schedule.dayOfMonth} customizable onChange={(v) => updateField('dayOfMonth', v)} />
            <SelectField label="月" options={MONTH_OPTIONS} value={schedule.month} customizable onChange={(v) => updateField('month', v)} />
            <SelectField label="曜日" options={DOW_OPTIONS} value={schedule.dayOfWeek} customizable onChange={(v) => updateField('dayOfWeek', v)} />

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button type="button" className="w-full" onClick={handleBuild}>
                生成
              </Button>
            </motion.div>

            {buildError && <p className="text-sm text-destructive">{buildError}</p>}

            <AnimatePresence>
              {buildResult && (
                <motion.div
                  ref={buildResultRef as RefObject<HTMLDivElement>}
                  className="space-y-4"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="rounded border p-3">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-muted-foreground">Cron式</p>
                      <CopyButton copied={copiedKey !== null} onClick={() => copy(buildResult)} />
                    </div>
                    <p className="text-lg font-mono">{buildResult}</p>
                  </div>
                  {buildDescription && (
                    <div className="rounded border p-3">
                      <p className="text-sm font-medium text-muted-foreground">説明</p>
                      <p className="text-lg">{buildDescription}</p>
                    </div>
                  )}
                  {buildNextDates.length > 0 && (
                    <div className="rounded border p-3">
                      <p className="text-sm font-medium text-muted-foreground mb-2">次回実行日時（5件）</p>
                      <ul className="space-y-1">
                        {buildNextDates.map((date, i) => (
                          <li key={i} className="font-mono text-sm">
                            {date.toLocaleString('ja-JP')}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </ToolPageLayout>
  );
};

const SelectField = ({
  label,
  options,
  value,
  customizable,
  onChange,
}: {
  label: string;
  options: readonly { label: string; value: string }[];
  value: string;
  customizable?: boolean;
  onChange: (value: string) => void;
}) => {
  const isCustom = !options.some((o) => o.value === value);

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">{label}</label>
      <div className="flex flex-wrap gap-1.5">
        {options.map((o) => (
          <Button
            key={o.value}
            variant={value === o.value ? 'default' : 'outline'}
            size="sm"
            onClick={() => onChange(o.value)}
          >
            {o.label}
          </Button>
        ))}
        {customizable && (
          <Button
            variant={isCustom ? 'default' : 'outline'}
            size="sm"
            onClick={() => {
              if (!isCustom) onChange('');
            }}
          >
            カスタム
          </Button>
        )}
      </div>
      {customizable && isCustom && (
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="例: 0,15,30,45"
          className="font-mono"
        />
      )}
    </div>
  );
};

export default CronPage;
