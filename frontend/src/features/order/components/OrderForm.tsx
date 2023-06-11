import { Box, Button, Container, Grid, SelectChangeEvent, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import UploadFile from '~/components/UploadFile';
import CategoryList from './CategoryList';
import ProductList from './ProductList';
import Uploader from './Uploader';
import UploadFiles from './UploadFiles';
import { Alert, FieldLabel } from '@cads-ui/core';
import { ENDPOINTS } from '~/constants/endpoints';
import orderAxios from '~/libs/axios/order';
import { fileReader } from '~/utils/file-reader';
import to from 'await-to-js';
import { withCatalogApolloProvider } from '~/libs/apollo/catalog';
import { useCategoryForSelectQuery, useGuestCategoryListQuery, useGuestProductListQuery } from '~/graphql/catalog/generated/graphql';
import useQueryPagination from '~/hooks/useQueryPagination';
import { toast } from 'react-toastify';
import { useNavigate, useLocation } from 'react-router-dom';
import { PATH } from '~/constants/path';

// -----------------------------
interface OrderFormProps { }

// -----------------------------
const OrderForm: React.FC<OrderFormProps> = withCatalogApolloProvider((props) => {
  const location = useLocation();

  const { data: dataCategory } = useGuestCategoryListQuery({ variables: { page: 1, pageSize: 1000, sort: 'name' } });
  const { search, setParams } = useQueryPagination();
  const navigate = useNavigate();

  const { data: dataProductList } = useGuestProductListQuery({
    variables: { sort: '-createdAt name' },
  });
  const PRODUCT_LIST = dataProductList?.products?.docs
  const CATEGORY_LIST = dataCategory?.catagories?.docs

  const MAX_FILE = 5;
  const MAX_SIZE = 500;
  const [error, setError] = React.useState({ field: '', msg: '' });
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedProduct, setSelectedProduct] = useState<string>("");
  const [amount, setAmount] = useState(1)
  const [selectedOptions, setSelectedOptions] = useState("")
  const [files, setFiles] = React.useState<File[] | FileList>([])
  const [formValues, setFormValues] = useState({
    tel: '',
    zalo: '',
    name: '',
    address: '',
    details: ''
  });

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const product = searchParams.get('product');
    const amount = searchParams.get('amount');
    const options = searchParams.get('options');
    setSelectedProduct(product ?? "")
    setAmount(parseInt(amount ?? "1"))
    setSelectedOptions(options ?? "")
  }, [location.search])


  const [loadingCreateOrder, setLoadingCreateOrder] = React.useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setError({ field: '', msg: '' });
    const { id, value } = event.target;
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [id]: value,
    }));
  };

  useEffect(() => {
    setSelectedCategory(CATEGORY_LIST?.[0]?._id || "");
    setSelectedProduct(PRODUCT_LIST?.[0]?._id || "");

  }, [dataProductList, dataCategory]);

  const handleCategoryChange = (event: SelectChangeEvent) => {
    const catId = event.target.value;
    setParams([{ key: 'category._id', value: catId }]);
    setSelectedCategory(catId);
  };

  const handleProductChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const prodId = (event.target as HTMLInputElement).value
    setSelectedProduct(prodId)
  };

  const handlePreview = () => {
    console.log("____form: ", formValues, selectedCategory, selectedProduct, files)
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setLoadingCreateOrder(true)
    try {
      if (!files || files.length === 0) return setError({ field: 'filesUpload', msg: 'Vui lòng chọn ít nhất 1 file' });

      const formData = [];
      const listFilesName = [];

      for (const file of files) {
        const fileDataUrl = await fileReader(file);
        formData.push(fileDataUrl)
        listFilesName.push(file.name)
      }

      const [uploadErr, uploadResult] = await to(
        orderAxios.post(ENDPOINTS.ORDER_API.CREATE, {
          listFiles: formData,
          listFilesName: listFilesName,
          selectedCategory,
          selectedProduct,
          ...formValues,
        })
      );

      if (uploadErr) {
        return toast.error('Đặt lệnh thất bại');
      } else {
        navigate(PATH.ORDER.DETAILS + `?id=${uploadResult.data.data.id}`)
      }
    } catch (error) {
      console.log("____ERROR: ", error)
    } finally {
      setLoadingCreateOrder(false)
    }
  }

  return (
    <Container component='form' onSubmit={handleSubmit}>
      {/* <Uploader /> */}
      <Typography variant="h4" align="center" m={5} sx={{ textTransform: 'uppercase', fontWeight: 'bold' }}>
        Tạo đơn hàng của bạn
      </Typography>
      <Typography variant="h5" mt={3} mb={2}>
        Tải lên tài liệu
      </Typography>
      {/* <Box style={{ marginBottom: '1rem' }}> */}
      {error.msg && <Alert type="error">{error.msg}</Alert>}
      <FieldLabel error={error.field === 'filesUpload'}>
        <UploadFile maxFiles={MAX_FILE} maxSizePerFile={MAX_SIZE} onFileChange={(files) => setFiles(files)} />
      </FieldLabel>
      {/* </Box> */}
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
        id="details"
        value={formValues.details} onChange={handleInputChange}
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
          <TextField error={error.field === 'tel'} type='number' required id="tel" label="Số điện thoại liên hệ" fullWidth value={formValues.tel} onChange={handleInputChange} />
        </Grid>
        <Grid item xs={6}>
          <TextField required id="zalo" label="Địa chỉ email (Nhận báo giá)" fullWidth value={formValues.zalo} onChange={handleInputChange} />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField id="name" label="Tên của bạn" fullWidth value={formValues.name} onChange={handleInputChange} />
        </Grid>
        <Grid item xs={6}>
          <TextField id="address" label="Địa chỉ giao hàng" fullWidth value={formValues.address} onChange={handleInputChange} />
        </Grid>
      </Grid>
      <Grid container spacing={2} marginBottom={100} marginTop={5}>
        <Grid item xs={4}>
          <Button onClick={handlePreview} style={{ width: '100%' }} variant="outlined">
            Xem trước đơn hàng
          </Button>
        </Grid>
        <Grid item xs={8}>
          <Button style={{ width: '100%' }} variant="contained" type='submit'>
            Đặt in ngay
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
});

export default OrderForm;
