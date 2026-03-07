'use client';

import GeneratorPage from '@/components/GeneratorPage';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Fingerprint } from 'lucide-react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
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

  return (
    <GeneratorPage icon={Fingerprint} title="UUID v4 生成" buttonLabel="UUID生成" results={generatedUuids} onSubmit={handleSubmit(onSubmit)}>
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
    </GeneratorPage>
  );
};

export default Home;
