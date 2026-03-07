'use client';

import GeneratorPage from '@/components/GeneratorPage';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Hash } from 'lucide-react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { PinInputs } from './generatePin';
import useGeneratePin from './useGeneratePin';

const PinPage = () => {
  const { generatedPins, handleGenerate } = useGeneratePin();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<PinInputs>({
    defaultValues: {
      length: 6,
      generatedNumber: 10,
    },
  });

  const onSubmit: SubmitHandler<PinInputs> = (data: PinInputs) => {
    handleGenerate(data);
  };

  return (
    <GeneratorPage icon={Hash} title="PIN/数字コード生成" buttonLabel="PIN生成" results={generatedPins} onSubmit={handleSubmit(onSubmit)}>
      {/* 桁数 */}
      <div className="space-y-2">
        <Label htmlFor="lengthField" className="text-base font-semibold">
          桁数
        </Label>
        <Controller
          name="length"
          control={control}
          rules={{
            required: '数字を入力してください。',
            min: { value: 1, message: '1以上を指定してください。' },
            max: { value: 20, message: '20以下を指定してください。' },
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

export default PinPage;
