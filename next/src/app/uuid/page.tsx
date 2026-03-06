'use client';

import FingerprintIcon from '@mui/icons-material/Fingerprint';
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
} from '@mui/material';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { UuidInputs } from './generateUuid';
import styles from './page.module.scss';
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
    <Box sx={{ padding: '40px 0' }}>
      <Card className={styles.Card}>
        <Box sx={{ textAlign: 'center' }}>
          <FingerprintIcon fontSize="large" />
        </Box>
        <Stack
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          spacing={2}
          sx={{ marginTop: 2 }}
        >
          <Box>
            <FormLabel sx={{ fontSize: '1.5rem' }}>ケース</FormLabel>
            <Controller
              name="uppercase"
              control={control}
              render={({ field }) => (
                <RadioGroup
                  row
                  value={field.value ? 'upper' : 'lower'}
                  onChange={(e) => field.onChange(e.target.value === 'upper')}
                >
                  <FormControlLabel
                    control={<Radio value="lower" />}
                    label="小文字"
                  />
                  <FormControlLabel
                    control={<Radio value="upper" />}
                    label="大文字"
                  />
                </RadioGroup>
              )}
            />
          </Box>

          <Box>
            <FormLabel sx={{ fontSize: '1.5rem' }}>オプション</FormLabel>
            <FormGroup row>
              <Controller
                name="hyphen"
                control={control}
                render={({ field }) => (
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                      />
                    }
                    label="ハイフンを含める"
                  />
                )}
              />
              <Controller
                name="braces"
                control={control}
                render={({ field }) => (
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                      />
                    }
                    label="括弧で囲む {...}"
                  />
                )}
              />
            </FormGroup>
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
              render={({ field }) => (
                <TextField
                  {...field}
                  id="generatedNumberField"
                  size="small"
                  type="number"
                />
              )}
            />
            {errors.generatedNumber?.message && (
              <FormHelperText error>
                {errors.generatedNumber.message}
              </FormHelperText>
            )}
          </Box>

          <Button variant="contained" type="submit">
            UUID生成
          </Button>
        </Stack>
      </Card>

      {generatedUuids.length ? (
        <Card className={styles.Card}>
          <Stack
            direction="row"
            spacing={2}
            useFlexGap
            flexWrap="wrap"
            sx={{ marginTop: 2 }}
          >
            {generatedUuids.map((v, i) => (
              <TextField
                key={`${v}-${i}`}
                value={v}
                slotProps={{
                  input: { readOnly: true },
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
