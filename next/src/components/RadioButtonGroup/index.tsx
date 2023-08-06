import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { FC, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  radios: {
    label: string;
    value: string;
  }[];
}

const RadioButtonGroup: FC<Props> = ({ children, radios }) => {
  return (
    <FormControl>
      <FormLabel id="demo-row-radio-buttons-group-label">{children}</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
      >
        {radios.map((radio) => (
          <FormControlLabel
            key={radio.label}
            value={radio.value}
            control={<Radio />}
            label={radio.label}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default RadioButtonGroup;
