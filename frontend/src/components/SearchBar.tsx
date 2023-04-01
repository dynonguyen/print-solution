import { Input, InputProps } from '@cads-ui/core';
import React from 'react';
import useQueryPagination from '~/hooks/useQueryPagination';
import Icon from './Icon';

// -----------------------------
const SearchBar: React.FC<InputProps> = (props) => {
  const { setParams, deleteParams, search } = useQueryPagination();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const keyword = e.target.value.trim();
    if (keyword) {
      setParams([{ key: 'search', value: keyword }]);
    } else if (search && !keyword) deleteParams(['search']);
  };

  return (
    <Input
      debounceTime={250}
      onChange={handleSearch}
      placeholder="Tìm kiếm"
      endIcon={<Icon icon="ic:round-search" />}
      {...props}
    />
  );
};

export default SearchBar;
