'use client';

import GeneratorPage from '@/components/GeneratorPage';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { BookOpen } from 'lucide-react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { PassphraseInputs } from './generatePassphrase';
import useGeneratePassphrase from './useGeneratePassphrase';

const separatorOptions = [
  { value: '-', label: 'ハイフン (-)' },
  { value: '.', label: 'ドット (.)' },
  { value: '_', label: 'アンダースコア (_)' },
  { value: ' ', label: 'スペース' },
] as const;

const Home = () => {
  const { generatedPassphrases, handleGenerate } = useGeneratePassphrase();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<PassphraseInputs>({
    defaultValues: {
      wordCount: 5,
      separator: '-',
      capitalize: false,
      generatedNumber: 10,
    },
  });

  const onSubmit: SubmitHandler<PassphraseInputs> = (data: PassphraseInputs) => {
    handleGenerate(data);
  };

  return (
    <GeneratorPage icon={BookOpen} title="パスフレーズ生成" buttonLabel="パスフレーズ生成" results={generatedPassphrases} onSubmit={handleSubmit(onSubmit)}>
      {/* 単語数 */}
      <div className="space-y-2">
        <Label htmlFor="wordCountField" className="text-base font-semibold">
          単語数
        </Label>
        <Controller
          name="wordCount"
          control={control}
          rules={{
            required: '数字を入力してください。',
            min: { value: 3, message: '3以上を指定してください。' },
            max: { value: 10, message: '10以下を指定してください。' },
          }}
          render={({ field }) => (
            <Input {...field} id="wordCountField" type="number" className="max-w-32" />
          )}
        />
        {errors.wordCount?.message && (
          <p className="text-sm text-destructive">{errors.wordCount.message}</p>
        )}
      </div>

      {/* 区切り文字 */}
      <div className="space-y-2">
        <Label className="text-base font-semibold">区切り文字</Label>
        <Controller
          name="separator"
          control={control}
          render={({ field }) => (
            <RadioGroup
              value={field.value}
              onValueChange={field.onChange}
              className="flex flex-wrap gap-3"
            >
              {separatorOptions.map((opt) => (
                <Label
                  key={opt.value}
                  htmlFor={`sep-${opt.value}`}
                  className="flex cursor-pointer items-center gap-2 rounded-md border px-3 py-2 font-normal transition-colors hover:bg-accent has-[:checked]:border-primary has-[:checked]:bg-primary/5"
                >
                  <RadioGroupItem value={opt.value} id={`sep-${opt.value}`} />
                  {opt.label}
                </Label>
              ))}
            </RadioGroup>
          )}
        />
      </div>

      {/* 先頭大文字 */}
      <div className="space-y-2">
        <Label className="text-base font-semibold">オプション</Label>
        <div className="flex flex-wrap gap-4">
          <Controller
            name="capitalize"
            control={control}
            render={({ field }) => (
              <Label htmlFor="opt-capitalize" className="flex cursor-pointer items-center gap-2 rounded-md border px-3 py-2 font-normal transition-colors hover:bg-accent has-[:checked]:border-primary has-[:checked]:bg-primary/5">
                <Checkbox
                  id="opt-capitalize"
                  checked={field.value}
                  onCheckedChange={(checked) => field.onChange(!!checked)}
                />
                先頭を大文字にする
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
