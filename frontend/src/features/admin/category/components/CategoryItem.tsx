import { Avatar, Flex, List, ListItemProps, Popover, Tooltip, Typography } from '@cads-ui/core';
import { getOperationAST } from 'graphql';
import React from 'react';
import { toast } from 'react-toastify';
import Icon from '~/components/Icon';
import { ENDPOINTS } from '~/constants/endpoints';
import { SUCCESS_CODE } from '~/constants/status-code';
import {
  AdminCategoryListDocument,
  useDeleteCategoryMutation,
  useUpdateCategoryMutation
} from '~/graphql/catalog/generated/graphql';
import docsAxios from '~/libs/axios/docs';
import { withMinio } from '~/utils/withStatic';

// -----------------------------
interface CategoryItemProps {
  _id: string;
  name: string;
  isHidden: boolean;
  numOfProducts: number;
  photo: string;
}

// -----------------------------
const CategoryItem: React.FC<CategoryItemProps> = (props) => {
  const [moreAnchor, setMoreAnchor] = React.useState<any>(null);
  const { name, photo, isHidden, numOfProducts, _id } = props;

  const [deleteCategory, { loading: deleting }] = useDeleteCategoryMutation({
    variables: { deleteCategoryInput: { _id } },
    refetchQueries: [getOperationAST(AdminCategoryListDocument)?.name?.value || 'AdminCategoryList'],
    awaitRefetchQueries: true
  });
  const [updateCategory, { loading: updating }] = useUpdateCategoryMutation({
    refetchQueries: [getOperationAST(AdminCategoryListDocument)?.name?.value || 'AdminCategoryList'],
    awaitRefetchQueries: true
  });

  const handleDelete = async () => {
    if (deleting) return;

    const { data } = await deleteCategory();
    if (data?.deleteCategory.code === SUCCESS_CODE.OK) {
      docsAxios.delete(ENDPOINTS.DOCS_API.UPLOAD_CATEGORY_PHOTO, { params: { photoUrl: photo } });
      toast.success(`Xóa danh mục "${name}" thành công`);
    } else {
      toast.error(`Xóa danh mục "${name}" thất bại`);
    }
  };

  const handleHidden = async () => {
    if (updating) return;

    const { data } = await updateCategory({ variables: { updateCategoryInput: { _id, isHidden: !isHidden } } });

    if (data?.updateCategory.code === SUCCESS_CODE.OK) {
      toast.success(`Cập nhật danh mục "${name}" thành công`);
    } else {
      toast.success(`Cập nhật danh mục "${name}" thất bại`);
    }
  };

  const moreListItems: ListItemProps[] = [
    {
      primary: isHidden ? 'Hiển thị' : 'Ẩn',
      icon: <Icon icon={isHidden ? 'ph:eye-fill' : 'ph:eye-slash-fill'} />,
      onItemClick: handleHidden
    }
  ];

  if (!numOfProducts)
    moreListItems.push({
      primary: deleting ? 'Đang xóa ...' : 'Xóa',
      icon: <Icon icon="mdi:trash" />,
      onItemClick: handleDelete
    });

  return (
    <React.Fragment>
      <Flex
        direction="column"
        alignItems="center"
        sx={{ px: 6, py: 4, h: 1, shadow: 3, borderRadius: 2, position: 'relative' }}
      >
        <Avatar
          shape="rounded"
          src={withMinio(photo)}
          alt={name}
          sx={{ bgColor: '#fff', color: 'primary.main' }}
          size={100}
        />
        <Typography align="center" sx={{ mt: 3, mb: 2, wordBreak: 'break-all' }} maxLine={2}>
          {name}
        </Typography>
        <Typography align="center" sx={{ fs: 14, color: 'text.secondary', mt: 'auto' }}>
          {numOfProducts} sản phẩm
        </Typography>
        <Flex
          sx={{
            position: 'absolute',
            right: 6,
            top: 12,
            '& .icon': { fs: 24, color: 'text.secondary', cursor: 'pointer', _hover: { color: 'text.primary' } }
          }}
          spacing={2}
        >
          {isHidden && (
            <Tooltip title="Danh mục bị ẩn: Khách hàng của bạn sẽ không nhìn thấy danh mục và các sản phẩm của danh mục này">
              <Icon sx={{ cursor: 'default' }} icon="ph:eye-slash-fill" />
            </Tooltip>
          )}
          <Icon icon="material-symbols:more-vert" onClick={(e) => setMoreAnchor(e.currentTarget)} />
        </Flex>
      </Flex>

      <Popover
        anchorEl={moreAnchor}
        open={Boolean(moreAnchor)}
        onClose={() => setMoreAnchor(null)}
        showBackdrop
        placement="bottom-end"
      >
        <List sx={{ py: 2 }} dense items={moreListItems} />
      </Popover>
    </React.Fragment>
  );
};

export default CategoryItem;
