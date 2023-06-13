import { Box, Button, Container, Grid, Paper, SelectChangeEvent, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import UploadFile from '~/components/UploadFile';
import CategoryList from './CategoryList';
import ProductList from './ProductList';
import Uploader from './Uploader';
import UploadFiles from './UploadFiles';
import { Alert, FieldLabel, Spinner } from '@cads-ui/core';
import { ENDPOINTS } from '~/constants/endpoints';
import orderAxios from '~/libs/axios/order';
import { fileReader } from '~/utils/file-reader';
import to from 'await-to-js';
import { withCatalogApolloProvider } from '~/libs/apollo/catalog';
import {
  useCategoryForSelectQuery,
  useGuestCategoryListQuery,
  useGuestProductListQuery
} from '~/graphql/catalog/generated/graphql';
import useQueryPagination from '~/hooks/useQueryPagination';
import { toast } from 'react-toastify';
import { useNavigate, useLocation } from 'react-router-dom';
import { PATH } from '~/constants/path';
import { CUSTOM_PRODUCT } from '~/types/Product';

// -----------------------------
interface OrderFormProps { }

// -----------------------------
const OrderForm: React.FC<OrderFormProps> = withCatalogApolloProvider((props) => {
  const location = useLocation();

  const { data: dataCategory } = useGuestCategoryListQuery({ variables: { page: 1, pageSize: 1000, sort: 'name' } });
  const { search, setParams } = useQueryPagination();
  const navigate = useNavigate();

  const { data: dataProductList } = useGuestProductListQuery({
    variables: { sort: '-createdAt name' }
  });

  const productList = dataProductList?.products?.docs;
  const PRODUCT_LIST = productList ? [...productList, CUSTOM_PRODUCT] : [CUSTOM_PRODUCT];
  const CATEGORY_LIST = dataCategory?.catagories?.docs;

  const MAX_FILE = 5;
  const MAX_SIZE = 500;
  const [error, setError] = React.useState({ field: '', msg: '' });
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedProduct, setSelectedProduct] = useState<string>('');
  const [selectedOptions, setSelectedOptions] = useState('');
  const [files, setFiles] = React.useState<File[] | FileList>([]);
  const [formValues, setFormValues] = useState({
    amount: 1,
    tel: '',
    email: '',
    name: '',
    address: '',
    details: ''
  });

  const [isErrors, setIsErrors] = useState({
    tel: false,
    email: false,
    name: false,
    address: false,
    details: false
  });

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const product = searchParams.get('product');
    const amount = searchParams.get('amount');
    const options = searchParams.get('options');
    console.log("____options");

    setSelectedProduct(product ?? '');
    setFormValues({ ...formValues, amount: amount ? parseInt(amount) : 1 })
    setSelectedOptions(options ?? '');
  }, [location.search]);

  const [loadingCreateOrder, setLoadingCreateOrder] = React.useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setError({ field: '', msg: '' });
    const { id, value } = event.target;
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [id]: value
    }));
  };

  useEffect(() => {
    setSelectedCategory(CATEGORY_LIST?.[0]?._id || '');
    // setSelectedProduct(PRODUCT_LIST?.[0]?._id || '');
  }, [dataProductList, dataCategory]);

  const handleCategoryChange = (event: SelectChangeEvent) => {
    const catId = event.target.value;
    setParams([{ key: 'category._id', value: catId }]);
    setSelectedCategory(catId);
  };

  const handleProductChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const prodId = (event.target as HTMLInputElement).value;
    setSelectedProduct(prodId);
  };

  const handlePreview = () => {
    console.log('____form: ', formValues, selectedCategory, selectedProduct, files);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setLoadingCreateOrder(true);
    try {
      // if (!files || files.length === 0) return setError({ field: 'filesUpload', msg: 'Vui lòng chọn ít nhất 1 file' });

      const formData = [];
      const listFilesName = [];

      for (const file of files) {
        const fileDataUrl = await fileReader(file);
        formData.push(fileDataUrl);
        listFilesName.push(file.name);
      }

      const { amount, details, ...rest } = formValues

      const [uploadErr, uploadResult] = await to(
        orderAxios.post(ENDPOINTS.ORDER_API.CREATE, {
          products: [
            { _id: selectedProduct, options: selectedOptions, listFiles: formData, listFilesName: listFilesName, amount, details, price: 1000 },
            { _id: selectedProduct, options: selectedOptions, listFiles: formData, listFilesName: listFilesName, amount, details, price: 2000 }
          ],
          ...rest
        })
      );

      console.log("_____rs: ", uploadResult?.data);

      if (uploadErr) {
        return toast.error('Đặt lệnh thất bại');
      } else {
        navigate(PATH.ORDER.SUCCESS + `?display_id=${uploadResult.data.data}`);
      }
    } catch (error) {
      console.log('____ERROR: ', error);
    } finally {
      setLoadingCreateOrder(false);
    }
  };

  // Validate Input:
  const validate = (key: string, value: string | number) => {
    let isValid = true
    switch (key) {
      case 'email':
        isValid = /^\S+@\S+\.\S+$/.test(value + '');
        break;

      default:
        break;
    }
    setIsErrors(prev => ({ ...prev, [key]: !isValid }));
  };

  const handleBlur: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement> = (event) => {
    const key = event.target.id as keyof typeof formValues;

    if (formValues?.[key] !== '') {
      validate(key, formValues[key]);
    }
  };

  const handleFocus: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement> = (event) => {
    const key = event.target?.id as keyof typeof formValues;
    setIsErrors(prev => ({ ...prev, [key]: false }));
  };

  return (
    <Container component="form" onSubmit={handleSubmit}>
      {/* <Uploader /> */}
      <Typography variant="h4" align="center" m={5} sx={{ textTransform: 'uppercase', fontWeight: 'bold' }}>
        Tạo đơn hàng của bạn
      </Typography>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="h6" mt={3} mb={2}>
              Số lượng
            </Typography>
            <TextField
              hiddenLabel
              error={error.field === 'amount'}
              type="number"
              required
              id="amount"
              fullWidth
              value={formValues.amount}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h6" mt={3} mb={2}>
              Lựa chọn
            </Typography>
            <TextField
              hiddenLabel
              aria-readonly
              id="amount"
              fullWidth
              value={selectedOptions}
            />
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <Typography variant="h5" mt={3} mb={2}>
              Tải lên bản thiết kế
            </Typography>
            {error.msg && <Alert type="error">{error.msg}</Alert>}
            <FieldLabel error={error.field === 'filesUpload'}>
              <UploadFile maxFiles={MAX_FILE} maxSizePerFile={MAX_SIZE} onFileChange={(files) => setFiles(files)} />
            </FieldLabel>
          </Grid>
          <Grid item xs={4}>
            {/* <Typography variant="h5" mt={3} mb={2}>
              Thể loại in
            </Typography>
            <CategoryList data={CATEGORY_LIST} selected={selectedCategory} onChange={handleCategoryChange} /> */}
            <Typography variant="h5" mt={3} mb={2}>
              Ghi chú cách in
            </Typography>
            <TextField
              id="details"
              value={formValues.details}
              onChange={handleInputChange}
              placeholder="Mô tả quy cách in tài liệu"
              multiline
              rows={6}
              style={{ width: '100%', marginBottom: '1rem' }}
            />
          </Grid>
        </Grid>
      </Box>

      <Typography variant="h5" mt={3} mb={2}>
        Sản phẩm in
      </Typography>
      <ProductList data={PRODUCT_LIST} selected={selectedProduct} onChange={handleProductChange} />

      <Typography variant="h5" mb={2}>
        Thông tin khách hàng
      </Typography>
      <Grid container style={{ marginBottom: '1rem' }} spacing={2}>
        <Grid item xs={6}>
          <TextField
            error={error.field === 'tel'}
            type="number"
            required
            id="tel"
            label="Số điện thoại liên hệ"
            fullWidth
            value={formValues.tel}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            required
            id="email"
            label="Địa chỉ email (Nhận báo giá)"
            fullWidth
            value={formValues.email}
            onChange={handleInputChange}
            error={isErrors.email}
            onBlur={handleBlur}
            onFocus={handleFocus}
            helperText={isErrors.email && 'Please enter a valid email address.'}

          />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField id="name" label="Tên của bạn" fullWidth value={formValues.name} onChange={handleInputChange} />
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="address"
            label="Địa chỉ giao hàng"
            fullWidth
            value={formValues.address}
            onChange={handleInputChange}
          />
        </Grid>
      </Grid>
      <Grid container spacing={2} marginBottom={100} marginTop={5}>
        <Grid item xs={4}>
          <Button onClick={handlePreview} style={{ width: '100%' }} variant="outlined">
            Xem trước đơn hàng
          </Button>
        </Grid>
        <Grid item xs={8}>
          <Button disabled={loadingCreateOrder} style={{ width: '100%' }} variant="contained" type="submit">
            {/* import LoopOutlinedIcon from '@mui/icons-material/LoopOutlined'; */}
            {loadingCreateOrder ? (
              <svg xmlns='http://www.w3.org/2000/svg'
                style={{
                  background: 'rgba(0, 0, 0, 0) none repeat scroll 0% 0%',
                  display: 'block',
                  shapeRendering: 'auto'
                }}
                viewBox='0 0 100 100'
                width={24}
                height={24}
                preserveAspectRatio='xMidYMid'
                className="ml-1"
              >
                <g transform='rotate(0 50 50)'>
                  <rect x='44' y='9' rx='6' ry='7.2' width='12' height='28' fill={'#F6F6F6'}>
                    <animate attributeName='opacity' values='1;0' keyTimes='0;1' dur='1s' begin='-0.875s'
                      repeatCount='indefinite'></animate>
                  </rect>
                </g>
                <g transform='rotate(45 50 50)'>
                  <rect x='44' y='9' rx='6' ry='7.2' width='12' height='28' fill={'#F6F6F6'}>
                    <animate attributeName='opacity' values='1;0' keyTimes='0;1' dur='1s' begin='-0.75s'
                      repeatCount='indefinite'></animate>
                  </rect>
                </g>
                <g transform='rotate(90 50 50)'>
                  <rect x='44' y='9' rx='6' ry='7.2' width='12' height='28' fill={'#F6F6F6'}>
                    <animate attributeName='opacity' values='1;0' keyTimes='0;1' dur='1s' begin='-0.625s'
                      repeatCount='indefinite'></animate>
                  </rect>
                </g>
                <g transform='rotate(135 50 50)'>
                  <rect x='44' y='9' rx='6' ry='7.2' width='12' height='28' fill={'#F6F6F6'}>
                    <animate attributeName='opacity' values='1;0' keyTimes='0;1' dur='1s' begin='-0.5s'
                      repeatCount='indefinite'></animate>
                  </rect>
                </g>
                <g transform='rotate(180 50 50)'>
                  <rect x='44' y='9' rx='6' ry='7.2' width='12' height='28' fill={'#F6F6F6'}>
                    <animate attributeName='opacity' values='1;0' keyTimes='0;1' dur='1s' begin='-0.375s'
                      repeatCount='indefinite'></animate>
                  </rect>
                </g>
                <g transform='rotate(225 50 50)'>
                  <rect x='44' y='9' rx='6' ry='7.2' width='12' height='28' fill={'#F6F6F6'}>
                    <animate attributeName='opacity' values='1;0' keyTimes='0;1' dur='1s' begin='-0.25s'
                      repeatCount='indefinite'></animate>
                  </rect>
                </g>
                <g transform='rotate(270 50 50)'>
                  <rect x='44' y='9' rx='6' ry='7.2' width='12' height='28' fill={'#F6F6F6'}>
                    <animate attributeName='opacity' values='1;0' keyTimes='0;1' dur='1s' begin='-0.125s'
                      repeatCount='indefinite'></animate>
                  </rect>
                </g>
                <g transform='rotate(315 50 50)'>
                  <rect x='44' y='9' rx='6' ry='7.2' width='12' height='28' fill={'#F6F6F6'}>
                    <animate attributeName='opacity' values='1;0' keyTimes='0;1' dur='1s' begin='0s'
                      repeatCount='indefinite'></animate>
                  </rect>
                </g>
              </svg>
            ) : 'Đặt in'}
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
});

export default OrderForm;
