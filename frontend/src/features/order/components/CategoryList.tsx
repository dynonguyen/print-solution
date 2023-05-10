import { FormControl, MenuItem, Select } from '@mui/material';
import React from 'react';

// -----------------------------

interface ICategory {
  id: number;
  label: string;
  description?: string;
}

interface CategoryListProps {
  data: ICategory[];
  selected: number | undefined;
  onChange: (params: any) => any;
}

// -----------------------------
const CategoryList: React.FC<CategoryListProps> = (props) => {
  const { data, onChange, selected } = props;

  const generateCategoryList = () =>
    data?.map((item) => {
      return (
        <MenuItem key={item.id} value={item.id}>
          {item.label}
        </MenuItem>
      );
    });

  return (
    <FormControl sx={{ width: '100%' }}>
      <Select
        labelId="demo-simple-select-filled-label"
        id="demo-simple-select-filled"
        onChange={onChange}
        value={selected}
      >
        {generateCategoryList()}
      </Select>
    </FormControl>
  );
};

export default CategoryList;
