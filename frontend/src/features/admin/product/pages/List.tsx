import React from 'react';
import { useGetDemoQuery } from '~/graphql/catalog/generated/graphql';

// -----------------------------
interface AdminProductListProps {}

// -----------------------------
const AdminProductList: React.FC<AdminProductListProps> = (props) => {
  const { data, loading, error } = useGetDemoQuery(); // EXAMPLE: remove it
  console.log(loading, error, data?.demo);

  return <>Product list</>;
};

export default AdminProductList;
