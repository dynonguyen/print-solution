import { Box, Button, Container, Grid, SelectChangeEvent, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import UploadFile from '~/components/UploadFile';
import CategoryList from './CategoryList';
import ProductList from './ProductList';
import { CATEGORY_LIST, PRODUCT_LIST } from './data';
import Uploader from './Uploader';

// -----------------------------
interface OrderFormProps { }

// -----------------------------
const OrderForm: React.FC<OrderFormProps> = (props) => {
  const MAX_FILE = 5;
  const MAX_SIZE = 500;
  const [selectedCategory, setSelectedCategory] = useState<number>(1);
  const [selectedProduct, setSelectedProduct] = useState<number>(1);

  useEffect(() => {
    setSelectedCategory(CATEGORY_LIST[0].id);
    setSelectedCategory(PRODUCT_LIST[0].id);
  }, []);

  const handleCategoryChange = (event: SelectChangeEvent) => {
    const catId = parseInt(event.target.value);
    setSelectedCategory(catId);
  };

  const handleProductChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const prodId = parseInt((event.target as HTMLInputElement).value);
    console.log(prodId);
  };

  return (
    <Container>
      <Uploader />q
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
        Thể loại in
      </Typography>
      <CategoryList data={CATEGORY_LIST} selected={selectedCategory} onChange={handleCategoryChange} />
      <Typography variant="h5" mt={3} mb={2}>
        Sản phẩm in
      </Typography>
      <ProductList data={PRODUCT_LIST} selected={selectedProduct} onChange={handleProductChange} />
      <Typography variant="h5" mb={2}>
        Quy cách in
      </Typography>
      <TextField
        placeholder="Mô tả quy cách in tài liệu"
        multiline
        rows={4}
        style={{ width: '100%', marginBottom: '1rem' }}
      />
      <Typography variant="h5" mb={2}>
        Thông tin khách hàng
      </Typography>
      <Grid container style={{ marginBottom: '1rem' }} spacing={2}>
        <Grid item xs={6}>
          <TextField required id="tel" label="Số điện thoại liên hệ" fullWidth />
        </Grid>
        <Grid item xs={6}>
          <TextField required id="zalo" label="Địa chỉ email (Nhận báo giá)" fullWidth />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField id="tel" label="Tên của bạn" fullWidth />
        </Grid>
        <Grid item xs={6}>
          <TextField id="zalo" label="Địa chỉ giao hàng" fullWidth />
        </Grid>
      </Grid>
      <Grid container spacing={2} marginBottom={100} marginTop={5}>
        <Grid item xs={4}>
          <Button style={{ width: '100%' }} variant="outlined">
            Xem trước đơn hàng
          </Button>
        </Grid>
        <Grid item xs={8}>
          <Button style={{ width: '100%' }} variant="contained">
            Đặt in ngay
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default OrderForm;
