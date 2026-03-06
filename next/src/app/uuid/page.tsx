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
import { Copy, Fingerprint } from 'lucide-react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { UuidInputs } from './generateUuid';
import useGenerateUuid from './useGenerateUuid';

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

  const handleCopy = (value: string) => {
    navigator.clipboard
      .writeText(value)
      .then(() => toast.success('コピーしました！'))
      .catch(() => toast.error('コピーに失敗しました！'));
  };

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
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="lower" id="case-lower" />
                      <Label htmlFor="case-lower" className="font-normal">小文字</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="upper" id="case-upper" />
                      <Label htmlFor="case-upper" className="font-normal">大文字</Label>
                    </div>
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
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="opt-hyphen"
                        checked={field.value}
                        onCheckedChange={(checked) => field.onChange(!!checked)}
                      />
                      <Label htmlFor="opt-hyphen" className="font-normal">ハイフンを含める</Label>
                    </div>
                  )}
                />
                <Controller
                  name="braces"
                  control={control}
                  render={({ field }) => (
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="opt-braces"
                        checked={field.value}
                        onCheckedChange={(checked) => field.onChange(!!checked)}
                      />
                      <Label htmlFor="opt-braces" className="font-normal">{'括弧で囲む {...}'}</Label>
                    </div>
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

            <Button type="submit" className="w-full">
              UUID生成
            </Button>
          </form>
        </CardContent>
      </Card>

      {generatedUuids.length > 0 && (
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-2">
              {generatedUuids.map((v, i) => (
                <div
                  key={`${v}-${i}`}
                  className="flex items-center gap-2 rounded-md border bg-muted/50 px-3 py-2"
                >
                  <code className="flex-1 truncate font-mono text-sm">{v}</code>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 shrink-0"
                    onClick={() => handleCopy(v)}
                  >
                    <Copy className="h-4 w-4" />
                    <span className="sr-only">コピー</span>
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Home;
