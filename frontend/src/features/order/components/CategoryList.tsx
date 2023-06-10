import { FormControl, MenuItem, Select } from '@mui/material';
import React from 'react';

// -----------------------------

interface ICategory {
  __typename?: "Category" | undefined;
  _id: string;
  name: string;
  photo: string;
}

interface CategoryListProps {
  data: ICategory[] | undefined;
  selected: string | undefined;
  onChange: (event: any) => any;
}

// -----------------------------
const CategoryList: React.FC<CategoryListProps> = (props) => {
  const { data, onChange, selected } = props;

  const generateCategoryList = () =>
    data?.map((item) => {
      return (
        <MenuItem key={item._id} value={item._id}>
          {item.name}
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
