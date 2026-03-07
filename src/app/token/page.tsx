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
import { Check, Copy, TicketCheck } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { TokenFormat, TokenInputs } from './generateToken';
import useGenerateToken from './useGenerateToken';
import useResultList from '../useResultList';

const TOKEN_FORMATS: { value: TokenFormat; label: string }[] = [
  { value: 'hex', label: 'Hex' },
  { value: 'base64', label: 'Base64' },
  { value: 'url-safe', label: 'URL-safe' },
];

const TokenPage = () => {
  const { generatedTokens, handleGenerate } = useGenerateToken();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TokenInputs>({
    defaultValues: {
      format: 'hex',
      byteLength: 32,
      generatedNumber: 10,
    },
  });

  const onSubmit: SubmitHandler<TokenInputs> = (data: TokenInputs) => {
    handleGenerate(data);
  };

  const { resultRef, copiedIndex, handleCopy } = useResultList(generatedTokens);

  return (
    <div className="space-y-6 py-6">
      <Card>
        <CardHeader className="text-center">
          <TicketCheck className="mx-auto h-8 w-8 text-muted-foreground" />
          <CardTitle className="text-xl">ランダムトークン生成</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* 形式 */}
            <div className="space-y-2">
              <Label className="text-base font-semibold">形式</Label>
              <Controller
                name="format"
                control={control}
                render={({ field }) => (
                  <RadioGroup
                    value={field.value}
                    onValueChange={(v) => field.onChange(v as TokenFormat)}
                    className="flex gap-3"
                  >
                    {TOKEN_FORMATS.map(({ value, label }) => (
                      <Label
                        key={value}
                        htmlFor={`format-${value}`}
                        className="flex cursor-pointer items-center gap-2 rounded-md border px-3 py-2 font-normal transition-colors hover:bg-accent has-[:checked]:border-primary has-[:checked]:bg-primary/5"
                      >
                        <RadioGroupItem value={value} id={`format-${value}`} />
                        {label}
                      </Label>
                    ))}
                  </RadioGroup>
                )}
              />
            </div>

            {/* バイト長 */}
            <div className="space-y-2">
              <Label htmlFor="byteLengthField" className="text-base font-semibold">
                バイト長
              </Label>
              <Controller
                name="byteLength"
                control={control}
                rules={{
                  required: '数字を入力してください。',
                  min: { value: 1, message: '1以上を指定してください。' },
                  max: { value: 128, message: '128以下を指定してください。' },
                }}
                render={({ field }) => (
                  <Input {...field} id="byteLengthField" type="number" className="max-w-32" />
                )}
              />
              {errors.byteLength?.message && (
                <p className="text-sm text-destructive">{errors.byteLength.message}</p>
              )}
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
                トークン生成
              </Button>
            </motion.div>
          </form>
        </CardContent>
      </Card>

      <AnimatePresence>
        {generatedTokens.length > 0 && (
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
                  {generatedTokens.map((v, i) => (
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

export default TokenPage;
