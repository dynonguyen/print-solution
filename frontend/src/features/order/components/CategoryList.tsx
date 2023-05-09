import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React from 'react';

// -----------------------------

type Category = {
  id: number;
  label: string;
  description?: string;
};

interface CategoryListProps {
  data: Category[];
  selected: number | undefined;
  onChange: (params: any) => any;
}

// -----------------------------
const CategoryList: React.FC<CategoryListProps> = (props) => {
  const { data, onChange, selected } = props;
  const generateCategoryList = () =>
    data?.map((item) => {
      return <MenuItem value={item.id}>{item.label}</MenuItem>;
    });

  return (
    <>
      <FormControl variant="outlined" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-filled-label">Chọn thể loại</InputLabel>
        <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          onChange={onChange}
          value={selected}
        >
          {generateCategoryList()}
        </Select>
      </FormControl>
    </>
  );
};

export default CategoryList;
