'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { Check, Copy, FileDigit } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { HashAlgorithm, HashInputs } from './generateHash';
import useGenerateHash from './useGenerateHash';
import useResultList from '../useResultList';

const ALGORITHMS: { value: HashAlgorithm; label: string }[] = [
  { value: 'SHA-1', label: 'SHA-1' },
  { value: 'SHA-256', label: 'SHA-256' },
  { value: 'SHA-512', label: 'SHA-512' },
];

const HashPage = () => {
  const { generatedHashes, handleGenerate } = useGenerateHash();
  const {
    control,
    handleSubmit,
  } = useForm<HashInputs>({
    defaultValues: {
      text: '',
      algorithm: 'SHA-256',
      uppercase: false,
    },
  });

  const onSubmit: SubmitHandler<HashInputs> = (data: HashInputs) => {
    handleGenerate(data);
  };

  const { resultRef, copiedIndex, handleCopy } = useResultList(generatedHashes);

  return (
    <div className="space-y-6 py-6">
      <Card>
        <CardHeader className="text-center">
          <FileDigit className="mx-auto h-8 w-8 text-muted-foreground" />
          <CardTitle className="text-xl">ハッシュ生成</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* テキスト入力 */}
            <div className="space-y-2">
              <Label htmlFor="textField" className="text-base font-semibold">
                入力テキスト
              </Label>
              <Controller
                name="text"
                control={control}
                render={({ field }) => (
                  <Textarea {...field} id="textField" placeholder="ハッシュ化するテキストを入力..." rows={4} />
                )}
              />
            </div>

            {/* アルゴリズム */}
            <div className="space-y-2">
              <Label className="text-base font-semibold">アルゴリズム</Label>
              <Controller
                name="algorithm"
                control={control}
                render={({ field }) => (
                  <RadioGroup
                    value={field.value}
                    onValueChange={(v) => field.onChange(v as HashAlgorithm)}
                    className="flex gap-3"
                  >
                    {ALGORITHMS.map(({ value, label }) => (
                      <Label
                        key={value}
                        htmlFor={`algo-${value}`}
                        className="flex cursor-pointer items-center gap-2 rounded-md border px-3 py-2 font-normal transition-colors hover:bg-accent has-[:checked]:border-primary has-[:checked]:bg-primary/5"
                      >
                        <RadioGroupItem value={value} id={`algo-${value}`} />
                        {label}
                      </Label>
                    ))}
                  </RadioGroup>
                )}
              />
            </div>

            {/* ケース */}
            <div className="space-y-2">
              <Label className="text-base font-semibold">ケース</Label>
              <Controller
                name="uppercase"
                control={control}
                render={({ field }) => (
                  <RadioGroup
                    value={field.value ? 'upper' : 'lower'}
                    onValueChange={(v) => field.onChange(v === 'upper')}
                    className="flex gap-3"
                  >
                    <Label htmlFor="case-lower" className="flex cursor-pointer items-center gap-2 rounded-md border px-3 py-2 font-normal transition-colors hover:bg-accent has-[:checked]:border-primary has-[:checked]:bg-primary/5">
                      <RadioGroupItem value="lower" id="case-lower" />
                      小文字
                    </Label>
                    <Label htmlFor="case-upper" className="flex cursor-pointer items-center gap-2 rounded-md border px-3 py-2 font-normal transition-colors hover:bg-accent has-[:checked]:border-primary has-[:checked]:bg-primary/5">
                      <RadioGroupItem value="upper" id="case-upper" />
                      大文字
                    </Label>
                  </RadioGroup>
                )}
              />
            </div>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button type="submit" className="w-full">
                ハッシュ生成
              </Button>
            </motion.div>
          </form>
        </CardContent>
      </Card>

      <AnimatePresence>
        {generatedHashes.length > 0 && (
          <motion.div
            ref={resultRef}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
          >
            <Card>
              <CardContent className="pt-6">
                <motion.div
                  className="space-y-2"
                  initial="hidden"
                  animate="visible"
                  variants={{ visible: { transition: { staggerChildren: 0.03 } } }}
                >
                  {generatedHashes.map((v, i) => (
                    <motion.div
                      key={`${v}-${i}`}
                      className="flex cursor-pointer items-center gap-2 rounded-md border bg-muted/50 px-3 py-2 transition-colors hover:bg-muted"
                      variants={{
                        hidden: { opacity: 0, y: 8 },
                        visible: { opacity: 1, y: 0 },
                      }}
                      onClick={() => handleCopy(v, i)}
                    >
                      <code className="flex-1 truncate font-mono text-sm">{v}</code>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 shrink-0"
                        onClick={() => handleCopy(v, i)}
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
    </div>
  );
};

export default HashPage;
