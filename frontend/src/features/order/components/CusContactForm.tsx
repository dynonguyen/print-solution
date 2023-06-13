import { Box, Button, Divider, FieldLabel, Flex, Input, Typography } from '@cads-ui/core';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { MAX, REGEX } from '~/constants/validation';

const schema = yup.object({
  name: yup
    .string()
    .trim()
    .required('Tên không được bỏ trống')
    .max(MAX.CUSTOMER_NAME, `Tối đa ${MAX.CUSTOMER_NAME} ký tự`),

  phone: yup
    .string()
    .trim()
    .required('Số điện thoại không được bỏ trống')
    .matches(REGEX.PHONE_NUMBER, 'Số điện thoại không hợp lệ!'),

  email: yup.string().trim().required('Email không được bỏ trống').email('Email không hợp lệ')
});

type ICustomerContact = {
  name: string;
  phone: string;
  email: string;
};

function CusContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ICustomerContact>({
    resolver: yupResolver(schema)
  });

  const onSubmit: SubmitHandler<ICustomerContact> = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', m: '20px 0px' }}>
        <Typography variant="h2">📚 Thông tin đặt hàng 📚</Typography>
      </Box>

      <Divider sx={{ mt: 6 }} />

      <FieldLabel sx={{ m: 6 }} label="Họ và tên" error={Boolean(errors.name)} message={errors.name?.message}>
        <Input fullWidth {...register('name')} />
      </FieldLabel>

      <FieldLabel sx={{ m: 6 }} label="Số điện thoại" error={Boolean(errors.phone)} message={errors.phone?.message}>
        <Input fullWidth {...register('phone')} />
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
