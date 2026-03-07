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
import { Check, Copy, Key } from 'lucide-react';
import { useCallback, useRef, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { PasswordInputs, SYMBOL } from './generatePassword';
import useGeneratePassword from './useGeneratePassword';

const levels = [
  { label: '英字', value: '1' },
  { label: '英数字', value: '2' },
  { label: '英数字記号', value: '3' },
  { label: 'カスタム', value: '4' },
];

const CUSTOM_NUMBER = '4';
const symbolChars = SYMBOL.split('');

const Home = () => {
  const [stringLength, setStringLength] = useState<number>(0);
  const { generatedPasswords, handleGenerate } = useGeneratePassword();
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<PasswordInputs>({
    defaultValues: {
      level: '1',
      custom: {
        number: false,
        duplication: false,
        upperCaseOnly: false,
        lowerCaseOnly: false,
      },
      symbols: [],
      length: 12,
      generatedNumber: 10,
    },
  });

  const watchLevel = watch('level');

  const onSubmit: SubmitHandler<PasswordInputs> = (data: PasswordInputs) => {
    setStringLength(Number(data.length));
    handleGenerate(data);
  };

  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const copiedTimer = useRef<ReturnType<typeof setTimeout>>(null);

  const handleCopy = useCallback((value: string, index: number) => {
    navigator.clipboard
      .writeText(value)
      .then(() => {
        toast.success('コピーしました！');
        setCopiedIndex(index);
        if (copiedTimer.current) clearTimeout(copiedTimer.current);
        copiedTimer.current = setTimeout(() => setCopiedIndex(null), 2000);
      })
      .catch(() => toast.error('コピーに失敗しました！'));
  }, []);

  return (
    <div className="space-y-6 py-6">
      <Card>
        <CardHeader className="text-center">
          <Key className="mx-auto h-8 w-8 text-muted-foreground" />
          <CardTitle className="text-xl">パスワード生成</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* レベル */}
            <div className="space-y-2">
              <Label className="text-base font-semibold">レベル</Label>
              <Controller
                name="level"
                control={control}
                render={({ field }) => (
                  <RadioGroup
                    value={field.value}
                    onValueChange={field.onChange}
                    className="flex flex-wrap gap-3"
                  >
                    {levels.map((radio) => (
                      <div key={radio.value} className="flex items-center gap-2">
                        <RadioGroupItem value={radio.value} id={`level-${radio.value}`} />
                        <Label htmlFor={`level-${radio.value}`} className="font-normal">
                          {radio.label}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                )}
              />
            </div>

            {/* カスタム */}
            <div className="space-y-2">
              <Label className="text-base font-semibold">カスタム</Label>
              <Controller
                name="custom"
                control={control}
                render={({ field }) => (
                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="custom-number"
                        checked={field.value.number}
                        onCheckedChange={(checked) =>
                          field.onChange({ ...field.value, number: !!checked })
                        }
                        disabled={watchLevel !== CUSTOM_NUMBER}
                      />
                      <Label htmlFor="custom-number" className="font-normal">数字を含めるか</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="custom-duplication"
                        checked={field.value.duplication}
                        onCheckedChange={(checked) =>
                          field.onChange({ ...field.value, duplication: !!checked })
                        }
                      />
                      <Label htmlFor="custom-duplication" className="font-normal">文字の重複を含めない</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="custom-upper"
                        checked={field.value.upperCaseOnly}
                        onCheckedChange={(checked) =>
                          field.onChange({ ...field.value, upperCaseOnly: !!checked })
                        }
                        disabled={field.value.lowerCaseOnly}
                      />
                      <Label htmlFor="custom-upper" className="font-normal">大文字のみ</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="custom-lower"
                        checked={field.value.lowerCaseOnly}
                        onCheckedChange={(checked) =>
                          field.onChange({ ...field.value, lowerCaseOnly: !!checked })
                        }
                        disabled={field.value.upperCaseOnly}
                      />
                      <Label htmlFor="custom-lower" className="font-normal">小文字のみ</Label>
                    </div>
                  </div>
                )}
              />
            </div>

            {/* 記号 */}
            <div className="space-y-2">
              <Label className="text-base font-semibold">記号</Label>
              <Controller
                name="symbols"
                control={control}
                render={({ field }) => (
                  <div className="flex flex-wrap gap-3">
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="symbols-all"
                        checked={field.value.length === symbolChars.length}
                        onCheckedChange={(checked) =>
                          field.onChange(checked ? [...symbolChars] : [])
                        }
                        disabled={watchLevel !== CUSTOM_NUMBER}
                      />
                      <Label htmlFor="symbols-all" className="font-normal">全て</Label>
                    </div>
                    {symbolChars.map((symbol, i) => (
                      <div key={symbol} className="flex items-center gap-1">
                        <Checkbox
                          id={`symbol-${i}`}
                          checked={field.value.includes(symbol)}
                          onCheckedChange={(checked) => {
                            const values = checked
                              ? [...field.value, symbol]
                              : field.value.filter((v) => v !== symbol);
                            field.onChange(values);
                          }}
                          disabled={watchLevel !== CUSTOM_NUMBER}
                        />
                        <Label htmlFor={`symbol-${i}`} className="font-normal font-mono">
                          {symbol}
                        </Label>
                      </div>
                    ))}
                  </div>
                )}
              />
            </div>

            {/* パスワードの長さ */}
            <div className="space-y-2">
              <Label htmlFor="lengthField" className="text-base font-semibold">
                パスワードの長さ
              </Label>
              <Controller
                name="length"
                control={control}
                rules={{
                  required: '数字を入力してください。',
                  min: { value: 1, message: '1以上を指定してください。' },
                  max: { value: 100, message: '100以下を指定してください。' },
                }}
                render={({ field }) => (
                  <Input {...field} id="lengthField" type="number" className="max-w-32" />
                )}
              />
              {errors.length?.message && (
                <p className="text-sm text-destructive">{errors.length.message}</p>
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

            <Button type="submit" className="w-full">
              パスワード生成
            </Button>
          </form>
        </CardContent>
      </Card>

      {generatedPasswords.length > 0 && (
        <Card>
          <CardContent className="pt-6">
            {generatedPasswords[0].length !== stringLength && (
              <p className="mb-4 text-sm text-muted-foreground">
                重複を含めないので
                <span className="font-bold">{generatedPasswords[0].length}文字</span>
                になりました
              </p>
            )}
            <div className="space-y-2">
              {generatedPasswords.map((v, i) => (
                <div
                  key={`${v}-${i}`}
                  className="flex items-center gap-2 rounded-md border bg-muted/50 px-3 py-2"
                >
                  <code className="flex-1 truncate font-mono text-sm">{v}</code>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 shrink-0"
                    onClick={() => handleCopy(v, i)}
                    aria-label={copiedIndex === i ? 'コピー済み' : 'コピー'}
                  >
                    {copiedIndex === i ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
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
