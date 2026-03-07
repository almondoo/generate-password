'use client';

import GeneratorPage from '@/components/GeneratorPage';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Clock } from 'lucide-react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { UlidInputs } from './generateUlid';
import useGenerateUlid from './useGenerateUlid';

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

  return (
    <GeneratorPage icon={Clock} title="ULID 生成" buttonLabel="ULID生成" results={generatedUlids} onSubmit={handleSubmit(onSubmit)}>
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
    </GeneratorPage>
  );
};

export default Home;
