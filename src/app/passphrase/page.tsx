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
import { BookOpen, Check, Copy } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { PassphraseInputs } from './generatePassphrase';
import useGeneratePassphrase from './useGeneratePassphrase';
import useResultList from '../useResultList';

const separatorOptions = [
  { value: '-', label: 'ハイフン (-)' },
  { value: '.', label: 'ドット (.)' },
  { value: '_', label: 'アンダースコア (_)' },
  { value: ' ', label: 'スペース' },
] as const;

const Home = () => {
  const { generatedPassphrases, handleGenerate } = useGeneratePassphrase();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<PassphraseInputs>({
    defaultValues: {
      wordCount: 5,
      separator: '-',
      capitalize: false,
      generatedNumber: 10,
    },
  });

  const onSubmit: SubmitHandler<PassphraseInputs> = (data: PassphraseInputs) => {
    handleGenerate(data);
  };

  const { resultRef, copiedIndex, handleCopy } = useResultList(generatedPassphrases);

  return (
    <div className="space-y-6 py-6">
      <Card>
        <CardHeader className="text-center">
          <BookOpen className="mx-auto h-8 w-8 text-muted-foreground" />
          <CardTitle className="text-xl">パスフレーズ生成</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* 単語数 */}
            <div className="space-y-2">
              <Label htmlFor="wordCountField" className="text-base font-semibold">
                単語数
              </Label>
              <Controller
                name="wordCount"
                control={control}
                rules={{
                  required: '数字を入力してください。',
                  min: { value: 3, message: '3以上を指定してください。' },
                  max: { value: 10, message: '10以下を指定してください。' },
                }}
                render={({ field }) => (
                  <Input {...field} id="wordCountField" type="number" className="max-w-32" />
                )}
              />
              {errors.wordCount?.message && (
                <p className="text-sm text-destructive">{errors.wordCount.message}</p>
              )}
            </div>

            {/* 区切り文字 */}
            <div className="space-y-2">
              <Label className="text-base font-semibold">区切り文字</Label>
              <Controller
                name="separator"
                control={control}
                render={({ field }) => (
                  <RadioGroup
                    value={field.value}
                    onValueChange={field.onChange}
                    className="flex flex-wrap gap-3"
                  >
                    {separatorOptions.map((opt) => (
                      <Label
                        key={opt.value}
                        htmlFor={`sep-${opt.value}`}
                        className="flex cursor-pointer items-center gap-2 rounded-md border px-3 py-2 font-normal transition-colors hover:bg-accent has-[:checked]:border-primary has-[:checked]:bg-primary/5"
                      >
                        <RadioGroupItem value={opt.value} id={`sep-${opt.value}`} />
                        {opt.label}
                      </Label>
                    ))}
                  </RadioGroup>
                )}
              />
            </div>

            {/* 先頭大文字 */}
            <div className="space-y-2">
              <Label className="text-base font-semibold">オプション</Label>
              <div className="flex flex-wrap gap-4">
                <Controller
                  name="capitalize"
                  control={control}
                  render={({ field }) => (
                    <Label htmlFor="opt-capitalize" className="flex cursor-pointer items-center gap-2 rounded-md border px-3 py-2 font-normal transition-colors hover:bg-accent has-[:checked]:border-primary has-[:checked]:bg-primary/5">
                      <Checkbox
                        id="opt-capitalize"
                        checked={field.value}
                        onCheckedChange={(checked) => field.onChange(!!checked)}
                      />
                      先頭を大文字にする
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
                パスフレーズ生成
              </Button>
            </motion.div>
          </form>
        </CardContent>
      </Card>

      <AnimatePresence>
        {generatedPassphrases.length > 0 && (
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
                  {generatedPassphrases.map((v, i) => (
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
