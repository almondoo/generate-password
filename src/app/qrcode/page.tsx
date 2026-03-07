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
import { Download, QrCode } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { generateQrCodeDataUrl, QrCodeInputs } from './generateQrcode';

const sizeOptions = [
  { value: '128', label: '128px' },
  { value: '256', label: '256px' },
  { value: '512', label: '512px' },
] as const;

const Home = () => {
  const [dataUrl, setDataUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<QrCodeInputs>({
    defaultValues: {
      text: '',
      size: 256,
    },
  });

  const onSubmit: SubmitHandler<QrCodeInputs> = async (data: QrCodeInputs) => {
    setError(null);
    try {
      const url = await generateQrCodeDataUrl(data);
      setDataUrl(url);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'QRコードの生成に失敗しました。');
    }
  };

  return (
    <div className="space-y-6 py-6">
      <Card>
        <CardHeader className="text-center">
          <QrCode className="mx-auto h-8 w-8 text-muted-foreground" />
          <CardTitle className="text-xl">QRコード生成</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* テキスト入力 */}
            <div className="space-y-2">
              <Label htmlFor="textField" className="text-base font-semibold">
                テキスト
              </Label>
              <Controller
                name="text"
                control={control}
                rules={{
                  required: 'テキストを入力してください。',
                }}
                render={({ field }) => (
                  <Textarea
                    {...field}
                    id="textField"
                    placeholder="URLやテキストを入力..."
                    rows={4}
                  />
                )}
              />
              {errors.text?.message && (
                <p className="text-sm text-destructive">{errors.text.message}</p>
              )}
            </div>

            {/* サイズ */}
            <div className="space-y-2">
              <Label className="text-base font-semibold">サイズ</Label>
              <Controller
                name="size"
                control={control}
                render={({ field }) => (
                  <RadioGroup
                    value={String(field.value)}
                    onValueChange={(v) => field.onChange(Number(v))}
                    className="flex gap-3"
                  >
                    {sizeOptions.map((opt) => (
                      <Label
                        key={opt.value}
                        htmlFor={`size-${opt.value}`}
                        className="flex cursor-pointer items-center gap-2 rounded-md border px-3 py-2 font-normal transition-colors hover:bg-accent has-[:checked]:border-primary has-[:checked]:bg-primary/5"
                      >
                        <RadioGroupItem value={opt.value} id={`size-${opt.value}`} />
                        {opt.label}
                      </Label>
                    ))}
                  </RadioGroup>
                )}
              />
            </div>

            {error && <p className="text-sm text-destructive">{error}</p>}

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button type="submit" className="w-full">
                QRコード生成
              </Button>
            </motion.div>
          </form>
        </CardContent>
      </Card>

      <AnimatePresence>
        {dataUrl && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
          >
            <Card>
              <CardContent className="flex flex-col items-center gap-4 pt-6">
                <img src={dataUrl} alt="QRコード" className="rounded-md" />
                <a href={dataUrl} download="qrcode.png">
                  <Button variant="outline" type="button">
                    <Download className="mr-2 h-4 w-4" />
                    ダウンロード
                  </Button>
                </a>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Home;
