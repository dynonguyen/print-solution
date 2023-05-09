import { Box } from '@cads-ui/core';
import { Container, Typography } from '@mui/material';
import React, { useState } from 'react';
import UploadFile from '~/components/UploadFile';
import CategoryList from './CategoryList';

// -----------------------------
interface OrderFormProps {}

// -----------------------------
const OrderForm: React.FC<OrderFormProps> = (props) => {
  const MAX_FILE = 5;
  const MAX_SIZE = 500;
  const [selectedCategory, setSelectedCategory] = useState<number>();

  const CATEGORY_LIST = [
    {
      id: 1,
      label: 'Danh thiếp',
      description: ''
    },
    {
      id: 2,
      label: 'Bao thư',
      description: ''
    },
    {
      id: 3,
      label: 'Bìa đựng hồ sơ',
      description: ''
    },
    {
      id: 4,
      label: 'Poster - Băng rôn - Standee',
      description: ''
    },
    {
      id: 5,

      label: 'Tờ rơi',
      description: ''
    },
    {
      id: 6,
      label: 'Tờ gấp',
      description: ''
    }
  ];

  const handleCategoryChange = (val: number) => setSelectedCategory(val);

  return (
    <Container>
      <Typography variant="h4" align="center" m={5} sx={{ textTransform: 'uppercase', fontWeight: 'bold' }}>
        Tạo đơn hàng của bạn
      </Typography>
      <Typography variant="h5" mt={3} mb={2}>
        Tải lên tài liệu
      </Typography>
      <Box style={{ marginBottom: '1rem' }}>
        <UploadFile maxFiles={MAX_FILE} maxSizePerFile={MAX_SIZE} />
      </Box>
      <Typography variant="h5" mt={3} mb={2}>
        Chọn thể loại in
      </Typography>
      <CategoryList data={CATEGORY_LIST} selected={selectedCategory} onChange={handleCategoryChange} />
    </Container>
  );
};

export default OrderForm;
