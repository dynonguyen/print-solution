import { Box, Button, Divider, FieldLabel, Flex, Input, Typography } from '@cads-ui/core';
import { yupResolver } from '@hookform/resolvers/yup';
import to from 'await-to-js';
import { isEmpty } from 'lodash';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { ENDPOINTS } from '~/constants/endpoints';
import { PATH } from '~/constants/path';
import { MAX, REGEX } from '~/constants/validation';
import orderAxios from '~/libs/axios/order';
import { RootState } from '~/libs/redux/store';
import { fileReader } from '~/utils/file-reader';

const schema = yup.object({
  name: yup
    .string()
    .trim()
    .required('Tên không được bỏ trống')
    .max(MAX.CUSTOMER_NAME, `Tối đa ${MAX.CUSTOMER_NAME} ký tự`),

  tel: yup
    .string()
    .trim()
    .required('Số điện thoại không được bỏ trống')
    .matches(REGEX.PHONE_NUMBER, 'Số điện thoại không hợp lệ!'),

  email: yup.string().trim().required('Email không được bỏ trống').email('Email không hợp lệ')
});

type ICustomerContact = {
  name: string;
  tel: string;
  email: string;
};

function CusContactForm() {
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ICustomerContact>({
    resolver: yupResolver(schema)
  });

  const [loadingCreateOrder, setLoadingCreateOrder] = useState(false)

  const onSubmit: SubmitHandler<ICustomerContact> = async (data) => {
    const { name, tel, email, } = data
    setLoadingCreateOrder(true);
    try {
      const listProducts = [];

      for (const cartItem of cartItems) {
        const formData = [];
        const listFilesName = [];

        for (const file of cartItem.files) {
          if (!file || isEmpty(file)) continue;

          const fileDataUrl = await fileReader(file);
          formData.push(fileDataUrl);
          listFilesName.push(file.name);
        }

        listProducts.push({
          ...cartItem,
          listFiles: formData,
          listFilesName: listFilesName,
        });
      }


      const [uploadErr, uploadResult] = await to(
        orderAxios.post(ENDPOINTS.ORDER_API.CREATE, {
          name, tel, email,
          products: listProducts,
        })
      );

      console.log('_____rs: ', uploadResult?.data);

      if (uploadErr) {
        return toast.error('Yêu cầu thất bại');
      } else {
        navigate(PATH.ORDER.SUCCESS + `?display_id=${uploadResult.data.data}`);
      }
    } catch (error) {
      console.log('____ERROR: ', error);
    } finally {
      setLoadingCreateOrder(false);
    }

  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', m: '20px 0px' }}>
        <Typography variant="h2">📚 Thông tin đặt hàng 📚</Typography>
      </Box>

      <Divider sx={{ mt: 6 }} />

      <FieldLabel sx={{ m: 6 }} label="Họ và tên" error={Boolean(errors.name)} message={errors.name?.message}>
        <Input fullWidth {...register('name')} />
      </FieldLabel>

      <FieldLabel sx={{ m: 6 }} label="Số điện thoại" error={Boolean(errors.tel)} message={errors.tel?.message}>
        <Input fullWidth {...register('tel')} />
      </FieldLabel>

      <FieldLabel sx={{ m: 6 }} label="Email" error={Boolean(errors.email)} message={errors.email?.message}>
        <Input fullWidth {...register('email')} />
      </FieldLabel>

      <Flex sx={{ m: 6 }} justifyContent="center">
        <Button type="submit" variant="contained" fullWidth sx={{ mt: 4, color: 'white', p: '8px 0px' }}>
          Hoàn thành
        </Button>
      </Flex>
    </form>
  );
}

export default CusContactForm;
