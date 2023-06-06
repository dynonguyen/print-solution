import Page from '~/components/Page';
import AdminCategoryListPage from './pages/List';

const AdminCategory = () => {
  return (
    <Page title="Quản lý danh mục">
      <AdminCategoryListPage />
    </Page>
  );
};

export default AdminCategory;
