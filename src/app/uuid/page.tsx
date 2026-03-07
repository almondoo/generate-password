'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Check, Copy, Fingerprint } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { UuidInputs } from './generateUuid';
import useGenerateUuid from './useGenerateUuid';
import useResultList from '../useResultList';

const Home = () => {
  const { generatedUuids, handleGenerate } = useGenerateUuid();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UuidInputs>({
    defaultValues: {
      generatedNumber: 10,
      uppercase: false,
      hyphen: true,
      braces: false,
    },
  });

  const onSubmit: SubmitHandler<UuidInputs> = (data: UuidInputs) => {
    handleGenerate(data);
  };

  const { resultRef, copiedIndex, handleCopy } = useResultList(generatedUuids);

  return (
    <div className="space-y-6 py-6">
      <Card>
        <CardHeader className="text-center">
          <Fingerprint className="mx-auto h-8 w-8 text-muted-foreground" />
          <CardTitle className="text-xl">UUID v4 生成</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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

            {/* オプション */}
            <div className="space-y-2">
              <Label className="text-base font-semibold">オプション</Label>
              <div className="flex flex-wrap gap-4">
                <Controller
                  name="hyphen"
                  control={control}
                  render={({ field }) => (
                    <Label htmlFor="opt-hyphen" className="flex cursor-pointer items-center gap-2 rounded-md border px-3 py-2 font-normal transition-colors hover:bg-accent has-[:checked]:border-primary has-[:checked]:bg-primary/5">
                      <Checkbox
                        id="opt-hyphen"
                        checked={field.value}
                        onCheckedChange={(checked) => field.onChange(!!checked)}
                      />
                      ハイフンを含める
                    </Label>
                  )}
                />
                <Controller
                  name="braces"
                  control={control}
                  render={({ field }) => (
                    <Label htmlFor="opt-braces" className="flex cursor-pointer items-center gap-2 rounded-md border px-3 py-2 font-normal transition-colors hover:bg-accent has-[:checked]:border-primary has-[:checked]:bg-primary/5">
                      <Checkbox
                        id="opt-braces"
                        checked={field.value}
                        onCheckedChange={(checked) => field.onChange(!!checked)}
                      />
                      {'括弧で囲む {...}'}
                    </Label>
                  )}
                />
              </div>
            </div>

            {/* 生成数 */}
            <div className="space-y-2">
              <Label htmlFor="generatedNumberField" className="text-base font-semibold">
                生成数
              </Label>
              <Controller
                name="generatedNumber"
                control={control}
                rules={{
                  required: '数字を入力してください。',
                  min: { value: 1, message: '1以上を指定してください。' },
                  max: { value: 100, message: '100以下を指定してください。' },
                }}
                render={({ field }) => (
                  <Input {...field} id="generatedNumberField" type="number" className="max-w-32" />
                )}
              />
              {errors.generatedNumber?.message && (
                <p className="text-sm text-destructive">{errors.generatedNumber.message}</p>
              )}
            </div>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button type="submit" className="w-full">
                UUID生成
              </Button>
            </motion.div>
          </form>
        </CardContent>
      </Card>

      <AnimatePresence>
        {generatedUuids.length > 0 && (
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
                  {generatedUuids.map((v, i) => (
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

export default Home;
