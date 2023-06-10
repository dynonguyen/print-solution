import { useApolloClient } from '@apollo/client';
import { Box, Button, FieldLabel, Flex, Grid, Input, usePreventTabClose } from '@cads-ui/core';
import { yupResolver } from '@hookform/resolvers/yup';
import to from 'await-to-js';
import omit from 'lodash/omit';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useSetRecoilState } from 'recoil';
import * as yup from 'yup';
import CategorySelect from '~/components/CategorySelect';
import Icon from '~/components/Icon';
import UploadFile, { UploadFileRef } from '~/components/UploadFile';
import { CONTACT_PRICE } from '~/constants/common';
import { ENDPOINTS } from '~/constants/endpoints';
import { SUCCESS_CODE } from '~/constants/status-code';
import { MAX } from '~/constants/validation';
import { useAddProductMutation, useUpdateProductMutation } from '~/graphql/catalog/generated/graphql';
import { withCatalogApolloProvider } from '~/libs/apollo/catalog';
import docsAxios from '~/libs/axios/docs';
import { Product } from '~/types/Product';
import { fileReader } from '~/utils/file-reader';
import { toVND } from '~/utils/helper';
import { withMinio } from '~/utils/withStatic';
import { resetFormAtom } from '../atom/reset-form';
import DescEditor from './DescEditor';
import ProductInfoFields from './ProductInfoFields';
import ProductOptionFields from './ProductOptionFields';

// -----------------------------
interface ProductFormProps {
  isEdit?: boolean;
  editedProduct?: Partial<Product>;
}
type ProductFormValues = Omit<Product, '_id' | 'uuid' | 'numOfViews' | 'numOfFavorites' | 'createdAt' | 'updatedAt'>;

// -----------------------------
const schema = yup.object({
  name: yup
    .string()
    .trim()
    .required('Tên không được bỏ trống')
    .max(MAX.PRODUCT_NAME, `Tối đa ${MAX.PRODUCT_NAME} ký tự`),
  categoryId: yup.string().trim().required('Danh mục không được bỏ trống'),
  photo: yup.string().trim().required('Ảnh sản phẩm không được bỏ trống'),
  price: yup
    .number()
    .min(0, 'Tối thiểu là 0')
    .max(MAX.PRODUCT_PRICE, `Tối đa ${toVND(MAX.PRODUCT_PRICE)}`)
    .typeError('Giá không hợp lệ'),
  unit: yup
    .string()
    .trim()
    .required('Đơn vị không được bỏ trống')
    .max(MAX.PRODUCT_UNIT, `Tối đa ${MAX.PRODUCT_UNIT} ký tự`)
});

const defaultValues: ProductFormValues = {
  name: '',
  categoryId: '',
  photo: '',
  price: CONTACT_PRICE,
  unit: '',
  htmlDesc: '',
  infos: [],
  options: []
};

// -----------------------------
const ProductForm: React.FC<ProductFormProps> = withCatalogApolloProvider(({ isEdit = false, editedProduct = {} }) => {
  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    reset,
    getValues,
    formState: { errors }
  } = useForm<ProductFormValues>({
    resolver: yupResolver(schema),
    defaultValues: isEdit ? editedProduct : defaultValues
  });
  const photoFile = React.useRef<File | null>(null);
  const [addProductMutation] = useAddProductMutation();
  const [updateProductMutation] = useUpdateProductMutation();
  const apolloClient = useApolloClient();

  const [loading, setLoading] = React.useState(false);
  const setResetForm = useSetRecoilState(resetFormAtom);
  const uploadFileRef = React.useRef<UploadFileRef>(null);

  const uploadProductPhoto = async () => {
    const fileDataUrl = await fileReader(photoFile.current!);
    const [uploadErr, uploadResult] = await to(
      docsAxios.post(ENDPOINTS.DOCS_API.UPLOAD_PRODUCT_PHOTO, {
        dataBase64: fileDataUrl,
        fileName: photoFile.current!.name
      })
    );

    if (uploadErr) {
      console.log(uploadErr);
      toast.error('Upload ảnh thất bại');
      return '';
    }

    const { photoUrl } = uploadResult.data;

    return photoUrl;
  };

  const handleAddProductError = (photoUrl: string, msg?: string) => {
    docsAxios.delete(ENDPOINTS.DOCS_API.DELETE_PHOTO, { params: { photoUrl } });
    toast.error(msg || 'Thêm sản phẩm thất bại, thử lại');
  };

  const handleResetForm = () => {
    reset({ ...defaultValues });
    setResetForm((curFlag) => !curFlag);
    uploadFileRef.current?.reset();
  };

  const handleAddProduct = async (form: ProductFormValues) => {
    setLoading(true);

    const photo = await uploadProductPhoto();

    if (!photo) {
      setLoading(false);
      return;
    }

    const [err, res] = await to(addProductMutation({ variables: { addProductInput: { ...form, photo } } }));

    if (err || res?.data?.addProduct.code !== SUCCESS_CODE.CREATED) {
      handleAddProductError(photo, res?.data?.addProduct.msg || '');
    } else {
      toast.success('Thêm sản phẩm thành công');
      apolloClient.cache.reset();
    }

    setLoading(false);
  };

  const handleUpdateProduct = async (form: ProductFormValues) => {
    setLoading(true);
    const photo = photoFile.current ? await uploadProductPhoto() : getValues('photo');

    if (!photo) {
      setLoading(false);
      return;
    }

    const [err, res] = await to(
      updateProductMutation({
        variables: {
          updateProductInput: {
            ...(omit(form, ['__typename', '_id']) as ProductFormValues),
            photo,
            uuid: editedProduct.uuid
          }
        },
        fetchPolicy: 'no-cache'
      })
    );

    if (err || res?.data?.updateProduct.code !== SUCCESS_CODE.OK) {
      if (photoFile.current) {
        handleAddProductError(photo, res?.data?.updateProduct.msg || '');
      } else {
        toast.error(res?.data?.updateProduct.msg || 'Cập nhật sản phẩm thất bại, thử lại');
      }
    } else {
      if (photoFile.current) {
        console.log(editedProduct.photo);
        docsAxios.delete(ENDPOINTS.DOCS_API.DELETE_PHOTO, { params: { photoUrl: editedProduct.photo } });
      }
      apolloClient.cache.reset();
      toast.success('Cập nhật sản phẩm thành công');
    }

    setLoading(false);
  };

  usePreventTabClose(false);

  return (
    <Grid container rowSpacing={3} columnSpacing={5}>
      {/* Name */}
      <Grid item xs={12} md={6}>
        <FieldLabel label="Tên sản phẩm *" error={Boolean(errors.name)} message={errors.name?.message}>
          <Input fullWidth {...register('name')} />
        </FieldLabel>
      </Grid>
      {/* Category */}
      <Grid item xs={12} md={6}>
        <FieldLabel label="Danh mục *" error={Boolean(errors.categoryId)} message={errors.categoryId?.message}>
          <CategorySelect
            value={getValues('categoryId')}
            onChange={(catId) => {
              setValue('categoryId', catId);
              trigger('categoryId');
            }}
          />
        </FieldLabel>
      </Grid>
      {/* Photo */}
      <Grid item xs={12}>
        <FieldLabel
          label="Hình ảnh đại diện *"
          error={Boolean(errors.photo)}
          message={errors.photo?.message}
          renderInput={() => (
            <React.Fragment>
              {isEdit && getValues('photo') && !photoFile.current ? (
                <Flex spacing={2}>
                  <Box sx={{ w: 150, h: 150 }} component="img" src={withMinio(getValues('photo'))} />
                  <Icon
                    onClick={() => {
                      setValue('photo', '');
                      trigger('photo');
                    }}
                    sx={{
                      w: 28,
                      h: 28,
                      color: 'text.secondary',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      _hover: { color: 'error.main' }
                    }}
                    icon="mdi:bin"
                  />
                </Flex>
              ) : (
                <UploadFile
                  ref={uploadFileRef}
                  acceptFiles=".jpg,.png,.jpeg,.webp"
                  ListProps={{ sx: { '& .cads-list-item': { p: 0, __bgColor: 'unset', cursor: 'default' } } }}
                  onFileChange={(files) => {
                    photoFile.current = files[0] || null;
                    setValue('photo', files[0]?.name || '');
                    if (files.length) trigger('photo');
                  }}
                />
              )}
            </React.Fragment>
          )}
        />
      </Grid>
      {/* Price */}
      <Grid item xs={12} md={6}>
        <FieldLabel
          label="Giá *"
          error={Boolean(errors.price)}
          message={errors.price?.message}
          info="Nếu 0 thì người dùng liên hệ để biết giá"
        >
          <Input fullWidth type="number" min={0} max={MAX.PRODUCT_PRICE} {...register('price')} />
        </FieldLabel>
      </Grid>
      {/* Unit */}
      <Grid item xs={12} md={6}>
        <FieldLabel label="Đơn vị tính *" error={Boolean(errors.unit)} message={errors.unit?.message}>
          <Input fullWidth {...register('unit')} />
        </FieldLabel>
      </Grid>
      {/* Infos */}
      <Grid item xs={12}>
        <FieldLabel label="Thông số cơ bản">
          <ProductInfoFields defaultValue={editedProduct.infos} onChange={(infos) => setValue('infos', infos)} />
        </FieldLabel>
      </Grid>
      {/* options */}
      <Grid item xs={12}>
        <FieldLabel label="Tùy chọn của khách hàng">
          <ProductOptionFields
            defaultValue={editedProduct.options}
            onChange={(options) => setValue('options', options)}
          />
        </FieldLabel>
      </Grid>
      {/* desc */}
      <Grid item xs={12}>
        <FieldLabel label="Mô tả chi tiết">
          <DescEditor value={getValues('htmlDesc')} onChange={(desc) => setValue('htmlDesc', desc)} />
        </FieldLabel>
      </Grid>
      {/* Submit button */}
      <Grid item xs={12} sx={{ textAlign: 'right' }}>
        <Flex spacing={2} justifyContent="flex-end">
          <Button color="error" onClick={handleResetForm} disabled={loading}>
            Reset
          </Button>
          {isEdit ? (
            <Button onClick={handleSubmit(handleUpdateProduct)} loading={loading}>
              Cập nhật sản phẩm
            </Button>
          ) : (
            <Button onClick={handleSubmit(handleAddProduct)} loading={loading}>
              Thêm sản phẩm
            </Button>
          )}
        </Flex>
      </Grid>
    </Grid>
  );
});

export default ProductForm;
