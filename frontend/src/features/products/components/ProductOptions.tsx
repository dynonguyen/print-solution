import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  List,
  ListItem,
  Radio,
  RadioGroup,
  TextField,
  Typography
} from '@mui/material';
import { indigo } from '@mui/material/colors';
import { PRODUCT_OPTION_TYPES } from '~/constants/common';
import { useState } from 'react'
import { isArray, values } from 'lodash';

const OptionShow = ({ option, selectedValues, setOptions }: any) => {
  let listValues;
  switch (option.optionType) {
    case PRODUCT_OPTION_TYPES.SINGLE_SELECT:
      listValues = (
        <RadioGroup value={selectedValues} onChange={(event: React.ChangeEvent<HTMLInputElement>) => setOptions(event.target.value)} name={PRODUCT_OPTION_TYPES.SINGLE_SELECT} row>
          {option.values.map((value: any) => {
            return <FormControlLabel value={value} control={<Radio />} label={value} key={value} />;
          })}
        </RadioGroup>
      );
      break;
    case PRODUCT_OPTION_TYPES.MULTIPLE_SELECT:
      listValues = (
        <FormGroup aria-label="position" row>
          {option.values.map((value: any) => {
            return <FormControlLabel value={value} control={
              <Checkbox checked={selectedValues.includes(value)}
                onChange={() => setOptions(() => {
                  const x = selectedValues as String[];
                  const index = selectedValues.indexOf(value);

                  if (index !== -1) {
                    // Item exists in the array, remove it
                    x.splice(index, 1)
                  } else {
                    // Item doesn't exist in the array, push it
                    x.push(value)
                  }
                  return x
                })}
              />}
              label={value}
              key={value}
            />;
          })}
        </FormGroup>
      );
      break;
    default:
      listValues = <TextField value={selectedValues} onChange={(e) => setOptions(e.target.value)} id={option.label} multiline fullWidth rows={4} placeholder={option.label} />;
      break;
  }
  return (
    <ListItem>
      <FormControl fullWidth>
        <FormLabel id="demo-row-radio-buttons-group-label">{option.label}</FormLabel>
        {listValues}
      </FormControl>
    </ListItem>
  );
};

const ProductOptions = ({ options, selectedValues, setOptions }: any) => {
  return (
    <>
      <Typography variant="h6" color={indigo[500]} sx={{ mt: 4 }}>
        Yêu cầu của bạn
      </Typography>
      <List>
        {options?.map((option: any) => {
          return <OptionShow key={option.label} option={option} selectedValue={selectedValues} setOptions={setOptions} />;
        })}
      </List>
    </>
  );
};

export default ProductOptions;
