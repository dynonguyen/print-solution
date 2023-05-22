import { Container, Typography } from '@cads-ui/core';
import React from 'react';
import Page from '~/components/Page';
import ProductForm from '../components/ProductForm';

// -----------------------------
interface NewProductProps {}

// -----------------------------
const AdminNewProductPage: React.FC<NewProductProps> = (props) => {
  return (
    <Page title="Thêm sản phẩm">
      <Container maxWidth="lg">
        <Typography variant="h4" transform="uppercase" sx={{ mb: 8 }} color="primary.main">
          Thêm sản phẩm mới
        </Typography>
        <ProductForm />
      </Container>
    </Page>
  );
};

export default AdminNewProductPage;
