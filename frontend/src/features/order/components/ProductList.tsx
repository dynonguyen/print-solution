import { FormControlLabel, Radio, RadioGroup } from '@mui/material';
import React from 'react';
import ProductItem from './ProductItem';

// -----------------------------
export interface IProduct {
  id: number;
  label: string;
  image: string;
  description: string;
}

interface ProductListProps {
  data: IProduct[];
  selected: number | undefined;
  onChange: (val: number) => any;
}

// -----------------------------
const ProductList: React.FC<ProductListProps> = (props) => {
  const { data, selected, onChange } = props;
  return (
    <>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue={selected}
        name="radio-buttons-group"
        row
      >
        {data?.map((item) => {
          const { label, description, image } = item;

          return (
            <FormControlLabel
              value={item.id}
              control={<Radio />}
              label={<ProductItem label={label} description={description} image={image} />}
              sx={{ marginBottom: '3rem' }}
            />
          );
        })}
      </RadioGroup>
    </>
  );
};

export default ProductList;
