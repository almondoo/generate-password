'use client';

import GeneratorPage from '@/components/GeneratorPage';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { TicketCheck } from 'lucide-react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { TokenFormat, TokenInputs } from './generateToken';
import useGenerateToken from './useGenerateToken';

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

  return (
    <GeneratorPage icon={TicketCheck} title="ランダムトークン生成" buttonLabel="トークン生成" results={generatedTokens} onSubmit={handleSubmit(onSubmit)}>
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
    </GeneratorPage>
  );
};

export default TokenPage;
