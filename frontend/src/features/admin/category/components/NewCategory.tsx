import { Alert, Button, Dialog, FieldLabel, Flex, Input } from '@cads-ui/core';
import to from 'await-to-js';
import React from 'react';
import { toast } from 'react-toastify';
import Icon from '~/components/Icon';
import UploadFile from '~/components/UploadFile';
import { ENDPOINTS } from '~/constants/endpoints';
import { SUCCESS_CODE } from '~/constants/status-code';
import { MAX } from '~/constants/validation';
import { useAddCategoryMutation } from '~/graphql/catalog/generated/graphql';
import docsAxios from '~/libs/axios/docs';
import { fileReader } from '~/utils/file-reader';
import { getFileExt } from '~/utils/helper';

// -----------------------------
interface CategoryForm {
  name: string;
  photoFile: File | null;
}

// -----------------------------
const NewCategory = () => {
  const [open, setOpen] = React.useState(false);
  const [error, setError] = React.useState({ field: '', msg: '' });
  const form = React.useRef<CategoryForm>({ name: '', photoFile: null });
  const [loading, setLoading] = React.useState(false);
  const [addCategoryMutation] = useAddCategoryMutation();

  const handleAddCategorySuccess = () => {
    toast.success('Thêm danh mục thành công');
    setOpen(false);
  };

  const handleAddCategory = async () => {
    const { name, photoFile } = form.current;
    if (!name.length) return setError({ field: 'name', msg: 'Vui lòng nhập tên danh mục' });
    if (name.length > MAX.CATEGORY_NAME)
      return setError({ field: 'name', msg: `Danh mục tối đa ${MAX.CATEGORY_NAME} ký tự` });
    if (!photoFile) return setError({ field: 'photoFile', msg: 'Vui lòng chọn 1 hình ảnh' });

    setLoading(true);

    const fileDataUrl = await fileReader(photoFile);
    const [uploadErr, uploadResult] = await to(
      docsAxios.post(ENDPOINTS.DOCS_API.UPLOAD_CATEGORY_PHOTO, {
        dataBase64: fileDataUrl,
        fileName: `${name}${getFileExt(photoFile.name)}`
      })
    );

    if (uploadErr) {
      console.log(uploadErr);
      return toast.error('Upload ảnh thất bại');
    }

    const { photoUrl } = uploadResult.data;
    const { errors, data } = await addCategoryMutation({ variables: { addCategoryInput: { name, photoUrl } } });

    if (errors?.length || data?.addCategory.code !== SUCCESS_CODE.CREATED) {
      docsAxios.delete(ENDPOINTS.DOCS_API.UPLOAD_CATEGORY_PHOTO, { params: { photoUrl } });
      toast.error(data?.addCategory.msg || 'Thêm danh mục thất bại, thử lại');
    } else {
      handleAddCategorySuccess();
    }

    setError({ field: '', msg: '' });
    setLoading(false);
  };

  return (
    <React.Fragment>
      <Flex justifyContent="flex-end" sx={{ mb: 8 }}>
        <Button variant="text" endIcon={<Icon icon="material-symbols:add" />} onClick={() => setOpen(true)}>
          Thêm danh mục mới
        </Button>
      </Flex>

      <Dialog
        open={open}
        PopoverProps={{ disabledBackdropClick: true }}
        onClose={() => setOpen(false)}
        header="Thêm danh mục sản phẩm"
        body={
          <Flex direction="column" spacing={3}>
            {error.msg && <Alert type="error">{error.msg}</Alert>}

            <FieldLabel label="Tên danh mục *" error={error.field === 'name'}>
              <Input fullWidth onChange={(e) => (form.current.name = e.target.value.trim())} />
            </FieldLabel>

            <FieldLabel label="Hình ảnh danh mục *" error={error.field === 'photoFile'}>
              <UploadFile maxFiles={1} onFileChange={(files) => (form.current.photoFile = files[0])} />
            </FieldLabel>
          </Flex>
        }
        hideDivider
        sx={{ minW: 450 }}
        maxWidth="md"
        action={
          <Flex spacing={2}>
            <Button variant="soft" color="grey" onClick={() => setOpen(false)}>
              Hủy
            </Button>
            <Button onClick={handleAddCategory} loading={loading}>
              Thêm
            </Button>
          </Flex>
        }
      />
    </React.Fragment>
  );
};

export default NewCategory;
