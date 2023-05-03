import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React from 'react';

// -----------------------------
interface CategoryProps {}

// -----------------------------
const Category: React.FC<CategoryProps> = (props) => {
  const handleChange = () => {};

  const categories = [
    {
      label: 'in tai lieu',
      value: 'in tai lieu'
    },
    {
      label: 'in quang cao',
      value: 'in quang cao'
    },
    {
      label: 'in su kien',
      value: 'in su kien'
    }
  ];

  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">Chon the loai in</InputLabel>
      <Select labelId="demo-simple-select-label" id="demo-simple-select" label="Age" onChange={handleChange}>
        {categories.map((item, idx) => (
          <MenuItem value={item.value}>{item.label}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default Category;
