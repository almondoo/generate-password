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
import { useCallback, useState } from 'react';
import { generateQrCodeDataUrl } from './generateQrcode';

const SIZES = [128, 256, 512] as const;

const Home = () => {
  const [text, setText] = useState('');
  const [size, setSize] = useState<number>(256);
  const [dataUrl, setDataUrl] = useState('');
  const [error, setError] = useState('');

  const handleGenerate = useCallback(async () => {
    setError('');
    setDataUrl('');
    try {
      const url = await generateQrCodeDataUrl({ text, size });
      setDataUrl(url);
    } catch {
      setError('QRコードの生成に失敗しました。テキストを確認してください。');
    }
  }, [text, size]);

  return (
    <div className="space-y-6 py-6">
      <Card>
        <CardHeader className="text-center">
          <QrCode className="mx-auto h-8 w-8 text-muted-foreground" />
          <CardTitle className="text-xl">QRコード生成</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="qrcode-text" className="text-base font-semibold">テキスト</Label>
            <Textarea
              id="qrcode-text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="QRコードに変換するテキストを入力..."
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label className="text-base font-semibold">サイズ</Label>
            <RadioGroup
              value={String(size)}
              onValueChange={(v) => setSize(Number(v))}
              className="flex gap-3"
            >
              {SIZES.map((s) => (
                <Label
                  key={s}
                  htmlFor={`size-${s}`}
                  className="flex cursor-pointer items-center gap-2 rounded-md border px-3 py-2 font-normal transition-colors hover:bg-accent has-[:checked]:border-primary has-[:checked]:bg-primary/5"
                >
                  <RadioGroupItem value={String(s)} id={`size-${s}`} />
                  {s}px
                </Label>
              ))}
            </RadioGroup>
          </div>

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button type="button" className="w-full" onClick={handleGenerate}>
              QRコード生成
            </Button>
          </motion.div>

          {error && (
            <p className="text-sm text-destructive">{error}</p>
          )}

          <AnimatePresence>
            {dataUrl && (
              <motion.div
                className="flex flex-col items-center gap-4"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
              >
                <img src={dataUrl} alt="QRコード" width={size} height={size} />
                <a
                  href={dataUrl}
                  download="qrcode.png"
                  className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
                >
                  <Download className="h-4 w-4" />
                  ダウンロード
                </a>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </div>
  );
};

export default Home;
