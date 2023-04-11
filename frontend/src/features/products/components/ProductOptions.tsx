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

const OptionShow = ({ option }: any) => {
  let listValues;
  switch (option.optionType) {
    case PRODUCT_OPTION_TYPES.SINGLE_SELECT:
      listValues = (
        <RadioGroup name={PRODUCT_OPTION_TYPES.SINGLE_SELECT} row>
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
            return <FormControlLabel value={value} control={<Checkbox />} label={value} key={value} />;
          })}
        </FormGroup>
      );
      break;
    default:
      listValues = <TextField id={option.label} multiline fullWidth rows={4} placeholder={option.label} />;
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

const ProductOptions = ({ options }: any) => {
  return (
    <>
      <Typography variant="h6" color={indigo[500]} sx={{ mt: 4 }}>
        Yêu cầu của bạn
      </Typography>
      <List>
        {options?.map((option: any) => {
          return <OptionShow key={option.label} option={option} />;
        })}
      </List>
    </>
  );
};

export default ProductOptions;
