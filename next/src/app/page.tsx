'use client';

import KeyIcon from '@mui/icons-material/Key';
import {
  Box,
  Button,
  Card,
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  InputLabel,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { NextPage } from 'next';
import { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import styles from './page.module.scss';
import useGeneratePassword from './useGeneratePassword';

export interface Inputs {
  level: string;
  custom: {
    number: boolean;
    duplication: boolean;
    upperCaseOnly: boolean;
    lowerCaseOnly: boolean;
  };
  symbols: string[];
  length: number;
  generatedNumber: number;
}

const levels = [
  { label: '英字', value: '1' },
  { label: '英数字', value: '2' },
  { label: '英数字記号', value: '3' },
  { label: 'カスタム', value: '4' },
];

const CUSTOM_NUMBER = '4';

const symbols = '!"#$%&\'()*+,-./:;<=>?@[]^_`{|}~';

const Home: NextPage = () => {
  const [stringLength, setStringLength] = useState<number>(0);
  const { generatedPasswords, handleGenerate } = useGeneratePassword();
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>({
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

  const watchData = watch();

  const onSubmit: SubmitHandler<Inputs> = (data: Inputs) => {
    setStringLength(Number(data.length));
    handleGenerate(data);
  };

  return (
    <Box sx={{ padding: '40px 0' }}>
      <Card className={styles.Card}>
        <Box sx={{ textAlign: 'center' }}>
          <KeyIcon fontSize="large" />
        </Box>
        <Stack
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          spacing={2}
          sx={{ marginTop: 2 }}
        >
          <Box>
            <FormLabel id="password-label-group" sx={{ fontSize: '1.5rem' }}>
              レベル
            </FormLabel>
            <Controller
              name="level"
              control={control}
              render={({ field }) => {
                return (
                  <RadioGroup
                    {...field}
                    row
                    aria-labelledby="password-label-group"
                    name="password-label"
                  >
                    {levels.map((radio) => (
                      <FormControlLabel
                        key={radio.label}
                        control={<Radio value={radio.value} />}
                        label={radio.label}
                      />
                    ))}
                  </RadioGroup>
                );
              }}
            />
          </Box>

          <Box>
            <FormLabel id="custom-group" sx={{ fontSize: '1.5rem' }}>
              カスタム
            </FormLabel>
            <Controller
              name="custom"
              control={control}
              render={({ field }) => {
                return (
                  <FormGroup row aria-labelledby="custom-group">
                    <FormControlLabel
                      control={
                        <Checkbox
                          {...field}
                          onChange={(e) => {
                            field.onChange({
                              ...field.value,
                              number: e.target.checked,
                            });
                          }}
                          disabled={watchData.level !== CUSTOM_NUMBER}
                        />
                      }
                      label="数字を含めるか"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          {...field}
                          onChange={(e) => {
                            field.onChange({
                              ...field.value,
                              duplication: e.target.checked,
                            });
                          }}
                        />
                      }
                      label="文字の重複を含めない"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          {...field}
                          onChange={(e) => {
                            field.onChange({
                              ...field.value,
                              upperCaseOnly: e.target.checked,
                            });
                          }}
                          disabled={field.value.lowerCaseOnly}
                        />
                      }
                      label="大文字のみ"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          {...field}
                          onChange={(e) => {
                            field.onChange({
                              ...field.value,
                              lowerCaseOnly: e.target.checked,
                            });
                          }}
                          disabled={field.value.upperCaseOnly}
                        />
                      }
                      label="小文字のみ"
                    />
                  </FormGroup>
                );
              }}
            />
          </Box>

          <Box>
            <FormLabel id="password-label" sx={{ fontSize: '1.5rem' }}>
              記号
            </FormLabel>
            <Controller
              name="symbols"
              control={control}
              render={({ field }) => (
                <FormGroup row>
                  <FormControlLabel
                    control={
                      <Checkbox
                        {...field}
                        onChange={(e) => {
                          if (e.target.checked) {
                            field.onChange(symbols.split(''));
                          } else {
                            field.onChange([]);
                          }
                        }}
                        disabled={watchData.level !== CUSTOM_NUMBER}
                      />
                    }
                    value={symbols}
                    label="全て"
                  />
                  {symbols.split('').map((symbol) => (
                    <FormControlLabel
                      key={symbol}
                      control={
                        <Checkbox
                          {...field}
                          onChange={(e) => {
                            let values;
                            if (e.target.checked) {
                              values = [...field.value, symbol];
                            } else {
                              values = field.value.filter((v) => {
                                return v !== symbol;
                              });
                            }
                            field.onChange(values);
                          }}
                          checked={
                            field.value.find((v) => v === symbol) === undefined
                              ? false
                              : true
                          }
                          disabled={watchData.level !== CUSTOM_NUMBER}
                        />
                      }
                      label={symbol}
                    />
                  ))}
                </FormGroup>
              )}
            />
          </Box>

          <Box>
            <InputLabel sx={{ fontSize: '1.5rem' }}>
              パスワードの長さ
            </InputLabel>
            <Controller
              name="length"
              control={control}
              rules={{
                required: '数字を入力してください。',
                min: {
                  value: 1,
                  message: '1以上を指定してください。',
                },
                max: {
                  value: 100,
                  message: '100以下を指定してください。',
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  id="lengthField"
                  size="small"
                  type="number"
                />
              )}
            />
            {errors.length?.message && (
              <FormHelperText error>{errors.length.message}</FormHelperText>
            )}
          </Box>

          <Box>
            <InputLabel sx={{ fontSize: '1.5rem' }}>生成数</InputLabel>
            <Controller
              name="generatedNumber"
              control={control}
              rules={{
                required: '数字を入力してください。',
                min: {
                  value: 1,
                  message: '1以上を指定してください。',
                },
                max: {
                  value: 100,
                  message: '100以下を指定してください。',
                },
              }}
              render={({ field }) => {
                return (
                  <TextField
                    {...field}
                    id="generatedNumberField"
                    size="small"
                    type="number"
                  />
                );
              }}
            />
            {errors.generatedNumber?.message && (
              <FormHelperText error>
                {errors.generatedNumber.message}
              </FormHelperText>
            )}
          </Box>

          <Button variant="contained" type="submit">
            パスワード生成
          </Button>
        </Stack>
      </Card>

      {generatedPasswords.length ? (
        <Card className={styles.Card}>
          {generatedPasswords[0].length !== stringLength && (
            <Typography>
              重複を含めないので
              <Typography component="span" fontWeight="bold">
                {generatedPasswords[0].length}文字
              </Typography>
              になりました
            </Typography>
          )}
          <Stack
            direction="row"
            spacing={2}
            useFlexGap
            flexWrap="wrap"
            sx={{ marginTop: 2 }}
          >
            {generatedPasswords.map((v) => (
              <TextField
                key={v}
                value={v}
                InputProps={{
                  readOnly: true,
                }}
                onFocus={(e) => {
                  e.target.select();
                  navigator.clipboard
                    .writeText(e.target.value)
                    .then(() => toast.success('コピーしました！'))
                    .catch(() => toast.error('コピーに失敗しました！'));
                }}
                sx={{
                  width: {
                    mobile: '100%',
                    tablet: 'auto',
                  },
                }}
              />
            ))}
          </Stack>
        </Card>
      ) : (
        ''
      )}
    </Box>
  );
};

export default Home;
