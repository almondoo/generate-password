'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Check, Clock, Copy } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { UlidInputs } from './generateUlid';
import useGenerateUlid from './useGenerateUlid';
import useResultList from '../useResultList';

const Home = () => {
  const { generatedUlids, handleGenerate } = useGenerateUlid();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UlidInputs>({
    defaultValues: {
      generatedNumber: 10,
      lowercase: false,
    },
  });

  const onSubmit: SubmitHandler<UlidInputs> = (data: UlidInputs) => {
    handleGenerate(data);
  };

  const { resultRef, copiedIndex, handleCopy } = useResultList(generatedUlids);

  return (
    <div className="space-y-6 py-6">
      <Card>
        <CardHeader className="text-center">
          <Clock className="mx-auto h-8 w-8 text-muted-foreground" />
          <CardTitle className="text-xl">ULID 生成</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* ケース */}
            <div className="space-y-2">
              <Label className="text-base font-semibold">ケース</Label>
              <Controller
                name="lowercase"
                control={control}
                render={({ field }) => (
                  <RadioGroup
                    value={field.value ? 'lower' : 'upper'}
                    onValueChange={(v) => field.onChange(v === 'lower')}
                    className="flex gap-3"
                  >
                    <Label htmlFor="ulid-case-upper" className="flex cursor-pointer items-center gap-2 rounded-md border px-3 py-2 font-normal transition-colors hover:bg-accent has-[:checked]:border-primary has-[:checked]:bg-primary/5">
                      <RadioGroupItem value="upper" id="ulid-case-upper" />
                      大文字
                    </Label>
                    <Label htmlFor="ulid-case-lower" className="flex cursor-pointer items-center gap-2 rounded-md border px-3 py-2 font-normal transition-colors hover:bg-accent has-[:checked]:border-primary has-[:checked]:bg-primary/5">
                      <RadioGroupItem value="lower" id="ulid-case-lower" />
                      小文字
                    </Label>
                  </RadioGroup>
                )}
              />
            </div>

            {/* 生成数 */}
            <div className="space-y-2">
              <Label htmlFor="ulidGeneratedNumberField" className="text-base font-semibold">
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
                  <Input {...field} id="ulidGeneratedNumberField" type="number" className="max-w-32" />
                )}
              />
              {errors.generatedNumber?.message && (
                <p className="text-sm text-destructive">{errors.generatedNumber.message}</p>
              )}
            </div>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button type="submit" className="w-full">
                ULID生成
              </Button>
            </motion.div>
          </form>
        </CardContent>
      </Card>

      <AnimatePresence>
        {generatedUlids.length > 0 && (
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
                  {generatedUlids.map((v, i) => (
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
