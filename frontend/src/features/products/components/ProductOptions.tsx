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

const OptionShow = (props: any) => {
  const { option, selectedValues, setOptions, inputValue, setInputValue, radioValue, setRadioValue } = props;
  let listValues;

  switch (option.optionType) {
    case PRODUCT_OPTION_TYPES.SINGLE_SELECT:
      listValues = (
        <RadioGroup
          value={radioValue[option.label] || null}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setRadioValue({ ...radioValue, [option.label]: event.target.value })
          }
          name={PRODUCT_OPTION_TYPES.SINGLE_SELECT}
          row
        >
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
            return (
              <FormControlLabel
                value={value}
                control={
                  <Checkbox
                    onChange={() =>
                      setOptions({
                        ...selectedValues,
                        [option.label]: (() => {
                          const x = selectedValues[option.label] as String[];
                          if (!x) return [value];
                          else {
                            const index = x?.indexOf(value);
                            if (index !== -1) {
                              // Item exists in the array, remove it
                              x.splice(index, 1);
                            } else {
                              // Item doesn't exist in the array, push it
                              x.push(value);
                            }
                            return x;
                          }
                        })()
                      })
                    }
                  />
                }
                label={value}
                key={value}
              />
            );
          })}
        </FormGroup>
      );
      break;
    default:
      listValues = (
        <TextField
          value={inputValue[option.label]}
          onChange={(e) => setInputValue({ ...inputValue, [option.label]: e.target.value })}
          id={option.label}
          multiline
          fullWidth
          rows={4}
          placeholder={option.label}
        />
      );
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

const ProductOptions = (props: any) => {
  const valueHandle = {
    selectedValues: props.selectedValues,
    setOptions: props.setOptions,
    inputValue: props.inputValue,
    setInputValue: props.setInputValue,
    radioValue: props.radioValue,
    setRadioValue: props.setRadioValue
  };
  return (
    <>
      <Typography variant="h6" color={indigo[500]} sx={{ mt: 4 }}>
        Yêu cầu của bạn
      </Typography>
      <List>
        {props.options?.map((option: any) => {
          return <OptionShow key={option.label} option={option} {...valueHandle} />;
        })}
      </List>
    </>
  );
};

export default ProductOptions;
