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
  onChange: (event: any) => any;
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
        onChange={onChange}
      >
        {data?.map((item) => {
          const { id, label, description, image } = item;

          return (
            <FormControlLabel
              key={id}
              value={id}
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
