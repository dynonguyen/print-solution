import { Alert, Button, Dialog, FieldLabel, Flex, Input } from '@cads-ui/core';
import React from 'react';
import Icon from '~/components/Icon';
import UploadFile from '~/components/UploadFile';
import { MAX } from '~/constants/validation';

// -----------------------------
interface CategoryForm {
  name: string;
  photoFile: File | null;
}

// -----------------------------
const NewCategory = () => {
  const [open, setOpen] = React.useState(true);
  const [error, setError] = React.useState({ field: '', msg: '' });
  const form = React.useRef<CategoryForm>({ name: '', photoFile: null });

  const handleAddCategory = () => {
    const { name, photoFile } = form.current;
    if (!name.length) return setError({ field: 'name', msg: 'Vui lòng nhập tên danh mục' });
    if (name.length > MAX.CATEGORY_NAME)
      return setError({ field: 'name', msg: `Danh mục tối đa ${MAX.CATEGORY_NAME} ký tự` });
    if (!photoFile) return setError({ field: 'photoFile', msg: 'Vui lòng chọn 1 hình ảnh' });

    setError({ field: '', msg: '' });
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
            <Button variant="soft" color="grey">
              Hủy
            </Button>
            <Button onClick={handleAddCategory}>Thêm</Button>
          </Flex>
        }
      />
    </React.Fragment>
  );
};

export default NewCategory;
