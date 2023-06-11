import { FormControlLabel, Radio, RadioGroup } from '@mui/material';
import React from 'react';
import ProductItem from './ProductItem';
import { IProduct } from '~/types/Product';

// -----------------------------
interface ProductListProps {
  data: IProduct[] | undefined;
  selected: string | undefined;
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
        value={selected}
        name="radio-buttons-group"
        row
        onChange={onChange}
      >
        {data?.map((item) => {
          const { _id, name, photo } = item;

          return (
            <FormControlLabel
              key={_id}
              value={_id}
              control={<Radio />}
              label={<ProductItem label={name} description={""} image={photo} />}
              sx={{ marginBottom: '3rem' }}
            />
          );
        })}
      </RadioGroup>
    </>
  );
};

export default ProductList;
