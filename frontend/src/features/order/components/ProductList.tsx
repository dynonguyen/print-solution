import { FormControlLabel, Radio, RadioGroup } from '@mui/material';
import React from 'react';
import ProductItem from './ProductItem';

// -----------------------------
export interface IProduct {
  __typename?: "Product" | undefined;
  _id: string;
  uuid: string;
  photo: string;
  name: string;
  price: number;
  unit: string;
  isHidden: boolean;
  category?: {
    __typename?: "Category" | undefined;
    name: string;
  } | null | undefined;
}

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
