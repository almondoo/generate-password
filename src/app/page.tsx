'use client';

import GeneratorPage from '@/components/GeneratorPage';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Key } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
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

  return (
    <GeneratorPage
      icon={Key}
      title="パスワード生成"
      buttonLabel="パスワード生成"
      results={generatedPasswords}
      onSubmit={handleSubmit(onSubmit)}
      notice={
        generatedPasswords.length > 0 && generatedPasswords[0].length !== stringLength ? (
          <p className="mb-4 text-sm text-muted-foreground">
            重複を含めないので<span className="font-bold">{generatedPasswords[0].length}文字</span>になりました
          </p>
        ) : undefined
      }
    >
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
                <Label
                  key={radio.value}
                  htmlFor={`level-${radio.value}`}
                  className="flex cursor-pointer items-center gap-2 rounded-md border px-3 py-2 font-normal transition-colors hover:bg-accent has-[:checked]:border-primary has-[:checked]:bg-primary/5"
                >
                  <RadioGroupItem value={radio.value} id={`level-${radio.value}`} />
                  {radio.label}
                </Label>
              ))}
            </RadioGroup>
          )}
        />
      </div>

      {/* カスタム */}
      <motion.div className="space-y-2" animate={{ opacity: watchLevel === CUSTOM_NUMBER ? 1 : 0.5 }} transition={{ duration: 0.2 }}>
        <Label className="text-base font-semibold">カスタム</Label>
        <Controller
          name="custom"
          control={control}
          render={({ field }) => (
            <div className="flex flex-wrap gap-3">
              <Label htmlFor="custom-number" className="flex cursor-pointer items-center gap-2 rounded-md border px-3 py-2 font-normal transition-colors hover:bg-accent has-[:checked]:border-primary has-[:checked]:bg-primary/5 has-[:disabled]:cursor-not-allowed has-[:disabled]:opacity-50">
                <Checkbox
                  id="custom-number"
                  checked={field.value.number}
                  onCheckedChange={(checked) =>
                    field.onChange({ ...field.value, number: !!checked })
                  }
                  disabled={watchLevel !== CUSTOM_NUMBER}
                />
                数字を含めるか
              </Label>
              <Label htmlFor="custom-duplication" className="flex cursor-pointer items-center gap-2 rounded-md border px-3 py-2 font-normal transition-colors hover:bg-accent has-[:checked]:border-primary has-[:checked]:bg-primary/5">
                <Checkbox
                  id="custom-duplication"
                  checked={field.value.duplication}
                  onCheckedChange={(checked) =>
                    field.onChange({ ...field.value, duplication: !!checked })
                  }
                />
                文字の重複を含めない
              </Label>
              <Label htmlFor="custom-upper" className="flex cursor-pointer items-center gap-2 rounded-md border px-3 py-2 font-normal transition-colors hover:bg-accent has-[:checked]:border-primary has-[:checked]:bg-primary/5 has-[:disabled]:cursor-not-allowed has-[:disabled]:opacity-50">
                <Checkbox
                  id="custom-upper"
                  checked={field.value.upperCaseOnly}
                  onCheckedChange={(checked) =>
                    field.onChange({ ...field.value, upperCaseOnly: !!checked })
                  }
                  disabled={field.value.lowerCaseOnly}
                />
                大文字のみ
              </Label>
              <Label htmlFor="custom-lower" className="flex cursor-pointer items-center gap-2 rounded-md border px-3 py-2 font-normal transition-colors hover:bg-accent has-[:checked]:border-primary has-[:checked]:bg-primary/5 has-[:disabled]:cursor-not-allowed has-[:disabled]:opacity-50">
                <Checkbox
                  id="custom-lower"
                  checked={field.value.lowerCaseOnly}
                  onCheckedChange={(checked) =>
                    field.onChange({ ...field.value, lowerCaseOnly: !!checked })
                  }
                  disabled={field.value.upperCaseOnly}
                />
                小文字のみ
              </Label>
            </div>
          )}
        />
      </motion.div>

      {/* 記号 */}
      <motion.div className="space-y-2" animate={{ opacity: watchLevel === CUSTOM_NUMBER ? 1 : 0.5 }} transition={{ duration: 0.2 }}>
        <Label className="text-base font-semibold">記号</Label>
        <Controller
          name="symbols"
          control={control}
          render={({ field }) => (
            <div className="flex flex-wrap gap-2">
              <Label htmlFor="symbols-all" className="flex cursor-pointer items-center gap-2 rounded-md border px-3 py-2 font-normal transition-colors hover:bg-accent has-[:checked]:border-primary has-[:checked]:bg-primary/5 has-[:disabled]:cursor-not-allowed has-[:disabled]:opacity-50">
                <Checkbox
                  id="symbols-all"
                  checked={field.value.length === symbolChars.length}
                  onCheckedChange={(checked) =>
                    field.onChange(checked ? [...symbolChars] : [])
                  }
                  disabled={watchLevel !== CUSTOM_NUMBER}
                />
                全て
              </Label>
              {symbolChars.map((symbol, i) => (
                <Label key={symbol} htmlFor={`symbol-${i}`} className="flex cursor-pointer items-center gap-1.5 rounded-md border px-2.5 py-2 font-normal font-mono transition-colors hover:bg-accent has-[:checked]:border-primary has-[:checked]:bg-primary/5 has-[:disabled]:cursor-not-allowed has-[:disabled]:opacity-50">
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
                  {symbol}
                </Label>
              ))}
            </div>
          )}
        />
      </motion.div>

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
    </GeneratorPage>
  );
};

export default Home;
