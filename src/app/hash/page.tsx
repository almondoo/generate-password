'use client';

import GeneratorPage from '@/components/GeneratorPage';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { FileDigit } from 'lucide-react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { HashAlgorithm, HashInputs } from './generateHash';
import useGenerateHash from './useGenerateHash';

const ALGORITHMS: { value: HashAlgorithm; label: string }[] = [
  { value: 'SHA-1', label: 'SHA-1' },
  { value: 'SHA-256', label: 'SHA-256' },
  { value: 'SHA-512', label: 'SHA-512' },
];

const HashPage = () => {
  const { generatedHashes, handleGenerate } = useGenerateHash();
  const {
    control,
    handleSubmit,
  } = useForm<HashInputs>({
    defaultValues: {
      text: '',
      algorithm: 'SHA-256',
      uppercase: false,
    },
  });

  const onSubmit: SubmitHandler<HashInputs> = (data: HashInputs) => {
    handleGenerate(data);
  };

  return (
    <GeneratorPage icon={FileDigit} title="ハッシュ生成" buttonLabel="ハッシュ生成" results={generatedHashes} onSubmit={handleSubmit(onSubmit)}>
      {/* テキスト入力 */}
      <div className="space-y-2">
        <Label htmlFor="textField" className="text-base font-semibold">
          入力テキスト
        </Label>
        <Controller
          name="text"
          control={control}
          render={({ field }) => (
            <Textarea {...field} id="textField" placeholder="ハッシュ化するテキストを入力..." rows={4} />
          )}
        />
      </div>

      {/* アルゴリズム */}
      <div className="space-y-2">
        <Label className="text-base font-semibold">アルゴリズム</Label>
        <Controller
          name="algorithm"
          control={control}
          render={({ field }) => (
            <RadioGroup
              value={field.value}
              onValueChange={(v) => field.onChange(v as HashAlgorithm)}
              className="flex gap-3"
            >
              {ALGORITHMS.map(({ value, label }) => (
                <Label
                  key={value}
                  htmlFor={`algo-${value}`}
                  className="flex cursor-pointer items-center gap-2 rounded-md border px-3 py-2 font-normal transition-colors hover:bg-accent has-[:checked]:border-primary has-[:checked]:bg-primary/5"
                >
                  <RadioGroupItem value={value} id={`algo-${value}`} />
                  {label}
                </Label>
              ))}
            </RadioGroup>
          )}
        />
      </div>

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
    </GeneratorPage>
  );
};

export default HashPage;
